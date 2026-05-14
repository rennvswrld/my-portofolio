import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Fungsi untuk mengkonversi gambar ke format WebP
 */
export async function convertToWebP(inputPath: string, outputPath?: string): Promise<string> {
  try {
    // Jika outputPath tidak disediakan, buat path baru dengan ekstensi .webp
    const outputFilePath = outputPath || inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Baca file gambar
    const imageBuffer = await fs.readFile(inputPath);
    
    // Konversi ke WebP menggunakan Sharp
    const webpData = await sharp(imageBuffer)
      .webp({ quality: 80, effort: 4 }) // Kompresi dengan kualitas 80
      .toBuffer();
    
    // Simpan file WebP
    await fs.writeFile(outputFilePath, webpData);
    
    console.log(`Gambar berhasil dikonversi ke WebP: ${outputFilePath}`);
    
    return outputFilePath;
  } catch (error) {
    console.error(`Error saat konversi ${inputPath} ke WebP:`, error);
    throw error;
  }
}

/**
 * Fungsi untuk mengompresi gambar ke ukuran yang lebih kecil
 */
export async function compressImage(inputPath: string, outputPath?: string, quality: number = 80): Promise<string> {
  try {
    // Jika outputPath tidak disediakan, gunakan path asli
    const outputFilePath = outputPath || inputPath;
    
    // Baca file gambar
    const imageBuffer = await fs.readFile(inputPath);
    
    // Dapatkan metadata gambar untuk menentukan format
    const metadata = await sharp(imageBuffer).metadata();
    
    let compressedData;
    
    if (metadata.format === 'jpeg') {
      compressedData = await sharp(imageBuffer)
        .jpeg({ quality })
        .toBuffer();
    } else if (metadata.format === 'png') {
      compressedData = await sharp(imageBuffer)
        .png({ quality })
        .toBuffer();
    } else if (metadata.format === 'webp') {
      compressedData = await sharp(imageBuffer)
        .webp({ quality })
        .toBuffer();
    } else {
      // Untuk format lain, kita coba kompresi WebP
      compressedData = await sharp(imageBuffer)
        .webp({ quality })
        .toBuffer();
    }
    
    // Simpan file yang telah dikompresi
    await fs.writeFile(outputFilePath, compressedData);
    
    console.log(`Gambar berhasil dikompresi: ${outputFilePath}`);
    
    return outputFilePath;
  } catch (error) {
    console.error(`Error saat kompresi ${inputPath}:`, error);
    throw error;
  }
}

/**
 * Fungsi untuk mengoptimalkan semua gambar dalam folder
 */
export async function optimizeAllImagesInFolder(inputDir: string, outputDir?: string) {
  try {
    // Baca semua file di direktori
    const files = await fs.readdir(inputDir);
    
    // Filter file yang merupakan gambar
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp|tiff|bmp|gif)$/i.test(file)
    );
    
    console.log(`Menemukan ${imageFiles.length} file gambar untuk dioptimalkan`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = outputDir 
        ? path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'))
        : inputPath;
      
      // Buat direktori output jika belum ada
      if (outputDir) {
        await fs.mkdir(outputDir, { recursive: true });
      }
      
      // Jika file bukan WebP, konversi ke WebP
      if (!file.endsWith('.webp')) {
        await convertToWebP(inputPath, outputPath);
      } else {
        // Jika sudah WebP, hanya kompresi
        await compressImage(inputPath, outputPath);
      }
    }
    
    console.log('Optimasi gambar selesai!');
  } catch (error) {
    console.error('Error saat mengoptimalkan semua gambar:', error);
    throw error;
  }
}

/**
 * Hook untuk kompresi gambar di sisi klien
 */
export function useClientImageCompression() {
  const compressImageBlob = async (imageBlob: Blob, quality: number = 0.8): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Atur ukuran canvas sesuai gambar
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Gambar gambar ke canvas
        ctx?.drawImage(img, 0, 0);
        
        // Kompresi dan konversi ke Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Gagal membuat Blob dari gambar'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(imageBlob);
    });
  };

  return { compressImageBlob };
}
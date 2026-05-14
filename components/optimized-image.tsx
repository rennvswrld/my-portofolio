import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type OptimizedImageProps = {
  fallbackSrc?: string;
} & Omit<ImageProps, 'src'> & {
  src: string;
};

const OptimizedImage = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  quality = 75,
  placeholder,
  blurDataURL,
  ...props
}: OptimizedImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    // Jika WebP tidak didukung atau error, fallback ke format asli
    if (fallbackSrc && !hasError) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Coba ubah ekstensi file ke WebP jika bukan SVG atau GIF
  const getWebPSrc = (src: string) => {
    if (!src || typeof src !== 'string') return src;

    // Jangan ubah SVG atau GIF ke WebP
    if (src.endsWith('.svg') || src.endsWith('.gif')) {
      return src;
    }

    // Ganti ekstensi dengan .webp
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  // Gunakan WebP sebagai src utama jika belum terjadi error
  const optimizedSrc = !hasError ? getWebPSrc(src) : currentSrc;

  return (
    <Image
      {...props}
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={handleImageError}
      loading="lazy"  // Memastikan lazy loading diaktifkan
      style={{
        ...props.style,
        // Menjaga aspect ratio jika width dan height ditentukan
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    />
  );
};

export default OptimizedImage;
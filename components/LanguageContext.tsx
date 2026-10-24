"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, Language } from '@/lib/translations';

// Gabungkan terjemahan dengan fallback: key yang hilang atau array kosong diambil dari fallback.
function withFallback(fallback: any, value: any): any {
  if (value === undefined || value === null) return fallback;
  if (Array.isArray(value)) return value.length > 0 ? value : fallback;
  if (typeof value === 'object' && typeof fallback === 'object' && !Array.isArray(fallback)) {
    const out: any = { ...fallback };
    for (const key of Object.keys(value)) out[key] = withFallback(fallback?.[key], value[key]);
    return out;
  }
  return value;
}

// Kita set t sebagai 'any' agar TypeScript tidak rewel mengecek satu-satu
type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  currentLanguage: Language;
  t: any; 
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Bahasa default: English. Bahasa Indonesia & lainnya bisa dipilih lewat toggle.
  const [lang, setLang] = useState<Language>('en');

  // Sinkronkan atribut <html lang="..."> dengan bahasa yang dipilih
  useEffect(() => {
    const htmlLang: Record<string, string> = { jp: 'ja', cn: 'zh', kr: 'ko', vn: 'vi', kh: 'km' };
    document.documentElement.lang = htmlLang[lang] ?? lang;
  }, [lang]);

  // Bahasa selain ID/EN dilengkapi dari EN, supaya bagian yang belum diterjemahkan
  // (mis. daftar proyek & pengalaman yang masih kosong) tidak tampil kosong.
  const t = useMemo(() => {
    const dict = (translations as any)[lang];
    if (lang === 'id' || lang === 'en') return dict;
    return withFallback(translations.en, dict);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, currentLanguage: lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
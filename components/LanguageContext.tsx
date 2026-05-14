"use client"

import React, { createContext, useContext, useState } from 'react';
import { translations, Language } from '@/lib/translations';

// Kita set t sebagai 'any' agar TypeScript tidak rewel mengecek satu-satu
type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  currentLanguage: Language;
  t: any; 
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('id');

  // BYPASS SAKTI: Paksa TypeScript baca sebagai any, dan kasih default 'id' kalau bahasa belum ada
  const t = (translations as any)[lang] || translations['id'];

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
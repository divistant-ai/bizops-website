'use client';

import React, { createContext, use, useEffect, useState } from 'react';

type Language = 'id' | 'en';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'id';
    }
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'id' ? 'en' : 'id';
    setLanguage(newLang);
  };

  return (
    <LanguageContext value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext>
  );
};

export const useLanguage = () => {
  const context = use(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

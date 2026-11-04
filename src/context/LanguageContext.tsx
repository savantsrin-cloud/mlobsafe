"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "@/types/heatStress";
import { translations } from "@/data/heatStressTranslations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("km");

  useEffect(() => {
    const saved = localStorage.getItem("heatguard_lang") as Language;
    if (saved === "en" || saved === "km") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    } else {
      setLanguageState("km");
      document.documentElement.lang = "km";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("heatguard_lang", lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const nextLang = language === "km" ? "en" : "km";
    setLanguage(nextLang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

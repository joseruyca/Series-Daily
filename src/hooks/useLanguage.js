"use client";

import { useEffect, useMemo, useState } from "react";
import { copy } from "@/src/lib/copy";

const STORAGE_KEY = "seriesdaily-lang";

export function useLanguage() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => copy[lang], [lang]);

  return {
    lang,
    setLang,
    t,
  };
}
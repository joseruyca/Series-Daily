"use client";

import { useMemo } from "react";
import { copy } from "@/src/lib/copy";

export function useLanguage() {
  const t = useMemo(() => copy.es, []);
  if (typeof document !== "undefined") {
    document.documentElement.lang = "es";
  }
  return { lang: "es", setLang: () => {}, t };
}
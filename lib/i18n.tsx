/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import sk from "@/messages/sk.json";
import en from "@/messages/en.json";
import type { ContentMap } from "@/lib/content";

type Locale = "sk" | "en";

const messages = { sk, en } as const;

function resolve(obj: any, path: string): any {
  return path.split(".").reduce((acc: any, key: string) => acc?.[key], obj) ?? path;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tRaw: (key: string) => any;
  /** Sheet-driven content lookup (see lib/content.ts) — falls back to the key itself if missing. */
  c: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "sk",
  setLocale: () => {},
  t: (k) => k,
  tRaw: (k) => k,
  c: (k) => k,
});

interface I18nProviderProps {
  children: ReactNode;
  /** Merged sheet + JSON-fallback content maps, built server-side — see app/page.tsx. */
  contentSk?: ContentMap;
  contentEn?: ContentMap;
}

export function I18nProvider({ children, contentSk = {}, contentEn = {} }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = document.cookie
        .split("; ")
        .find((r) => r.startsWith("locale="))
        ?.split("=")[1];
      if (stored === "sk" || stored === "en") return stored;
    }
    return "sk";
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, []);

  const t = useCallback(
    (key: string) => resolve(messages[locale], key) as string,
    [locale]
  );

  const tRaw = useCallback(
    (key: string) => resolve(messages[locale], key),
    [locale]
  );

  const c = useCallback(
    (key: string) => (locale === "sk" ? contentSk : contentEn)[key] ?? key,
    [locale, contentSk, contentEn]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tRaw, c }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function useT(namespace: string) {
  const { t, tRaw } = useI18n();
  return {
    t: (key: string) => t(`${namespace}.${key}`),
    tRaw: (key: string) => tRaw(`${namespace}.${key}`),
  };
}

/** Sheet-driven content lookup — reads canonical flat keys (see lib/content.ts). */
export function useContent() {
  const { c } = useI18n();
  return c;
}

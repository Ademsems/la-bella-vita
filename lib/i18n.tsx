/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import sk from "@/messages/sk.json";
import en from "@/messages/en.json";

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
}

const I18nContext = createContext<I18nContextValue>({
  locale: "sk",
  setLocale: () => {},
  t: (k) => k,
  tRaw: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
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

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tRaw }}>
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

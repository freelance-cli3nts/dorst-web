'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import bgMessages from '@/messages/bg.json'
import enMessages from '@/messages/en.json'

export type Locale = 'bg' | 'en'

const MESSAGES = { bg: bgMessages, en: enMessages } as const
const COOKIE_NAME = 'dorst-locale'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

interface LocaleCtx {
  locale: Locale
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleCtx>({ locale: 'bg', setLocale: () => {} })

export function useLocale() {
  return useContext(LocaleContext)
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('bg')

  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
    if (match?.[1] === 'en') setLocaleState('en')
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    document.cookie = `${COOKIE_NAME}=${l};path=/;max-age=${COOKIE_MAX_AGE};samesite=lax`
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]} timeZone="Europe/Sofia">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}

'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import siteMetadata from '@/data/siteMetadata'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider

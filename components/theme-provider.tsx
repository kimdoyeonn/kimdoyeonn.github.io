'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviderProps } from 'next-themes/dist/types'

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider

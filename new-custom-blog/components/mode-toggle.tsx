'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button variant="outline" size="icon">
      {theme === 'dark' ? (
        <Sun
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          onClick={() => setTheme('light')}
        />
      ) : (
        <Moon
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          onClick={() => setTheme('dark')}
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

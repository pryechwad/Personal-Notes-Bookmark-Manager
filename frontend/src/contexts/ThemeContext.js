'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
  }

  // Render with default theme until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, mounted: false }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    // Return default values during SSR to prevent build errors
    return {
      theme: 'light',
      toggleTheme: () => {},
      mounted: false
    }
  }
  return context
}
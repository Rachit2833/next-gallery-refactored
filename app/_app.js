'use client'

import { ThemeProvider } from 'next-themes'

export function AppThemeProvider({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="default"
      enableSystem={false}
      themes={[
        "default",
        "sandsOfTime",
        "notebook",
        "bubblegumPop",
        "doom",
        "boldTech",
        "pastel",
        "greenPower",
      ]}
    >
      {children}
    </ThemeProvider>
  )
}

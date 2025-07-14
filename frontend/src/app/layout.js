import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Personal Notes & Bookmark Manager',
  description: 'Organize your thoughts, save important links, and build your personal knowledge base.',
  keywords: 'notes, bookmarks, organization, productivity, knowledge management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
            } catch (e) {}
          `
        }} />
      </head>
      <body className="overflow-x-hidden min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">{children}</main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


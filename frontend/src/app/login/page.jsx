'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { login as apiLogin } from '@/lib/api'
import { LogIn, Mail, Lock, BookOpen } from 'lucide-react'
import PublicNavbar from '@/components/layout/PublicNavbar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await apiLogin({ email, password })
      if (response.message) {
        setError(response.message)
      } else {
        login(response)
        router.push('/')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PublicNavbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-16">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-float"></div>
        
        <div className="flex items-center justify-center min-h-screen py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            {/* Left Side - Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                  Welcome Back to
                  <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    NotesBook
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Continue your journey of organizing thoughts and capturing brilliant ideas.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Smart Notes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Rich text notes with powerful organization</p>
                </div>
                
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Web Bookmarks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Save and organize your favorite links</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">1M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Notes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">500K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Links Saved</div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-slate-900 dark:bg-slate-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-2xl">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white dark:text-slate-900" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 rounded-2xl shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 sm:h-14 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 dark:from-slate-100 dark:to-slate-200 dark:hover:from-slate-200 dark:hover:to-slate-300 dark:text-slate-900 text-white font-bold rounded-xl transition-all duration-300 text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign in
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/register">
                  <Button
                    className="w-full h-10 sm:h-12 bg-white/50 dark:bg-slate-700/50 border border-white/30 hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-300 rounded-xl font-semibold text-sm sm:text-base"
                  >
                    Create new account
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
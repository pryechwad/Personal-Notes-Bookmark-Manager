'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { register as apiRegister } from '@/lib/api'
import { UserPlus, Mail, Lock, User, BookOpen } from 'lucide-react'
import PublicNavbar from '@/components/layout/PublicNavbar'

export default function RegisterPage() {
  const [name, setName] = useState('')
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
      const response = await apiRegister({ name, email, password })
      if (response.message) {
        setError(response.message)
      } else {
        login(response)
        router.push('/')
      }
    } catch (err) {
      setError('Registration failed. Please try again.')
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
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                  Join the
                  <span className="block bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    NotesBook Family
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Start your journey of organized thinking and creative productivity today.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Free Forever</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">No hidden costs, no subscriptions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Secure & Private</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Your data is encrypted and protected</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Export Anywhere</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Download as PDF or Word documents</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Register Form */}
            <div className="w-full max-w-md mx-auto space-y-8 order-1 lg:order-2">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-slate-900 dark:bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-white dark:text-slate-900" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Start organizing your notes and bookmarks today
          </p>
        </div>

        <Card className="bg-white dark:bg-slate-800 shadow-lg border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
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
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white font-semibold rounded-lg transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create account
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
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full h-12 bg-gray-100 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-200"
                  >
                    Sign in instead
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
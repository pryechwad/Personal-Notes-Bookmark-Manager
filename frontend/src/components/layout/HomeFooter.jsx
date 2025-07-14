'use client'

import Link from 'next/link'
import { BookOpen, Heart, Github, Twitter, Mail } from 'lucide-react'

export default function HomeFooter() {
  return (
    <footer className="bg-rose-25/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-rose-100/30 dark:border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-gray-900 to-purple-900 dark:from-white dark:to-purple-100 bg-clip-text text-transparent">
                NotesBook
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Transform your digital life with our beautiful, intelligent workspace. Capture ideas, organize thoughts, and save important links all in one place.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-50 dark:bg-slate-800 rounded-xl flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-rose-50 dark:bg-slate-800 rounded-xl flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-rose-50 dark:bg-slate-800 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/register" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Get Started</Link></li>
              <li><Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Sign In</Link></li>
              <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rose-100 dark:border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 NotesBook. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm mt-4 sm:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for organized minds</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
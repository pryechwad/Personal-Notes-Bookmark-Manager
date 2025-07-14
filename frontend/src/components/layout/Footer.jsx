'use client'

import Link from 'next/link'
import { BookOpen, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">NotesBook</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your personal digital workspace for notes and bookmarks.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/notes" className="hover:text-gray-900 dark:hover:text-white transition-colors">Notes</Link></li>
              <li><Link href="/bookmarks" className="hover:text-gray-900 dark:hover:text-white transition-colors">Bookmarks</Link></li>
              <li><Link href="/search" className="hover:text-gray-900 dark:hover:text-white transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/help" className="hover:text-gray-900 dark:hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© 2024 NotesBook. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for organized minds.</span>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
            Version 1.0.0
          </div>
        </div>
      </div>
    </footer>
  )
}
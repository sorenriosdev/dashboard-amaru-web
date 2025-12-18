// app/components/layout/Header.tsx
'use client'

import { Bell } from 'lucide-react'

interface HeaderProps {
  title: string
  breadcrumb?: string
}

export default function Header({ title, breadcrumb }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white px-6 lg:px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          {breadcrumb && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-700 font-medium">{breadcrumb}</span>
            </div>
          )}
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button 
            className="relative rounded-lg p-2.5 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
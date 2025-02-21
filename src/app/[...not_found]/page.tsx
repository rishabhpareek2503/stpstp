"use client"

import React from 'react'
import Link from 'next/link'

export default function NotFoundCatchAll() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
} 
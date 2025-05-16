'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500) // 2.5 seconds
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white/90 flex-col space-y-6">
        <Image
          src="/logo.png" // Rename your file to `logo.svg` and place it in `/public/`
          alt="AJOKU Logo"
          width={120}
          height={120}
          priority
        />
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin border-[#BF7B66]" />
      </div>
    )
  }

  return children
}

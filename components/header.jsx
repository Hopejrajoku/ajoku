'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleCloseMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-[#D3F1FF] shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={100}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-800 hover:text-blue-500">Home</Link>
          <Link href="/services" className="text-gray-800 hover:text-blue-500">Services</Link>
          <Link href="/about" className="text-gray-800 hover:text-blue-500">About Us</Link>
          <Link href="/testimonials" className="text-gray-800 hover:text-blue-500">Testimonials</Link>
        </div>

        {/* Desktop Login */}
        <div className="hidden md:flex items-center space-x-4">
          <Button className="text-gray-800 bg-white hover:text-blue-500">Login</Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col items-center text-center space-y-4 bg-[#D3F1FF]">
          <Link href="/" onClick={handleCloseMenu} className="block w-full text-gray-800 hover:text-blue-500">Home</Link>
          <Link href="/services" onClick={handleCloseMenu} className="block w-full text-gray-800 hover:text-blue-500">Services</Link>
          <Link href="/about" onClick={handleCloseMenu} className="block w-full text-gray-800 hover:text-blue-500">About Us</Link>
          <Link href="/testimonials" onClick={handleCloseMenu} className="block w-full text-gray-800 hover:text-blue-500">Testimonials</Link>
          <Button onClick={handleCloseMenu} className="w-full text-gray-800 bg-white hover:text-blue-500">Login</Button>
        </div>
      )}
    </header>
  )
}

export default Header

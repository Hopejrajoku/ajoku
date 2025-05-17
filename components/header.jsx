'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleCloseMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo1.svg"
            alt="Logo"
            width={150}
            height={100}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 rounded-[10px] bg-[#1f1f1f] px-5 py-2" style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#services" className="text-white hover:text-gray-300">Services</a>
          <a href="#about" className="text-white hover:text-gray-300">About Us</a>
          <a href="#testimonials" className="text-white hover:text-gray-300">Testimonials</a>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="look">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                <span className="md:inline">Dashboard</span>
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10'
                }
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-[#BF7B66]">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6 text-[#BF7B66]" /> : <Menu className="h-6 w-6 text-[#BF7B66]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col items-center text-center space-y-4 bg-white/50">
          <Link href="#" onClick={handleCloseMenu} className="block w-full text-[#BF7B66] hover:text-blue-500">Home</Link>
          <Link href="#services" onClick={handleCloseMenu} className="block w-full text-[#BF7B66] hover:text-blue-500">Services</Link>
          <Link href="#about" onClick={handleCloseMenu} className="block w-full text-[#BF7B66] hover:text-blue-500">About Us</Link>
          <Link href="#testimonials" onClick={handleCloseMenu} className="block w-full text-[#BF7B66] hover:text-blue-500">Testimonials</Link>

          <div className="flex flex-col items-center space-y-2">
            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="look" className="w-full">Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" onClick={handleCloseMenu}>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  <span className=" md:inline">Dashboard</span>
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10'
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

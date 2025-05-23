'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Header = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#about', label: 'About Us' },
    { href: '/#testimonials', label: 'Testimonials' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center" style={{ fontFamily: 'var(--font-sf-pro)' }}>
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 rounded-[10px] bg-[#1f1f1f] px-5 py-2" style={{ fontFamily: 'var(--font-sf-pro)' }}>
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="text-white hover:text-gray-300">
              {label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="look" className="md:inline-block">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Dashboard Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <MenuIcon  size='20' />
                  <span className=" md:inline">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar */}
            <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10' } }} />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Header

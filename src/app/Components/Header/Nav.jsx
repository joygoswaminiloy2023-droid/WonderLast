'use client'

import { Button } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const path = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/Add-destination' },
    { name: 'My Bookings', href: '/bookings' },
    { name: 'Admin', href: '/admin' },
  ]

  return (
    <nav className="absolute top-5 left-1/2 z-50 w-[95%]  -translate-x-1/2 bg-white shadow-md">
      <header className="relative flex h-16 items-center justify-between px-6">

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Left Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`pb-1 text-sm font-medium transition-all ${
                path === link.href
                  ? 'border-b-2 border-[#15A1BF] text-[#15A1BF]'
                  : 'text-black hover:text-[#15A1BF]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-[#15A1BF]"
          >
            WonderLast
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/profile"
            className="text-sm font-medium hover:text-[#15A1BF]"
          >
            Profile
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium hover:text-[#15A1BF]"
          >
            Login
          </Link>

          <Button
            className="rounded-none bg-white px-6 text-black border border-gray-300 hover:bg-[#15A1BF] hover:text-white"
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <ul className="flex flex-col gap-3 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 ${
                    path === link.href
                      ? 'text-[#15A1BF]'
                      : 'text-black'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <li className="border-t pt-4">
              <Link href="/profile" className="block py-2">
                Profile
              </Link>

              <Link href="/login" className="block py-2">
                Login
              </Link>

              <Button className="mt-3 w-full bg-[#15A1BF] text-white">
                Sign Up
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Nav
'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { HiLogout, HiMenu, HiX } from 'react-icons/hi'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const path = usePathname()
  const router = useRouter()

 
  const { 
    data: session, 
    isPending 
  } = authClient.useSession()
    
  const User = session?.user

  
  const handleLogout = async () => {
   await authClient.signOut();
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/Destination' },
    { name: 'My Bookings', href: '/My-bookings' },
    { name: 'Admin', href: '/admin' },
    { name: 'Add-Destinations', href: '/Add-destination' }
  ]

  return (
    <nav className="absolute top-5 left-1/2 z-50 w-[95%] -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl border border-white/20">
      <header className="relative flex h-16 items-center justify-between px-6">

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-600 hover:text-[#15A1BF] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-all hover:text-[#15A1BF] ${
                path === link.href ? 'text-[#15A1BF]' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-2xl font-black tracking-tighter text-[#15A1BF]">
            WonderLast
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
          ) : User ? (
            <div className="flex items-center gap-3">
              {/* Profile Image - Desktop */}
              <Link href="/profile" className="hidden md:block">
                <div className="w-10 h-10 rounded-full border-2 border-cyan-500 overflow-hidden hover:scale-105 transition-transform">
                  <Image 
                    src={User.image || `https://ui-avatars.com/api/?name=${User.name}&background=15A1BF&color=fff`} 
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </Link>
              
              {/* Logout Button - Desktop */}
             <button 
                    onClick={handleLogout}
                    className="hidden md:flex w-full items-center gap-3 py-3 px-4 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50"
                  >
                    <HiLogout className="w-5 h-5" />
                    Sign Out
                  </button>

              {/* Profile Image - Mobile (Visible in bar when menu is closed) */}
              {!isMenuOpen && (
                <Link href="/profile" className="md:hidden">
                   <div className="w-9 h-9 rounded-full border border-cyan-500 overflow-hidden">
                    <Image 
                      src={User.image || `https://ui-avatars.com/api/?name=${User.name}&background=15A1BF&color=fff`} 
                      alt="Profile"
                      width={36}
                      height={36}
                    />
                  </div>
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/Login" className="text-sm font-bold text-slate-600 hover:text-[#15A1BF]">
                Login
              </Link>
              <Link href="/Signup">
                <Button className="rounded-xl bg-[#15A1BF] px-5 py-2 text-white font-bold hover:bg-[#1289a3] shadow-md shadow-cyan-100">
                  sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white rounded-b-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <ul className="flex flex-col p-4 space-y-1">
          
            <li className="flex items-center justify-between pb-4 mb-2 border-b border-slate-50 px-2">
              <span className="font-black text-[#15A1BF]">WONDERLAST</span>
              {User && (
                <div className="flex items-center gap-3 bg-slate-50 py-1 px-2 rounded-full border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 truncate max-w-[80px] uppercase tracking-widest">
                    {User.name?.split(' ')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-cyan-500">
                    <Image 
                      src={User.image || `https://ui-avatars.com/api/?name=${User.name}&background=15A1BF&color=fff`} 
                      alt="User"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              )}
            </li>

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-sm font-bold transition-colors ${
                    path === link.href ? 'bg-cyan-50 text-[#15A1BF]' : 'text-slate-600 active:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Mobile Auth Actions */}
            <li className="pt-4 mt-2 border-t border-slate-100 space-y-2">
              {User ? (
                <>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <CgProfile className="w-5 h-5 text-[#15A1BF]" />
                    My Account
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 py-3 px-4 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50"
                  >
                    <HiLogout className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 px-2 pb-2">
                  <Link 
                    href="/Login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-center text-sm font-bold border border-slate-200 rounded-xl text-slate-700"
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/Signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-center text-sm font-bold bg-[#15A1BF] text-white rounded-xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Nav
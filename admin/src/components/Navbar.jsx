import React, { useEffect, useState } from 'react'
import { assets } from "../assets/assets"

const Navbar = ({ setToken }) => {

  const [showNavbar, setShowNavbar] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken('')
  }

  // ✨ Hide on scroll down, show on scroll up
  useEffect(() => {

    let lastScrollY = window.scrollY

    const handleScroll = () => {

      if (window.scrollY > lastScrollY) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }

      lastScrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }

  }, [])

  return (

    <div className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-500
    ${showNavbar
      ? 'translate-y-0 opacity-100'
      : '-translate-y-full opacity-0'}
    `}>

      <div className='
      bg-gradient-to-r from-slate-950/95 via-indigo-950/95 to-slate-950/95
      backdrop-blur-2xl
      border-b border-indigo-500/20
      shadow-xl shadow-indigo-500/10'>

        <div className='flex items-center justify-between
       px-5 sm:px-8 py-2.5'>

          {/* LEFT */}
          <div className='flex items-center gap-4'>

            {/* LOGO */}
            <div className='relative'>

              <div className='absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full'></div>

              <div className='relative
              p-1.5 rounded-xl
              bg-white/5 border border-white/10'>

                <img
                 className='w-10 sm:w-12 object-contain'
                  src={assets.logoDark}
                  alt="Logo"
                />

              </div>

            </div>

            {/* TITLE */}
            <div>

               <h1 className='text-white text-base sm:text-lg font-bold tracking-wide leading-none'>
                Mandala Admin
              </h1>

              <p className='text-indigo-200/70 text-[11px] sm:text-xs mt-1'>
                Creative Control Center ✨
              </p>

            </div>

          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className='group relative overflow-hidden
            px-5 sm:px-6 py-2.5 rounded-2xl
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white text-sm font-semibold
            shadow-lg shadow-indigo-500/30
            hover:scale-105 active:scale-95
            transition duration-300'
          >

            <span className='absolute inset-0
            translate-x-[-120%]
            group-hover:translate-x-[120%]
            transition duration-700
            bg-gradient-to-r from-transparent via-white/30 to-transparent'></span>

            <span className='relative flex items-center gap-2'>
              Logout
              <span className='group-hover:translate-x-1 transition duration-300'>
                →
              </span>
            </span>

          </button>

        </div>

      </div>

    </div>
  )
}

export default Navbar
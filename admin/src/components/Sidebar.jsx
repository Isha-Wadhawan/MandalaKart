import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

  const navItems = [
    {
      path: '/add',
      name: 'Add Artwork',
      icon: assets.add_icon
    },
    {
      path: '/list',
      name: 'Gallery',
      icon: assets.order_icon
    },
    {
      path: '/orders',
      name: 'Orders',
      icon: assets.order_icon
    }
  ]

  return (
    <div
      className='
      fixed top-[84px] left-0
      w-[260px] h-[calc(100vh-84px)]
      bg-gradient-to-b from-[#081028] via-[#0b1739] to-[#091226]
      border-r border-white/10
      backdrop-blur-xl
      z-40
      hidden md:flex flex-col
      shadow-2xl shadow-black/20
    '
    >

      {/* TOP GLOW */}
      <div className='absolute top-0 left-0 w-full h-32 bg-blue-500/10 blur-3xl pointer-events-none'></div>

      {/* HEADER */}
      <div className='px-6 pt-8 pb-4 relative z-10'>
        <p className='text-xs uppercase tracking-[0.3em] text-blue-300/60 mb-2'>
          Admin Space
        </p>

        <h2 className='text-white text-2xl font-semibold'>
          Mandala Studio ✨
        </h2>
      </div>

      {/* NAVIGATION */}
      <div className='flex flex-col gap-3 px-4 mt-4 relative z-10'>

        {navItems.map((item, index) => (

          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `
              group relative overflow-hidden
              flex items-center gap-4
              px-4 py-4 rounded-2xl
              transition-all duration-300
              border
              ${isActive
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 shadow-lg shadow-blue-500/10'
                : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
              }
            `
            }
          >

            {/* ACTIVE GLOW */}
            <div
              className='
              absolute inset-0
              opacity-0 group-hover:opacity-100
              transition duration-500
              bg-gradient-to-r from-blue-500/5 to-purple-500/5
            '
            ></div>

            {/* ICON */}
            <div
              className='
              relative z-10
              w-11 h-11
              rounded-xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              group-hover:scale-105
              transition
            '
            >
              <img
                className='w-5 h-5 object-contain'
                src={item.icon}
                alt={item.name}
              />
            </div>

            {/* TEXT */}
            <div className='relative z-10 flex flex-col'>

              <p className='text-white font-medium text-sm tracking-wide'>
                {item.name}
              </p>

              <span className='text-blue-200/50 text-xs'>
                Manage section
              </span>

            </div>

          </NavLink>

        ))}

      </div>
    </div>
  )
}

export default Sidebar
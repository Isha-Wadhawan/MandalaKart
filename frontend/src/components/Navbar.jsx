import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX
} from 'react-icons/fi'

const Navbar = () => {

  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    setUser,
    user
  } = useContext(ShopContext)

  const logout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cartItems')

    setToken('')
    setUser(null)
    setCartItems({})

    navigate('/login')
  }

  return (

    <header
      className='sticky top-0 z-50
      border-b border-white/10
      bg-[#050816]/80 backdrop-blur-2xl'
    >

      {/* BACKGROUND GLOW */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>

        <div className='absolute -top-24 left-20 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full'></div>

        <div className='absolute -top-20 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full'></div>

      </div>

      {/* MAIN NAV */}
      <div
        className='relative max-w-7xl mx-auto
        px-4 sm:px-8 lg:px-12
        h-[74px]
        flex items-center justify-between'
      >

        {/* LOGO */}
        <Link
          to='/'
          className='flex items-center gap-3 group'
        >

          <div
            className='relative overflow-hidden rounded-2xl
            bg-white/5 border border-white/10
            p-2 backdrop-blur-xl
            group-hover:border-blue-400
            transition duration-300'
          >

            <img
              src={assets.logoLight}
              alt=""
              className='w-11 sm:w-12 object-contain'
            />

          </div>

          <div className='hidden sm:block'>

            <h1 className='text-white text-lg font-semibold tracking-wide'>
              Mandala
            </h1>

            <p className='text-blue-300 text-[11px] tracking-[0.25em] uppercase'>
              Crafted Calm
            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}
        <ul className='hidden lg:flex items-center gap-2'>

          {[
            { name: 'Home', path: '/' },
            { name: 'Collection', path: '/collection' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Create Mandala', path: '/custom' }
          ].map((item, i) => (

            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) => `
                relative px-5 py-2 rounded-full
                text-sm transition duration-300
                border
                ${isActive
                  ? 'bg-blue-500/15 border-blue-400/30 text-white shadow-lg shadow-blue-500/20'
                  : 'border-transparent text-blue-100 hover:text-white hover:bg-white/5'}
              `}
            >

              {item.name}

            </NavLink>

          ))}

        </ul>

        {/* RIGHT SIDE */}
        <div className='flex items-center gap-3'>

          {/* SEARCH */}
          <button
            onClick={() => {
              navigate('/collection')
              setShowSearch(true)
            }}
            className='w-11 h-11 rounded-2xl
            bg-white/5 border border-white/10
            flex items-center justify-center
            text-blue-100
            hover:text-white
            hover:border-blue-400
            hover:bg-blue-500/10
            transition duration-300'
          >

            <FiSearch className='text-lg' />

          </button>

          {/* PROFILE */}
          <div className='relative group'>

            <button
              onClick={() => token ? null : navigate('/login')}
              className='w-11 h-11 rounded-2xl
              bg-white/5 border border-white/10
              flex items-center justify-center
              text-blue-100
              hover:text-white
              hover:border-blue-400
              hover:bg-blue-500/10
              transition duration-300'
            >

              <FiUser className='text-lg' />

            </button>

            {/* DROPDOWN */}
            {token && (

              <div
                className='absolute right-0 top-14 w-60
                opacity-0 invisible translate-y-3
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                transition duration-300'
              >

                <div
                  className='overflow-hidden rounded-3xl
                  border border-white/10
                  bg-[#0d1328]/95 backdrop-blur-2xl
                  shadow-2xl shadow-blue-900/30'
                >

                  {/* TOP */}
                  <div className='p-5 border-b border-white/10'>

                    <div className='flex items-center gap-4'>

                      <div
                        className='w-12 h-12 rounded-2xl
                        bg-gradient-to-br from-blue-500 to-indigo-600
                        flex items-center justify-center
                        text-white font-semibold text-lg'
                      >

                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}

                      </div>

                      <div>

                        <h3 className='text-white font-medium'>
                          {user?.name || 'Profile'}
                        </h3>

                        <p className='text-blue-300 text-xs mt-1'>
                          Welcome back ✨
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* LINKS */}
                  <div className='p-3 flex flex-col gap-1'>

                    {[
                      {
                        label: 'My Profile',
                        action: () => navigate('/profile')
                      },
                      {
                        label: 'My Orders',
                        action: () => navigate('/orders')
                      }
                    ].map((item, i) => (

                      <button
                        key={i}
                        onClick={item.action}
                        className='text-left px-4 py-3 rounded-2xl
                        text-blue-100 text-sm
                        hover:bg-blue-500/10
                        hover:text-white
                        transition duration-300'
                      >

                        {item.label}

                      </button>

                    ))}

                    <button
                      onClick={logout}
                      className='text-left px-4 py-3 rounded-2xl
                      text-red-300 text-sm
                      hover:bg-red-500/10
                      hover:text-red-200
                      transition duration-300'
                    >

                      Logout

                    </button>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* CART */}
          <Link
            to='/cart'
            className='relative w-11 h-11 rounded-2xl
            bg-white/5 border border-white/10
            flex items-center justify-center
            text-blue-100
            hover:text-white
            hover:border-blue-400
            hover:bg-blue-500/10
            transition duration-300'
          >

            <FiShoppingCart className='text-lg' />

            <span
              className='absolute -top-1 -right-1
              min-w-[20px] h-5 px-1
              rounded-full
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white text-[10px]
              flex items-center justify-center
              font-medium shadow-lg shadow-blue-500/30'
            >

              {getCartCount()}

            </span>

          </Link>

          {/* MOBILE MENU */}
          <button
            onClick={() => setVisible(true)}
            className='lg:hidden w-11 h-11 rounded-2xl
            bg-white/5 border border-white/10
            flex items-center justify-center
            text-blue-100'
          >

            <FiMenu className='text-lg' />

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`
        fixed top-0 right-0 h-screen z-[60]
        bg-[#050816]/95 backdrop-blur-2xl
        border-l border-white/10
        transition-all duration-500
        ${visible ? 'w-[85%] sm:w-[420px]' : 'w-0 overflow-hidden'}
      `}
      >

        <div className='h-full flex flex-col'>

          {/* TOP */}
          <div
            className='flex items-center justify-between
            px-6 py-6 border-b border-white/10'
          >

            <div>

              <h2 className='text-white text-lg font-semibold'>
                Navigation
              </h2>

              <p className='text-blue-300 text-xs mt-1'>
                Explore the mandala universe
              </p>

            </div>

            <button
              onClick={() => setVisible(false)}
              className='w-10 h-10 rounded-xl
              bg-white/5 border border-white/10
              flex items-center justify-center
              text-blue-100'
            >

              <FiX />

            </button>

          </div>

          {/* LINKS */}
          <div className='flex flex-col p-5 gap-2'>

            {[
              { name: 'HOME', path: '/' },
              { name: 'COLLECTION', path: '/collection' },
              { name: 'ABOUT', path: '/about' },
              { name: 'CONTACT', path: '/contact' },
              { name: 'CREATE MANDALA', path: '/custom' }
            ].map((item, i) => (

              <NavLink
                key={i}
                to={item.path}
                onClick={() => setVisible(false)}
                className={({ isActive }) => `
                  px-5 py-4 rounded-2xl
                  text-sm transition duration-300
                  border
                  ${isActive
                    ? 'bg-blue-500/15 border-blue-400/30 text-white'
                    : 'border-white/5 text-blue-100 hover:bg-white/5'}
                `}
              >

                {item.name}

              </NavLink>

            ))}

          </div>

        </div>

      </div>

    </header>

  )
}

export default Navbar
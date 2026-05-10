import React from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import {
  FiInstagram,
  FiMail,
  FiPhone,
  FiArrowUpRight
} from 'react-icons/fi';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (

    <footer className='relative overflow-hidden bg-[#050816] text-blue-100'>

      {/* BACKGROUND GLOW */}
      <div className='absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-500/10 blur-3xl rounded-full'></div>

      {/* GRID */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16'>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>

          {/* BRAND */}
          <div>

            <div className='flex items-center gap-3 mb-5'>

              <div className='p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl'>
                <img
                  src={assets.logoDark}
                  alt=""
                  className='w-12 object-contain'
                />
              </div>

              <div>
                <h2 className='text-xl font-semibold text-white'>
                  Mandala
                </h2>

                <p className='text-xs tracking-[0.25em] text-blue-300 uppercase'>
                  by Jigyasa
                </p>
              </div>

            </div>

            <p className='text-blue-200/80 leading-relaxed text-sm'>
              Sacred geometry wrapped in modern aesthetics.
              Every creation is crafted to bring calm,
              focus, and artistic energy into your space.
            </p>

            {/* SOCIALS */}
            <div className='flex items-center gap-4 mt-6'>

              <a
                href="#"
                className='w-10 h-10 rounded-xl 
                bg-white/5 border border-white/10
                flex items-center justify-center
                hover:border-pink-400 hover:text-pink-300
                transition duration-300'
              >
                <FiInstagram />
              </a>

              <a
                href="mailto:mandalabyjigyasa@gmail.com"
                className='w-10 h-10 rounded-xl 
                bg-white/5 border border-white/10
                flex items-center justify-center
                hover:border-blue-400 hover:text-white
                transition duration-300'
              >
                <FiMail />
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className='text-white text-lg font-medium mb-6'>
              Explore
            </h3>

            <div className='flex flex-col gap-4 text-sm'>

              {[
                { name: 'Home', path: '/' },
                { name: 'Collection', path: '/collection' },
                { name: 'Custom Mandala', path: '/custom-mandala' },
                { name: 'About Us', path: '/about' },
              ].map((item, index) => (

                <Link
                  key={index}
                  to={item.path}
                  className='group flex items-center gap-2 text-blue-200 hover:text-white transition'
                >

                  <span className='w-0 group-hover:w-3 h-[1px] bg-blue-400 transition-all duration-300'></span>

                  {item.name}

                </Link>

              ))}

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className='text-white text-lg font-medium mb-6'>
              Contact
            </h3>

            <div className='space-y-5 text-sm'>

              <div className='flex items-start gap-3'>

                <div className='w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center'>
                  <FiPhone />
                </div>

                <div>
                  <p className='text-blue-300 text-xs uppercase tracking-wider'>
                    Phone
                  </p>

                  <p className='text-blue-100 mt-1'>
                    +91 8447326153
                  </p>
                </div>

              </div>

              <div className='flex items-start gap-3'>

                <div className='w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center'>
                  <FiMail />
                </div>

                <div>
                  <p className='text-blue-300 text-xs uppercase tracking-wider'>
                    Email
                  </p>

                  <p className='text-blue-100 mt-1 break-all'>
                    mandalabyjigyasa@gmail.com
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* NEWSLETTER */}
          <div>

            <h3 className='text-white text-lg font-medium mb-6'>
              Join The Circle
            </h3>

            <p className='text-sm text-blue-200/80 leading-relaxed mb-5'>
              Receive new mandala drops, creative inspiration,
              and exclusive artwork updates.
            </p>

            <div className='flex items-center rounded-2xl overflow-hidden
            bg-white/5 border border-white/10 backdrop-blur-xl'>

              <input
                type="email"
                placeholder='Your email'
                className='flex-1 bg-transparent px-4 py-3 text-sm 
                outline-none text-white placeholder:text-blue-300/50'
              />

              <button
                className='px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600
                hover:scale-105 transition duration-300'
              >
                <FiArrowUpRight className='text-lg text-white' />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className='relative border-t border-white/10 backdrop-blur-xl'>

        <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-5
        flex flex-col sm:flex-row items-center justify-between gap-4'>

          <p className='text-sm text-blue-300/70 text-center sm:text-left'>
            © 2026 Mandala by Jigyasa · Crafted with symmetry & soul
          </p>

          <button
            onClick={scrollToTop}
            className='group flex items-center gap-2 text-sm text-blue-200 hover:text-white transition'
          >

            Back to top

            <span className='group-hover:-translate-y-1 transition duration-300'>
              ↑
            </span>

          </button>

        </div>

      </div>

    </footer>
  )
}

export default Footer
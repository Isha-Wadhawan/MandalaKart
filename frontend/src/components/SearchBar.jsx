import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = () => {

  const {
    search,
    setSearch,
    showSearch,
    setShowSearch
  } = useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {

    if (location.pathname.includes('collection')) {
      setVisible(true);
    }

    else {
      setVisible(false);
    }

  }, [location]);

  return (

    <AnimatePresence>

      {showSearch && visible && (

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.35 }}
          className='relative overflow-hidden
          bg-[#050816] border-y border-white/10'
        >

          {/* BACKGROUND GLOW */}
          <div className='absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full'></div>

          <div className='absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full'></div>

          <div className='relative max-w-5xl mx-auto px-4 py-7'>

            {/* TITLE */}
            

            {/* SEARCH BOX */}
            <div
              className='group flex items-center gap-4
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl
              px-5 py-4
              transition duration-300
              hover:border-blue-400
              focus-within:border-blue-400
              focus-within:shadow-lg
              focus-within:shadow-blue-500/20'
            >

              {/* ICON */}
              <div
                className='w-11 h-11 rounded-xl
                bg-gradient-to-br from-blue-500/20 to-indigo-500/20
                border border-white/10
                flex items-center justify-center
                text-blue-300'
              >

                <FiSearch className='text-lg' />

              </div>

              {/* INPUT */}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type='text'
                placeholder='Search artwork, patterns, colors...'
                className='flex-1 bg-transparent outline-none
                text-white placeholder:text-blue-300/50
                text-sm sm:text-base'
              />

              {/* CLOSE */}
              <button
                onClick={() => setShowSearch(false)}
                className='w-10 h-10 rounded-xl
                bg-white/5 border border-white/10
                flex items-center justify-center
                text-blue-200
                hover:text-white
                hover:border-red-400
                hover:bg-red-500/10
                transition duration-300'
              >

                <FiX className='text-lg' />

              </button>

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  )
}

export default SearchBar
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const Hero = () => {

  const [dots, setDots] = useState([])
  const navigate = useNavigate()

  const handleMove = (e) => {

    const colors = [
      '#60A5FA',
      '#A78BFA',
      '#F472B6',
      '#34D399',
      '#FBBF24',
      '#22D3EE'
    ]

    const newDot = {
      x: e.clientX,
      y: e.clientY,
      color: colors[Math.floor(Math.random() * colors.length)],
      id: Date.now() + Math.random()
    }

    setDots(prev => [...prev.slice(-30), newDot])
  }

  return (

    <section
      onMouseMove={handleMove}
      className='
      relative overflow-hidden
      bg-[#020617]
      min-h-screen
      flex items-center
      '
    >

      {/* BACKGROUND GLOWS */}
      <div className='absolute top-[-150px] left-[-120px] w-[420px] h-[420px] bg-cyan-500/20 blur-[140px] rounded-full'></div>

      <div className='absolute bottom-[-180px] right-[-120px] w-[420px] h-[420px] bg-purple-500/20 blur-[140px] rounded-full'></div>

      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]'></div>

      {/* CURSOR PARTICLES */}
      {dots.map(dot => (

        <motion.span
          key={dot.id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 2.8 }}
          transition={{ duration: 1 }}
          className='pointer-events-none fixed w-2.5 h-2.5 rounded-full blur-[1px]'
          style={{
            left: dot.x,
            top: dot.y,
            backgroundColor: dot.color,
            boxShadow: `0 0 14px ${dot.color}`
          }}
        />

      ))}

      {/* MAIN CONTAINER */}
      <div
        className='
        relative z-10
        max-w-7xl mx-auto
        px-6 sm:px-10 lg:px-16
        w-full
        '
      >

        <div className='grid lg:grid-cols-2 gap-14 items-center'>

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >

            {/* TAG */}
            <div
              className='
              inline-flex items-center gap-3
              px-5 py-2
              rounded-full
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              mb-8
              '
            >

              <div className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse'></div>

              <p className='text-xs tracking-[0.3em] text-cyan-200 uppercase'>
                Luxury Mandala Collection
              </p>

            </div>

            {/* HEADING */}
            <h1
              className='
              text-5xl
              sm:text-6xl
              lg:text-7xl
              font-black
              leading-[1]
              tracking-tight
              text-white
              '
            >

              Sacred
              <span
                className='
                block mt-2
                bg-gradient-to-r
                from-cyan-300
                via-blue-400
                to-purple-400
                bg-clip-text
                text-transparent
                '
              >
                Geometry
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p
              className='
              mt-8
              text-slate-300
              text-lg
              sm:text-xl
              leading-relaxed
              max-w-xl
              '
            >

              Handcrafted mandala artworks designed to bring
              stillness, symmetry, and cosmic elegance into
              your world.

            </p>

            {/* BUTTONS */}
            <div className='flex flex-wrap gap-4 mt-10'>

              <motion.button
                whileHover={{ scale: 1.04 }}
              onClick={() => navigate('/collection')}
                whileTap={{ scale: 0.96 }}
                className='
                px-8 py-4
                rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white
                font-semibold
                shadow-2xl shadow-cyan-500/20
                hover:shadow-cyan-400/40
                transition duration-300
                '
              >

                Explore Gallery

              </motion.button>

              <motion.button
              onClick={() => navigate('/custom')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className='
                px-8 py-4
                rounded-2xl
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                text-white
                font-medium
                hover:bg-white/10
                transition duration-300
                '
              >

                Custom Design

              </motion.button>

            </div>

            {/* STATS */}
            <div className='flex gap-10 mt-14 flex-wrap'>

              <div>
                <h2 className='text-3xl font-bold text-white'>
                  500+
                </h2>
                <p className='text-slate-400 mt-1 text-sm'>
                  Handmade Designs
                </p>
              </div>

              <div>
                <h2 className='text-3xl font-bold text-white'>
                  4.9★
                </h2>
                <p className='text-slate-400 mt-1 text-sm'>
                  Customer Rating
                </p>
              </div>

              <div>
                <h2 className='text-3xl font-bold text-white'>
                  24/7
                </h2>
                <p className='text-slate-400 mt-1 text-sm'>
                  Creative Support
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className='relative flex justify-center'
          >

            {/* OUTER GLOW */}
            <div className='absolute w-[80%] h-[80%] rounded-full bg-cyan-400/20 blur-[120px]'></div>

            {/* GLASS RING */}
            <div
              className='
              absolute
              w-[90%]
              h-[90%]
              rounded-full
              border border-white/10
              backdrop-blur-xl
              '
            ></div>

            <motion.img
              src={assets.heroImage}
              alt="Mandala Art"
              className='
              relative z-10
              w-[90%]
              max-w-[620px]
              object-contain
              drop-shadow-[0_30px_80px_rgba(0,0,0,0.8)]
              '
              animate={{ y: [0, -18, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

          </motion.div>

        </div>

      </div>

    </section>
  )
}

export default Hero
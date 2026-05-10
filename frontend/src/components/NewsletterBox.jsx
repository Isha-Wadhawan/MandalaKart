import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  return (

    <section className='relative overflow-hidden py-24 bg-gradient-to-b from-[#050816] via-[#09142f] to-[#0d1735]'>

      {/* BACKGROUND GLOWS */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full'></div>

      {/* GRID */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className='relative max-w-4xl mx-auto px-4 sm:px-8 lg:px-12'>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='
          relative overflow-hidden
          rounded-[2rem]
          border border-white/10
          bg-white/[0.05]
          backdrop-blur-2xl
          p-8 sm:p-12
          shadow-2xl shadow-cyan-500/10
        '
        >

          {/* SHINE */}
          <div
            className='
            absolute inset-0
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            translate-x-[-120%]
            animate-[shine_8s_linear_infinite]
            skew-x-12
          '
          ></div>

          {/* ICON */}
          <motion.div
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
            className='
            w-20 h-20 mx-auto
            rounded-3xl
            bg-gradient-to-br from-cyan-500/20 to-blue-600/20
            border border-cyan-400/20
            flex items-center justify-center
            shadow-lg shadow-cyan-500/20
          '
          >

            <Sparkles
              size={34}
              className='text-cyan-300'
            />

          </motion.div>

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='
            mt-8
            text-center
            text-3xl sm:text-5xl
            font-bold
            text-white
            leading-tight
          '
          >
            Join The Mandala Universe 
          </motion.h2>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='
            max-w-2xl mx-auto
            mt-5
            text-center
            text-blue-100/70
            text-sm sm:text-base
            leading-relaxed
          '
          >
            Get exclusive artwork drops, calming creations,
            behind-the-scenes sketches, and collector-only offers
            delivered directly into your inbox.
          </motion.p>

          {/* FORM */}
          <motion.form
            onSubmit={onSubmitHandler}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className='
            relative z-10
            mt-10
            flex flex-col sm:flex-row
            gap-4
          '
          >

            {/* INPUT */}
            <input
              type='email'
              placeholder='Enter your email address'
              required
              className='
              flex-1
              px-6 py-4
              rounded-2xl
              bg-white/[0.06]
              border border-white/10
              text-white
              placeholder:text-blue-100/40
              outline-none
              focus:border-cyan-400/50
              focus:bg-white/[0.08]
              transition duration-300
            '
            />

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.04
              }}
              whileTap={{
                scale: 0.96
              }}
              type='submit'
              className='
              group relative overflow-hidden
              px-8 py-4
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-semibold
              shadow-lg shadow-cyan-500/30
              transition duration-300
            '
            >

              {/* BUTTON SHINE */}
              <span
                className='
                absolute inset-0
                translate-x-[-120%]
                group-hover:translate-x-[120%]
                transition duration-700
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                skew-x-12
              '
              ></span>

              <span className='relative'>
                Subscribe Now
              </span>

            </motion.button>

          </motion.form>

        </motion.div>

      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-120%) skewX(12deg);
          }

          100% {
            transform: translateX(220%) skewX(12deg);
          }
        }
      `}</style>

    </section>
  )
}

export default NewsletterBox
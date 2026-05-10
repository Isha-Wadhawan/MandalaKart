import React from 'react'
import { motion } from 'framer-motion'
import {
  FiRefreshCcw
} from 'react-icons/fi'

import {
  MdVerified
} from 'react-icons/md'

import {
  RiCustomerService2Line
} from 'react-icons/ri'

const policies = [
  {
    icon: <FiRefreshCcw />,
    title: "Easy Exchange",
    desc: "Hassle-free exchanges crafted for a smooth shopping experience."
  },
  {
    icon: <MdVerified />,
    title: "5 Day Returns",
    desc: "Simple and secure returns because confidence matters."
  },
  {
    icon: <RiCustomerService2Line />,
    title: "24/7 Support",
    desc: "Your mandala journey always has a helping hand nearby."
  }
]

const OurPolicy = () => {

  return (

    <section className='relative overflow-hidden py-24 bg-gradient-to-b from-[#050816] via-[#09122b] to-[#0d1735]'>

      {/* BACKGROUND GLOWS */}
      <div className='absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full'></div>

      {/* GRID PATTERN */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>

        {/* HEADER */}
        <div className='text-center mb-16'>

          <p className='text-blue-300 uppercase tracking-[0.35em] text-xs mb-4'>
            Why Choose Us
          </p>

          <h2 className='text-4xl sm:text-5xl font-bold text-white'>
            Crafted With Care
          </h2>

          <p className='max-w-2xl mx-auto mt-5 text-blue-100/70 text-sm sm:text-base leading-relaxed'>
            Every mandala carries patience, detail, and intention.  
            Our policies are designed with the same calm experience in mind.
          </p>

        </div>

        {/* CARDS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>

          {policies.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className='group relative overflow-hidden'
            >

              {/* CARD */}
              <div
                className='
                relative
                h-full
                rounded-3xl
                border border-white/10
                bg-white/[0.05]
                backdrop-blur-2xl
                p-8
                transition duration-500
                hover:border-cyan-400/40
                hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]
              '
              >

                {/* SHINE EFFECT */}
                <div
                  className='
                  absolute inset-0
                  translate-x-[-120%]
                  group-hover:translate-x-[120%]
                  transition duration-1000
                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent
                  skew-x-12
                '
                ></div>

                {/* ICON */}
                <div
                  className='
                  relative z-10
                  w-20 h-20
                  mx-auto
                  rounded-2xl
                  bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                  border border-cyan-400/20
                  flex items-center justify-center
                  text-cyan-300 text-4xl
                  shadow-lg shadow-cyan-500/10
                  group-hover:scale-110
                  group-hover:rotate-6
                  transition duration-500
                '
                >
                  {item.icon}
                </div>

                {/* CONTENT */}
                <div className='relative z-10 text-center mt-8'>

                  <h3 className='text-white text-xl font-semibold'>
                    {item.title}
                  </h3>

                  <p className='mt-4 text-blue-100/70 text-sm leading-relaxed'>
                    {item.desc}
                  </p>

                </div>

                {/* BOTTOM LINE */}
                <div
                  className='
                  mt-8 h-[2px] w-0
                  bg-gradient-to-r from-cyan-400 to-blue-500
                  mx-auto
                  group-hover:w-20
                  transition-all duration-500
                '
                ></div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default OurPolicy
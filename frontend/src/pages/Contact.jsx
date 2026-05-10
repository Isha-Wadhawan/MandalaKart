import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { motion } from 'framer-motion'
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiBookOpen
} from 'react-icons/fi'

const Contact = () => {
  return (

    <div className='relative w-full overflow-hidden bg-[#050816] text-white'>

      {/* BACKGROUND GLOW */}
      <div className='absolute top-0 left-0 w-[500px] h-[500px]
      bg-blue-500/20 blur-[140px] rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-[450px] h-[450px]
      bg-purple-500/20 blur-[140px] rounded-full'></div>

      {/* MANDALA BG */}
      <div
        className='absolute inset-0 opacity-[0.05] bg-center bg-repeat'
        style={{
          backgroundImage: `url(${assets.bgImage})`,
          backgroundSize: '450px'
        }}
      ></div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16'>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >

          <Title text1={'CONTACT'} text2={'US'} />

          <p className='mt-5 max-w-2xl mx-auto
          text-blue-100/80
          text-base sm:text-lg
          leading-relaxed'>

            Questions, collaborations, custom mandalas,
            or just a creative hello ✨

            We’d love to hear from you.

          </p>

        </motion.div>

        {/* MAIN SECTION */}
        <div className='grid md:grid-cols-2 gap-12 items-center'>

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative group'
          >

            {/* glow */}
            <div className='absolute -inset-4
            bg-gradient-to-r from-blue-500/20 to-purple-500/20
            blur-2xl rounded-[40px]
            opacity-0 group-hover:opacity-100
            transition duration-700'></div>

            <div className='relative overflow-hidden rounded-[32px]
            border border-white/10 shadow-2xl'>

              <img
                src={assets.contact_img}
                alt=""
                className='w-full h-full object-cover
                transition duration-700
                group-hover:scale-105'
              />

              {/* overlay */}
              <div className='absolute inset-0
              bg-gradient-to-t from-[#050816] via-transparent to-transparent'></div>

            </div>

          </motion.div>

          {/* INFO PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative'
          >

            <div className='absolute inset-0
            bg-white/5 blur-3xl rounded-[40px]'></div>

            <div className='relative
            backdrop-blur-2xl
            bg-white/5
            border border-white/10
            rounded-[32px]
            p-8 sm:p-10
            space-y-8
            shadow-[0_0_40px_rgba(59,130,246,0.12)]'>

              {/* STORE */}
              <div className='flex gap-4 items-start group'>

                <div className='p-3 rounded-2xl
                bg-blue-500/10 border border-blue-400/20
                text-blue-300 text-xl
                group-hover:scale-110 transition'>
                  <FiMapPin />
                </div>

                <div>
                  <p className='text-lg font-semibold text-white'>
                    Our Studio
                  </p>

                  <p className='text-blue-100/70 mt-1 leading-relaxed'>
                    West Jyoti Nagar <br />
                    New Delhi 110051
                  </p>
                </div>

              </div>

              {/* CONTACT */}
              <div className='flex gap-4 items-start group'>

                <div className='p-3 rounded-2xl
                bg-blue-500/10 border border-blue-400/20
                text-blue-300 text-xl
                group-hover:scale-110 transition'>
                  <FiPhone />
                </div>

                <div>
                  <p className='text-lg font-semibold text-white'>
                    Contact Info
                  </p>

                  <p className='text-blue-100/70 mt-1 leading-relaxed'>
                    (+91) 8447326152 <br />
                    mandalabyjigyasa@gmail.com
                  </p>
                </div>

              </div>

              {/* COURSES */}
              <div className='flex gap-4 items-start group'>

                <div className='p-3 rounded-2xl
                bg-blue-500/10 border border-blue-400/20
                text-blue-300 text-xl
                group-hover:scale-110 transition'>
                  <FiBookOpen />
                </div>

                <div>
                  <p className='text-lg font-semibold text-white'>
                    Learn Mandala Art
                  </p>

                  <p className='text-blue-100/70 mt-1 leading-relaxed'>
                    Join our creative courses and
                    discover calm through art and patterns.
                  </p>
                </div>

              </div>

              {/* BUTTON */}
              <button
                className='group relative overflow-hidden
                mt-2 px-7 py-3 rounded-2xl
                bg-gradient-to-r from-blue-500 to-indigo-600
                text-white font-medium
                hover:scale-105 active:scale-95
                transition duration-300
                shadow-lg shadow-blue-500/25'
              >

                <span className='absolute inset-0
                translate-x-[-120%]
                group-hover:translate-x-[120%]
                transition duration-700
                bg-gradient-to-r from-transparent via-white/30 to-transparent'></span>

                <span className='relative flex items-center gap-2'>
                  Explore Courses
                  <FiMail />
                </span>

              </button>

            </div>

          </motion.div>

        </div>

      </div>

      {/* NEWSLETTER */}
      <div className='relative border-t border-white/10
      bg-white/[0.03] backdrop-blur-xl'>

        <div className='max-w-4xl mx-auto px-4 py-16'>
          <NewsletterBox />
        </div>

      </div>

    </div>
  )
}

export default Contact
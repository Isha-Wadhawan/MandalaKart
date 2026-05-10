import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Palette
} from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: 'Quality Assurance',
    desc: 'Every mandala is crafted with patience, precision, and premium finishing.'
  },
  {
    icon: <Palette size={28} />,
    title: 'Creative Designs',
    desc: 'Unique artwork inspired by balance, harmony, spirituality, and imagination.'
  },
  {
    icon: <HeartHandshake size={28} />,
    title: 'Customer First',
    desc: 'Smooth shopping, quick support, and a caring experience from start to finish.'
  }
]

const About = () => {
  return (
    <div className='relative w-full overflow-hidden bg-[#071028] text-white'>

      {/* BACKGROUND GLOW */}
      <div className='absolute top-0 left-0 w-[500px] h-[500px]
      bg-blue-500/20 blur-[140px] rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-[450px] h-[450px]
      bg-purple-500/20 blur-[140px] rounded-full'></div>

      {/* MANDALA BACKGROUND */}
      <div
        className='absolute inset-0 opacity-[0.05]
        bg-cover bg-center'
        style={{
          backgroundImage: `url(${assets.bgImage})`
        }}
      ></div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16'>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >

        

          <Title text1={'ABOUT'} text2={'US'} />

          <p className='mt-6 max-w-3xl mx-auto
          text-blue-100/80 text-base sm:text-lg
          leading-relaxed'>

            Mandala is more than decoration. It is a quiet universe of patterns,
            balance, and emotion woven into every handcrafted piece.

          </p>

        </motion.div>

        {/* MAIN SECTION */}
        <div className='grid md:grid-cols-2 gap-14 items-center'>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative'
          >

            {/* glow */}
            <div className='absolute inset-0
            bg-blue-500/20 blur-3xl rounded-full'></div>

            <div className='relative overflow-hidden rounded-[2rem]
            border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-2xl shadow-blue-900/30'>

              <img
                className='w-full h-full object-cover
                hover:scale-105 transition duration-700'
                src={assets.about_img}
                alt=""
              />

            </div>

          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className='rounded-[2rem]
            border border-white/10
            bg-white/5 backdrop-blur-xl
            p-8 sm:p-10
            shadow-xl shadow-black/20'>

              <p className='text-blue-100/85 leading-relaxed text-[15px] sm:text-base'>
                Our journey began with a simple idea:
                to transform peaceful emotions into meaningful art.
                Every mandala is carefully handcrafted to create a feeling
                of calmness, focus, and positive energy in your space.
              </p>

              <p className='mt-5 text-blue-100/75 leading-relaxed text-[15px] sm:text-base'>
                We blend creativity with mindfulness, crafting artwork that
                feels personal rather than mass-produced. Each pattern carries
                patience, symmetry, and intention like tiny galaxies spinning
                quietly on paper.
              </p>

              {/* MISSION CARD */}
              <div className='mt-8 rounded-2xl
              bg-gradient-to-r from-blue-500/10 to-purple-500/10
              border border-blue-400/20
              p-5'>

                <h3 className='text-lg font-semibold text-white mb-2'>
                  Our Mission
                </h3>

                <p className='text-blue-100/80 leading-relaxed text-sm sm:text-base'>
                  To create soulful mandala art that inspires creativity,
                  mindfulness, and beauty in everyday life.
                </p>

              </div>

            </div>

          </motion.div>

        </div>

        {/* WHY CHOOSE US */}
        <div className='mt-24'>

          <div className='text-center mb-12'>
            <Title text1={'WHY'} text2={'CHOOSE US'} />

            <p className='text-blue-200/70 mt-4 text-sm sm:text-base'>
              Tiny details. Big feelings. Carefully crafted experiences.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>

            {features.map((item, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className='group relative overflow-hidden
                rounded-[1.8rem]
                border border-white/10
                bg-white/5 backdrop-blur-xl
                p-8 text-center
                transition duration-500
                hover:border-blue-400/40
                hover:shadow-2xl hover:shadow-blue-500/10'
              >

                {/* glow */}
                <div className='absolute inset-0 opacity-0
                group-hover:opacity-100 transition duration-500
                bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_70%)]'>
                </div>

                <div className='relative'>

                  <div className='w-16 h-16 mx-auto mb-5
                  rounded-2xl
                  flex items-center justify-center
                  bg-gradient-to-br from-blue-500/20 to-purple-500/20
                  border border-white/10
                  text-blue-200
                  group-hover:scale-110
                  transition duration-500'>

                    {item.icon}

                  </div>

                  <h3 className='text-lg font-semibold mb-3'>
                    {item.title}
                  </h3>

                  <p className='text-blue-100/70 text-sm leading-relaxed'>
                    {item.desc}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

      {/* NEWSLETTER SECTION */}
      <div className='relative border-t border-white/10
      bg-black/20 backdrop-blur-xl py-16 mt-20'>

        <div className='absolute inset-0 opacity-[0.04]
        bg-cover bg-center'
          style={{
            backgroundImage: `url(${assets.bgImage})`
          }}
        ></div>

        <div className='relative max-w-4xl mx-auto px-4'>
          <NewsletterBox />
        </div>

      </div>

    </div>
  )
}

export default About
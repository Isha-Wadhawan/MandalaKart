import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLatestProducts(products.slice(-10).reverse())
  }, [products])

  return (

    <section className='relative overflow-hidden bg-gradient-to-b from-[#050816] via-[#07142f] to-[#0b1f46] py-24'>

      {/* BACKGROUND GLOWS */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-[140px] rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-[140px] rounded-full'></div>

      {/* GRID PATTERN */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      ></div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>

        {/* TOP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >

          {/* MINI BADGE */}
        

          {/* TITLE */}
          <div className='inline-block relative'>

            <Title text1={'LATEST'} text2={'COLLECTION'} />

            {/* GLOW UNDERLINE */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className='h-[3px] mt-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500'
            ></motion.div>

          </div>

          {/* DESCRIPTION */}
          <p className='max-w-2xl mx-auto mt-6 text-blue-100/80 text-sm sm:text-base leading-relaxed'>

            Fresh mandala creations infused with symmetry, calm energy,
            and handcrafted detail. Every artwork carries its own rhythm.

          </p>

        </motion.div>

        {/* PRODUCT GRID */}
        <div
          className='grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6'
        >

          {latestProducts.map((item, index) => (

            <motion.div
              key={index}
                onClick={() => navigate(`/product/${item._id}`)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08
              }}
              viewport={{ once: true }}
              className='group relative'
            >

              {/* OUTER GLOW */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-500/0 via-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500'></div>

              {/* CARD */}
              <div
                className='
                relative
                h-full
                rounded-3xl
                overflow-hidden
                border border-white/10
                bg-white/[0.05]
                backdrop-blur-2xl
                p-3
                transition-all duration-500
                hover:-translate-y-3
                hover:border-cyan-400/30
              '
              >

                {/* IMAGE */}
                <div className='relative overflow-hidden rounded-2xl'>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  >

                    <ProductItem
                      id={item._id}
                      image={item.images?.[0]}
                    />

                  </motion.div>

                  {/* OVERLAY */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500'></div>

                  {/* FLOATING TAG */}
                  <div className='absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/10 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition duration-500'>

                    NEW ✦

                  </div>

                </div>

                {/* CONTENT */}
                <div className='pt-5 pb-2 px-1'>

                  <h3 className='text-white font-semibold text-sm sm:text-base line-clamp-2 min-h-[48px]'>

                    {item.name}

                  </h3>

                  <div className='mt-4 flex items-center justify-between'>

                    {/* PRICE */}
                    <div>

                      <p className='text-cyan-300 text-lg font-bold'>

                        ₹{item.price}

                      </p>

                    </div>

                    {/* VIEW BUTTON */}
                    <button
                      className='
                      w-10 h-10 rounded-full
                      bg-white/10
                      border border-white/10
                      flex items-center justify-center
                      text-white
                      hover:bg-cyan-400
                      hover:text-black
                      transition duration-300
                    '
                    >

                      →

                    </button>

                  </div>

                </div>

                {/* SHIMMER */}
                <div
                  className='
                  absolute inset-0
                  translate-x-[-120%]
                  group-hover:translate-x-[120%]
                  transition duration-1000
                  bg-gradient-to-r from-transparent via-white/10 to-transparent
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

export default LatestCollection
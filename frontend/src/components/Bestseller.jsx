import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'
import {assets} from '../assets/assets'

const Bestseller = () => {

  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const bestProduct = products.filter(
      (item) => item.bestSeller
    )

    setBestSeller(bestProduct.slice(0, 5))

  }, [products])

  return (

    <div className='relative w-full overflow-hidden py-16'>

  {/* BACKGROUND IMAGE */}
  <div
    className='absolute inset-0 bg-cover bg-center opacity-10'
    style={{
     backgroundImage: `url(${assets.bgImage})`
    }}
  ></div>

  {/* GRADIENT OVERLAY */}
  <div className='absolute inset-0 bg-gradient-to-b from-[#fdfbff] via-[#eef4ff] to-[#dfe9ff]'></div>

  {/* GLOW EFFECTS */}
  <div className='absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl'></div>

  <div className='absolute bottom-10 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl'></div>

  {/* MANDALA PATTERN */}
  <div
    className='absolute inset-0 opacity-[0.04] bg-repeat'
    style={{
      backgroundImage:
        "url('https://www.transparenttextures.com/patterns/arabesque.png')"
    }}
  ></div>

  {/* CONTENT */}
  <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>

    {/* TITLE */}
    <div className='text-center mb-12'>

      <Title text1={'OUR'} text2={'BESTSELLERS'} variant="light" />

      <p className='max-w-2xl mx-auto mt-4 
      text-gray-700 text-sm sm:text-base 
      font-light leading-relaxed tracking-wide'>
        Our most loved mandala pieces, chosen by those who appreciate calm and craft.
      </p>

    </div>

    {/* GRID */}
    <div className='grid 
    grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-4 
    lg:grid-cols-5 
    gap-6'>

      {bestSeller.map((item, index) => (
        <div
          key={index}
          className='group relative bg-white/70 backdrop-blur-xl rounded-3xl p-3 
          border border-white/40
          shadow-lg hover:shadow-2xl hover:shadow-blue-200/40
          transition duration-500 
          hover:-translate-y-2 
          overflow-hidden'
        >

          {/* CARD GLOW */}
          <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-100/40 via-purple-100/20 to-pink-100/30'></div>

          <div className='relative z-10'>
            <ProductItem
              id={item._id}
              image={item.images?.[0]}
            />
          </div>

          {/* HOVER PANEL */}
          <div className='absolute bottom-0 left-0 w-full 
          bg-white/90 backdrop-blur-md text-gray-800 
          px-4 py-4
          translate-y-full group-hover:translate-y-0 
          transition-transform duration-500 z-20'>

            <p className='text-sm font-semibold line-clamp-2'>
              {item.name}
            </p>

            <p className='text-sm text-blue-600 mt-1'>
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
              }).format(item.price)}
            </p>

          </div>

          {/* LIGHT BORDER ANIMATION */}
          <span className='absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-200 transition duration-500'></span>

        </div>
      ))}

    </div>

  </div>

</div>

  )
}

export default Bestseller
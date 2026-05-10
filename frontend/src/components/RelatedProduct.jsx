import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const RelatedProduct = ({ category }) => {

    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        if (products.length > 0) {

            let productsCopy = products.slice()

            productsCopy = productsCopy.filter(
                (item) => category === item.category
            )

            setRelated(productsCopy.slice(0, 5))
        }

    }, [products, category])

    return (

        <div className='relative w-full overflow-hidden'>

            {/* BACKGROUND */}
            <div className='absolute inset-0 bg-gradient-to-b from-[#f8fbff] via-white to-[#edf5ff]' />

            {/* MANDALA GLOW */}
            <div className='absolute top-[-120px] left-[-120px] 
            w-[320px] h-[320px] 
            rounded-full blur-3xl 
            bg-blue-200/40'></div>

            <div className='absolute bottom-[-140px] right-[-140px] 
            w-[340px] h-[340px] 
            rounded-full blur-3xl 
            bg-purple-200/30'></div>

            {/* FLOATING ORBS */}
            <motion.div
                animate={{
                    y: [0, -18, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity
                }}
                className='absolute top-24 right-24 
                w-28 h-28 rounded-full 
                border border-blue-200/50 
                bg-white/30 backdrop-blur-xl'
            />

            <motion.div
                animate={{
                    y: [0, 15, 0],
                    x: [0, 8, 0]
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity
                }}
                className='absolute bottom-24 left-20 
                w-20 h-20 rounded-full 
                border border-purple-200/40 
                bg-white/40 backdrop-blur-xl'
            />

            {/* CONTENT */}
            <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20'>

                {/* TITLE */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className='text-center mb-14'
                >

                    {/* MINI TAG */}
                    <div className='inline-flex items-center gap-2 
                    px-4 py-1.5 rounded-full 
                    bg-blue-100 text-blue-700 
                    text-xs tracking-[0.25em] uppercase 
                    border border-blue-200/60 mb-5'>

                        ✦ Handpicked For You
                    </div>

                    <h2 className='text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight'>

                        Related{' '}
                        <span className='bg-gradient-to-r 
                        from-blue-600 via-indigo-500 to-purple-500
                        bg-clip-text text-transparent'>
                            Creations
                        </span>

                    </h2>

                    <p className='mt-5 max-w-2xl mx-auto 
                    text-gray-500 text-sm sm:text-base leading-relaxed'>

                        Similar mandala artworks flowing in the same artistic rhythm ✨
                    </p>

                    {/* UNDERLINE */}
                    <div className='flex justify-center mt-6'>
                        <span className='h-[3px] w-24 rounded-full 
                        bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400'></span>
                    </div>

                </motion.div>

                {/* GRID */}
                <div className='grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5 
                gap-6'>

                    {related.map((item, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08
                            }}
                            viewport={{ once: true }}
                            onClick={() => navigate(`/product/${item._id}`)}
                            className='group relative cursor-pointer'
                        >

                            {/* CARD */}
                            <div className='relative overflow-hidden 
                            rounded-3xl 
                            bg-white/80 backdrop-blur-xl
                            border border-white/60
                            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                            transition duration-500
                            hover:-translate-y-3
                            hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)]'>

                                {/* TOP BADGE */}
                                <div className='absolute top-3 left-3 z-20 
                                px-3 py-1 rounded-full 
                                bg-white/90 backdrop-blur-md
                                text-[10px] tracking-widest 
                                text-blue-700 border border-blue-100'>

                                    MANDALA
                                </div>

                                {/* IMAGE */}
                                <div className='relative overflow-hidden aspect-square'>

                                    <img
                                        src={item.images?.[0]}
                                        alt={item.name}
                                        className='w-full h-full object-cover 
                                        transition duration-[1200ms]
                                        group-hover:scale-110'
                                    />

                                    {/* IMAGE OVERLAY */}
                                    <div className='absolute inset-0 
                                    bg-gradient-to-t 
                                    from-black/30 via-transparent to-transparent 
                                    opacity-0 group-hover:opacity-100
                                    transition duration-500'></div>

                                </div>

                                {/* CONTENT */}
                                <div className='p-4'>

                                    <p className='text-sm font-medium 
                                    text-gray-800 line-clamp-2 
                                    leading-relaxed'>

                                        {item.name}
                                    </p>

                                    <div className='flex items-center 
                                    justify-between mt-3'>

                                        <p className='text-blue-600 
                                        font-semibold text-sm'>

                                            {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR'
                                            }).format(item.price)}

                                        </p>

                                        <span className='text-xs text-gray-400 
                                        group-hover:text-blue-500 
                                        transition duration-300'>

                                            View →
                                        </span>

                                    </div>

                                </div>

                                {/* GLOW EDGE */}
                                <span className='absolute bottom-0 left-0 
                                h-[3px] w-0 
                                bg-gradient-to-r 
                                from-blue-500 via-indigo-400 to-purple-400
                                transition-all duration-700 
                                group-hover:w-full'></span>

                            </div>

                        </motion.div>
                    ))}

                </div>

            </div>

        </div>
    )
}

export default RelatedProduct
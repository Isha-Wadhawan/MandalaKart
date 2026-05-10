// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'

// const Cart = () => {

//   const { products, cartItems, updateQty, navigate, currency } =
//     useContext(ShopContext)

//   const [cartData, setCartData] = useState([])

//   useEffect(() => {

//     const tempData = []

//     for (const key in cartItems) {

//       const item = cartItems[key]

//       // CUSTOM PRODUCT
//       if (item.custom) {

//         tempData.push({
//           _id: key,
//           custom: true,
//           name: item.name,
//           image: item.image,
//           size: item.size,
//           price: item.price,
//           quantity: item.quantity
//         })

//       }

//       // NORMAL PRODUCT
//       else {

//         for (const size in item) {

//           if (item[size] > 0) {

//             const productData = products.find(
//               (product) => product._id === key
//             )

//             if (productData) {
//               tempData.push({
//                 _id: key,
//                 custom: false,
//                 name: productData.name,
//                 image: productData.images?.[0],
//                 size,
//                 price: productData.price,
//                 quantity: item[size]
//               })
//             }
//           }
//         }
//       }
//     }

//     setCartData(tempData)

//   }, [cartItems, products])

//   return (

//     <div className='w-full bg-blue-900 min-h-screen py-10 text-blue-100'>

//       <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>

//         {/* TITLE */}
//         <div className='text-center mb-10'>
//           <Title text1={'YOUR'} text2={'CART'} />

//           <p className='mt-3 text-blue-200 text-sm'>
//             Review your selected mandala pieces before checkout.
//           </p>
//         </div>

//         {/* CART ITEMS */}
//         <div className='space-y-4'>

//           {cartData.map((item, index) => (

//             <div
//               key={index}
//               className='bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4'
//             >

//               {/* IMAGE */}
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className='w-20 h-20 object-cover rounded-lg'
//               />

//               {/* DETAILS */}
//               <div className='flex-1'>

//                 <p className='text-white font-medium'>
//                   {item.name}
//                 </p>

//                 <div className='flex gap-4 text-sm text-blue-200 mt-1'>

//                   <p>
//                     {currency}{item.price}
//                   </p>

//                   <p>
//                     Size: {item.size}
//                   </p>

//                 </div>

//               </div>

//               {/* QTY */}
//               <input
//                 type='number'
//                 min={1}
//                 value={item.quantity}
//                 onChange={(e) =>
//                   updateQty(
//                     item._id,
//                     item.size,
//                     Number(e.target.value)
//                   )
//                 }
//                 className='w-16 px-2 py-1 text-center rounded bg-white/10 border border-white/20'
//               />

//               {/* DELETE */}
//               <button
//                 onClick={() =>
//                   updateQty(item._id, item.size, 0)
//                 }
//                 className='text-red-400 text-xl'
//               >
//                 🗑
//               </button>

//             </div>

//           ))}

//         </div>

//         {/* EMPTY */}
//         {cartData.length === 0 && (

//           <div className='text-center text-blue-200 mt-20'>

//             <p>
//               Your cart feels a little empty right now 🫧
//             </p>

//             <button
//               onClick={() => navigate('/collection')}
//               className='mt-4 px-6 py-2 bg-blue-500 rounded-lg'
//             >
//               Explore Collection
//             </button>

//           </div>

//         )}

//         {/* TOTAL */}
//         {cartData.length > 0 && (

//           <div className='flex justify-end mt-16'>

//             <div className='w-full sm:w-[420px] bg-white/5 p-6 rounded-xl'>

//               <CartTotal />

//               <button
//                 onClick={() => navigate('/place-order')}
//                 className='mt-6 w-full py-3 bg-blue-500 rounded-lg'
//               >
//                 PROCEED TO CHECKOUT
//               </button>

//             </div>

//           </div>

//         )}

//       </div>

//     </div>
//   )
// }

// export default Cart



import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { motion } from 'framer-motion'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { BsArrowRight } from 'react-icons/bs'

const Cart = () => {

  const {
    products,
    cartItems,
    updateQty,
    navigate,
    currency
  } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {

    const tempData = []

    for (const key in cartItems) {

      const item = cartItems[key]

      // CUSTOM PRODUCT
      if (item.custom) {

        tempData.push({
          _id: key,
          custom: true,
          name: item.name,
          image: item.image,
          size: item.size,
          price: item.price,
          quantity: item.quantity
        })

      }

      // NORMAL PRODUCT
      else {

        for (const size in item) {

          if (item[size] > 0) {

            const productData = products.find(
              (product) => product._id === key
            )

            if (productData) {

              tempData.push({
                _id: key,
                custom: false,
                name: productData.name,
                image: productData.images?.[0],
                size,
                price: productData.price,
                quantity: item[size]
              })

            }

          }

        }

      }

    }

    setCartData(tempData)

  }, [cartItems, products])

  return (

    <div className='relative min-h-screen overflow-hidden bg-[#050816]'>

      {/* BACKGROUND */}
      <div className='absolute inset-0 opacity-[0.05]'
        style={{
          backgroundImage: `radial-gradient(circle at center, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className='absolute top-0 left-0 w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full'></div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14'>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='text-center mb-14'
        >

         

          <Title text1={'SHOPPING'} text2={'CART'} />

          <p className='mt-4 text-blue-200/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
            Your chosen mandalas are waiting quietly here, like tiny galaxies ready to decorate your walls ✨
          </p>

        </motion.div>

        {/* EMPTY STATE */}
        {cartData.length === 0 && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex flex-col items-center justify-center
            rounded-[2rem]
            border border-white/10
            bg-white/5 backdrop-blur-2xl
            py-24 px-6 text-center'
          >

            <div className='text-7xl mb-6'>
              🫧
            </div>

            <h2 className='text-2xl font-semibold text-white'>
              Your cart is floating peacefully
            </h2>

            <p className='mt-3 text-blue-200/70 max-w-md'>
              Add handcrafted mandala creations and turn this quiet space into an art constellation.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/collection')}
              className='mt-8 flex items-center gap-3
              px-7 py-4 rounded-2xl
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white shadow-xl shadow-blue-500/30'
            >

              Explore Collection

              <BsArrowRight />

            </motion.button>

          </motion.div>

        )}

        {/* CART CONTENT */}
        {cartData.length > 0 && (

          <div className='grid lg:grid-cols-[1fr_400px] gap-10'>

            {/* LEFT */}
            <div className='space-y-5'>

              {cartData.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='group relative overflow-hidden
                  rounded-[2rem]
                  border border-white/10
                  bg-white/5 backdrop-blur-2xl
                  p-5'
                >

                  {/* glow */}
                  <div className='absolute inset-0 opacity-0 group-hover:opacity-100
                  transition duration-700
                  bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_60%)]'></div>

                  <div className='relative flex flex-col sm:flex-row gap-5 items-center'>

                    {/* IMAGE */}
                    <div className='overflow-hidden rounded-2xl border border-white/10'>

                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-28 h-28 object-cover
                        transition duration-700
                        group-hover:scale-110'
                      />

                    </div>

                    {/* DETAILS */}
                    <div className='flex-1 text-center sm:text-left'>

                      <h2 className='text-white text-lg font-medium'>
                        {item.name}
                      </h2>

                      <div className='flex flex-wrap justify-center sm:justify-start gap-3 mt-3'>

                        <span className='px-3 py-1 rounded-full
                        bg-blue-500/10 border border-blue-400/20
                        text-blue-200 text-xs'>

                          Size: {item.size}

                        </span>

                        <span className='px-3 py-1 rounded-full
                        bg-emerald-400/10 border border-emerald-400/20
                        text-emerald-300 text-xs'>

                          {currency}{item.price}

                        </span>

                        {item.custom && (
                          <span className='px-3 py-1 rounded-full
                          bg-purple-500/10 border border-purple-400/20
                          text-purple-300 text-xs'>

                            Custom Artwork

                          </span>
                        )}

                      </div>

                    </div>

                    {/* QTY */}
                    <div className='flex items-center gap-3'>

                      <div className='flex items-center overflow-hidden
                      rounded-xl border border-white/10 bg-black/20'>

                        <button
                          onClick={() =>
                            updateQty(
                              item._id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className='px-3 py-2 text-blue-200 hover:bg-white/10 transition'
                        >
                          −
                        </button>

                        <div className='px-4 text-white'>
                          {item.quantity}
                        </div>

                        <button
                          onClick={() =>
                            updateQty(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className='px-3 py-2 text-blue-200 hover:bg-white/10 transition'
                        >
                          +
                        </button>

                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          updateQty(item._id, item.size, 0)
                        }
                        className='w-11 h-11 rounded-xl
                        bg-red-500/10 border border-red-400/20
                        text-red-300
                        hover:bg-red-500/20
                        transition duration-300
                        flex items-center justify-center'
                      >

                        <FiTrash2 />

                      </button>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className='h-fit sticky top-24
              rounded-[2rem]
              border border-white/10
              bg-white/5 backdrop-blur-2xl
              p-7'
            >

              <div className='mb-6'>
    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-blue-500/10 border border-blue-400/20
                text-blue-200 text-xs tracking-[0.25em] mb-4'>

                    ✦ ORDER SUMMARY ✦

                </div>
              </div>

              <CartTotal />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/place-order')}
                className='mt-8 w-full py-4 rounded-2xl
                bg-gradient-to-r from-blue-500 to-indigo-600
                text-white font-medium
                shadow-xl shadow-blue-500/30
                flex items-center justify-center gap-3'
              >

                Proceed To Checkout

                <BsArrowRight className='text-lg' />

              </motion.button>

            </motion.div>

          </div>

        )}

      </div>

    </div>

  )
}

export default Cart
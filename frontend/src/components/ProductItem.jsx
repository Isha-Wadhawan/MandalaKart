// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom';

// const ProductItem = ({id,image,name,price}) => {

//     const{currency} = useContext(ShopContext);

//   return (
//   <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
//     <div className='overflow-hidden'>
//         <img className='hover:scale-110 transition ease-in-out' 
//              src={image || "/placeholder.jpg"}/>
//     </div>
//     <p className='pt-3 pb-1 text-sm'>{name}</p>
//     <p className='text-sm font-medium'>{currency}{price}</p>
//   </Link>
//   )
// }

// export default ProductItem
// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'

// const ProductItem = ({ id, image, name, price }) => {

//   const { currency } = useContext(ShopContext)

//   return (
//     <Link 
//       to={`/product/${id}`} 
//       className='group block text-gray-700'
//     >

//       {/* IMAGE CONTAINER */}
//       <div className='w-full aspect-square overflow-hidden rounded-md bg-gray-100'>
//         <img 
//           src={image || "/placeholder.jpg"} 
//           alt={name}
//           className='w-full h-full object-cover 
//           transition duration-500 
//           group-hover:scale-110'
//         />
//       </div>

//       {/* CONTENT */}
//       <div className='mt-3 space-y-1'>

//         <p className='text-sm font-medium text-gray-800 
//         line-clamp-2 min-h-[40px]'>
//           {name}
//         </p>

//         <p className='text-sm font-semibold text-blue-900'>
//           {currency} {price}
//         </p>

//       </div>

//     </Link>
//   )
// }

// export default ProductItem


import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image }) => {
  return (
    <Link to={`/product/${id}`} className='block group'>

      <div className='w-full aspect-square overflow-hidden rounded-md bg-gray-100'>
        <img 
          src={image || "/placeholder.jpg"} 
          alt=""
          className='w-full h-full object-cover 
          transition duration-500 
          group-hover:scale-110'
        />
      </div>

    </Link>
  )
}

export default ProductItem
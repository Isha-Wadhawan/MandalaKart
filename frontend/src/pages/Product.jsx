// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProduct from '../components/RelatedProduct';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');

//   const fetchProductData = () => {
//     const foundProduct = products.find((item) => item._id === productId);
//     if (foundProduct) {
//       setProductData(foundProduct);
//       if (Array.isArray(foundProduct.images) && foundProduct.images.length > 0) {
//         setImage(foundProduct.images[0]);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   return productData ? (
//     <div className="w-full bg-blue-900 text-blue-100 min-h-screen py-10">

//   <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

//     {/* MAIN SECTION */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

//       {/* IMAGE SECTION */}
//       <div className="flex gap-4">

//         {/* THUMBNAILS */}
//         <div className="flex flex-col gap-3 w-[20%]">
//           {productData.images?.map((item, index) => (
//             <img
//               key={index}
//               onClick={() => setImage(item)}
//               src={item}
//               className={`cursor-pointer rounded-md transition duration-300 
//               ${image === item ? 'ring-2 ring-blue-400' : 'opacity-70 hover:opacity-100'}`}
//             />
//           ))}
//         </div>

//         {/* MAIN IMAGE */}
//         <div className="flex-1 overflow-hidden rounded-xl">
//           <img
//             src={image || assets.default_placeholder}
//             className="w-full h-full object-cover 
//             transition duration-500 hover:scale-105"
//           />
//         </div>

//       </div>

//       {/* PRODUCT INFO CARD */}
//       <div className="bg-white/5 backdrop-blur-md 
//       border border-white/10 rounded-xl 
//       p-6 sm:p-8 
//       flex flex-col gap-5 
//       transition duration-300 
//       hover:border-blue-400 
//       hover:shadow-lg hover:shadow-blue-500/20">

//         {/* NAME */}
//         <h1 className="text-2xl sm:text-3xl font-semibold text-white">
//           {productData.name}
//         </h1>

//         {/* RATING */}
//         <div className="flex items-center gap-1 text-blue-300 text-sm">
//           ⭐⭐⭐⭐☆
//           <span className="ml-2">(122 reviews)</span>
//         </div>

//         {/* PRICE */}
//         <p className="text-2xl font-semibold text-blue-400">
//           {new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR'
//           }).format(productData.price)}
//         </p>

//         {/* DESCRIPTION */}
//         <p className="text-blue-200 text-sm leading-relaxed">
//           {productData.description}
//         </p>

//         {/* SIZE SELECT */}
//         <div className="mt-4">
//           <p className="mb-2 text-sm text-blue-300">
//             Select Frame Size
//           </p>

//           <div className="flex gap-2 flex-wrap">
//             {productData.sizes.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSize(item)}
//                 className={`px-4 py-2 rounded-md text-sm transition
//                 ${item === size 
//                   ? 'bg-blue-500 text-white shadow-md' 
//                   : 'bg-white/10 text-blue-100 hover:bg-blue-400/30'}`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ADD TO CART */}
//         <button
//           onClick={() => addToCart(productData._id, size)}
//           className="mt-4 w-full py-3 rounded-lg 
//           bg-blue-500 text-white text-sm 
//           hover:bg-blue-400 
//           transition duration-300 
//           hover:shadow-lg hover:shadow-blue-400/30 
//           active:scale-[0.98]"
//         >
//           ADD TO CART
//         </button>

//         {/* INFO */}
//         <div className="text-xs text-blue-300 mt-4 space-y-1">
//           <p>✔ 100% Original Artwork</p>
//           <p>✔ Cash on delivery available</p>
//           <p>✖ No return or exchange</p>
//         </div>

//       </div>

//     </div>

//     {/* DESCRIPTION SECTION */}
//     <div className="mt-16">

//       <div className="flex gap-2">
//         <span className="px-5 py-2 bg-blue-500 text-white rounded-t-md text-sm">
//           Description
//         </span>
//         <span className="px-5 py-2 bg-white/10 text-blue-200 rounded-t-md text-sm">
//           Reviews (122)
//         </span>
//       </div>

//       <div className="bg-white/5 backdrop-blur-md 
//       border border-white/10 rounded-b-md 
//       p-6 text-sm text-blue-200 leading-relaxed space-y-4">

//         <p>
//           Each mandala is crafted with precision and patience, bringing harmony and balance into your space.
//         </p>

//         <p>
//           Designed to inspire calmness, these artworks are more than decor — they are an experience.
//         </p>

//       </div>

//     </div>

//   </div>

//   {/* RELATED PRODUCTS (light contrast section) */}
//   <div className="mt-16 bg-white py-12">
//     <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
//       <RelatedProduct category={productData.category} />
//     </div>
//   </div>

// </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default Product;



import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import { motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineWorkspacePremium } from 'react-icons/md';

const Product = () => {

  const { productId } = useParams();

  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  // const fetchProductData = () => {

  //   const foundProduct = products.find(
  //     (item) => item._id === productId
  //   );

  //   if (foundProduct) {

  //     setProductData(foundProduct);

  //     if (
  //       Array.isArray(foundProduct.image) &&
  //       foundProduct.image.length > 0
  //     ) {
  //       setImage(foundProduct.image[0]);
  //     }
  //   }
  // };
    const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      if (Array.isArray(foundProduct.images) && foundProduct.images.length > 0) {
        setImage(foundProduct.images[0]);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (

    <div className='relative w-full min-h-screen overflow-hidden bg-[#050816]'>

      {/* BACKGROUND */}
      <div
        className='absolute inset-0 opacity-[0.05] bg-cover bg-center'
        style={{
          backgroundImage: `url(${assets.bgImage})`
        }}
      />

      <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full'></div>

      {/* MAIN */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14'>

        {/* PRODUCT SECTION */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className='flex flex-col-reverse sm:flex-row gap-5'
          >

            {/* THUMBNAILS */}
            <div className='flex sm:flex-col gap-3'>

              {productData.images?.map((item, index) => (

                <div
                  key={index}
                  onClick={() => setImage(item)}
                  className={`
                  cursor-pointer overflow-hidden rounded-2xl
                  border transition duration-300
                  ${image === item
                      ? 'border-blue-400 shadow-lg shadow-blue-500/30'
                      : 'border-white/10 hover:border-blue-300'}
                  `}
                >

                  <img
                    src={item}
                    alt=""
                    className='w-20 h-20 object-cover hover:scale-110 transition duration-500'
                  />

                </div>

              ))}

            </div>

            {/* MAIN IMAGE */}
            <div
              className='group relative flex-1 overflow-hidden rounded-[2rem]
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-2xl shadow-blue-900/20'
            >

              {/* glow */}
              <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_65%)]'></div>

              <img
                src={image || assets.default_placeholder}
                alt=""
                className='relative w-full h-full object-cover transition duration-700 group-hover:scale-105'
              />

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className='relative overflow-hidden rounded-[2rem]
            bg-white/5 backdrop-blur-2xl
            border border-white/10
            p-7 sm:p-9'
          >

            {/* TOP BADGE */}
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5
            bg-blue-500/15 border border-blue-400/20 text-blue-200 text-xs tracking-[0.25em]'>

              ✦ HANDCRAFTED MANDALA ART ✦

            </div>

            {/* NAME */}
            <h1 className='text-3xl sm:text-4xl font-semibold text-white leading-tight'>
              {productData.name}
            </h1>

            {/* RATING */}
            <div className='flex items-center gap-3 mt-5'>

              <div className='text-yellow-300 text-lg'>
                ★★★★☆
              </div>

              <p className='text-blue-200 text-sm'>
                122 collectors loved this artwork
              </p>

            </div>

            {/* PRICE */}
            <div className='mt-6 flex items-center gap-4'>

              <p className='text-4xl font-bold text-white'>
                ₹{productData.price}
              </p>

              <span className='px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/20 text-emerald-300 text-xs'>
                Limited Edition
              </span>

            </div>

            {/* DESCRIPTION */}
            <p className='mt-7 text-blue-100/80 leading-relaxed text-sm sm:text-base'>
              {productData.description}
              <br /><br />
              Crafted with layered symmetry and calming detail, this mandala transforms ordinary walls into quiet galaxies of focus and color.
            </p>

            {/* SIZE */}
            <div className='mt-8'>

              <p className='text-sm uppercase tracking-[0.2em] text-blue-300 mb-4'>
                Select Frame Size
              </p>

              <div className='flex flex-wrap gap-3'>

                {productData.sizes.map((item, index) => (

                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`
                    px-5 py-3 rounded-2xl text-sm transition duration-300
                    border backdrop-blur-md
                    ${item === size
                        ? 'bg-blue-500 text-white border-blue-300 shadow-lg shadow-blue-500/30 scale-105'
                        : 'bg-white/5 text-blue-100 border-white/10 hover:border-blue-300 hover:bg-blue-400/10'}
                    `}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            {/* BUTTONS */}
            <div className='flex flex-col sm:flex-row gap-4 mt-10'>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => addToCart(productData._id, size)}
                className='flex-1 flex items-center justify-center gap-3
                py-4 rounded-2xl
                bg-gradient-to-r from-blue-500 to-indigo-600
                text-white font-medium
                shadow-xl shadow-blue-500/30'
              >

                <FiShoppingBag className='text-lg' />

                Add To Cart

              </motion.button>

           

            </div>

            {/* FEATURES */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10'>

              {[
                'Original Artwork',
                'Premium Quality',
                'Safe Packaging'
              ].map((item, i) => (

                <div
                  key={i}
                  className='rounded-2xl bg-white/5 border border-white/10 p-4 text-center'
                >

                  <MdOutlineWorkspacePremium className='mx-auto text-blue-300 text-2xl mb-2' />

                  <p className='text-sm text-blue-100'>
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

        {/* DESCRIPTION SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='mt-20'
        >

          {/* TAB */}
          <div className='flex items-center gap-3'>

            <span className='px-6 py-3 rounded-t-2xl bg-blue-500 text-white text-sm'>
              Description
            </span>

            <span className='px-6 py-3 rounded-t-2xl bg-white/5 border border-white/10 text-blue-200 text-sm'>
              Reviews (122)
            </span>

          </div>

          {/* CONTENT */}
          <div
            className='rounded-b-[2rem] rounded-r-[2rem]
            bg-white/5 backdrop-blur-xl
            border border-white/10
            p-8 text-blue-100/80 leading-relaxed'
          >

            <p>
              Every mandala piece is created with precision, patience, and layered symmetry. The intricate detailing creates a visual rhythm that naturally draws attention and adds calm energy to interiors.
            </p>

            <p className='mt-5'>
              Whether displayed in a studio, bedroom, office, or meditation space, these artworks become a quiet centerpiece that blends modern aesthetics with timeless patterns.
            </p>

          </div>

        </motion.div>

      </div>

      {/* RELATED */}
      <div className='relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-xl py-16'>

        <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>

          <RelatedProduct category={productData.category} />

        </div>

      </div>

    </div>

  ) : (
    <div className='w-full min-h-screen bg-[#050816]'></div>
  );
};

export default Product;
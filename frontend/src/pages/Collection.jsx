import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { useNavigate } from 'react-router-dom'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search, showSearch]);

  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filterProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );


 return (

  <div className='relative min-h-screen overflow-hidden bg-gradient-to-b from-[#050816] via-[#09142f] to-[#0d1735] py-12'>

    {/* BACKGROUND GLOWS */}
    <div className='absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full'></div>

    <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full'></div>

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

      {/* HERO */}
      <div className='mb-14 text-center'>

        <p className='text-cyan-300 uppercase tracking-[0.35em] text-xs mb-4'>
          Mandala Gallery
        </p>

        <h1 className='text-4xl sm:text-5xl font-bold text-white'>
          Explore The Collection
        </h1>

        <p className='max-w-2xl mx-auto mt-5 text-blue-100/70 text-sm sm:text-base leading-relaxed'>
          Handcrafted mandalas filled with geometry, calm,
          storytelling, and artistic energy.
        </p>

      </div>

      <div className='flex flex-col lg:flex-row gap-8'>

        {/* SIDEBAR */}
        <div className='lg:w-[280px]'>

          <div
            className='
            sticky top-24
            rounded-3xl
            border border-white/10
            bg-white/[0.05]
            backdrop-blur-2xl
            p-6
            shadow-2xl shadow-cyan-500/5
          '
          >

            {/* FILTER HEADER */}
            <div
              onClick={() => setShowFilter(!showFilter)}
              className='flex items-center justify-between cursor-pointer'
            >

              <h2 className='text-white text-xl font-semibold'>
                Filters
              </h2>

              <img
                className={`h-3 transition lg:hidden ${showFilter ? 'rotate-180' : ''}`}
                src={assets.dropdown_icon}
                alt=""
              />

            </div>

            {/* FILTER BODY */}
            <div className={`${showFilter ? 'block' : 'hidden'} lg:block`}>

              <div className='mt-8'>

                <p className='text-cyan-300 text-sm uppercase tracking-wider mb-5'>
                  Categories
                </p>

                <div className='space-y-4'>

                  {['Illustration', 'Colorful', 'Black&White'].map((cat, i) => (

                    <label
                      key={i}
                      className='group flex items-center gap-3 cursor-pointer'
                    >

                      <input
                        type='checkbox'
                        value={cat}
                        onChange={toggleCategory}
                        className='accent-cyan-400 w-4 h-4'
                      />

                      <span
                        className='
                        text-blue-100/80
                        group-hover:text-white
                        transition
                      '
                      >
                        {cat}
                      </span>

                    </label>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className='flex-1'>

          {/* TOP BAR */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10'>

            <Title text1={'ALL'} text2={'COLLECTIONS'} />

           <div className='relative w-full sm:w-[240px]'>

  <select
    onChange={(e) => setSortType(e.target.value)}
    className='
    appearance-none
    w-full
    px-5 py-3.5 pr-12
    rounded-2xl
    bg-white/[0.06]
    border border-white/10
    backdrop-blur-2xl
    text-blue-100
    outline-none
    transition duration-300
    hover:border-cyan-400/40
    focus:border-cyan-400/60
    focus:shadow-[0_0_20px_rgba(34,211,238,0.15)]
    cursor-pointer
  '
  >
    <option className='bg-[#0b1730] text-white' value="relevant">
      Sort: Relevant
    </option>

    <option className='bg-[#0b1730] text-white' value="low-high">
      Price: Low → High
    </option>

    <option className='bg-[#0b1730] text-white' value="high-low">
      Price: High → Low
    </option>

  </select>

  {/* CUSTOM ARROW */}
  <div
    className='
    pointer-events-none
    absolute right-4 top-1/2
    -translate-y-1/2
    text-cyan-300
    text-sm
  '
  >
    ▼
  </div>

</div>

          </div>

          {/* PRODUCTS GRID */}
          <div
            className='
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-6
          '
          >

            {currentProducts.map((item, index) => (

              <div
                key={index}
                onClick={() => navigate(`/product/${item._id}`)}
                className='
                group cursor-pointer
                relative overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.05]
                backdrop-blur-xl
                transition duration-500
                hover:-translate-y-2
                hover:border-cyan-400/30
                hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]
              '
              >

                {/* IMAGE */}
                <div className='aspect-square overflow-hidden'>

                  <img
                    src={item.images?.[0]}
                    alt=""
                    className='
                    w-full h-full object-cover
                    transition duration-700
                    group-hover:scale-110
                  '
                  />

                </div>

                {/* OVERLAY */}
                <div
                  className='
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80 via-black/20 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition duration-500
                '
                ></div>

                {/* CONTENT */}
                <div className='relative p-5 z-10'>

                  <p className='text-white font-medium line-clamp-2'>
                    {item.name}
                  </p>

                  <p className='mt-2 text-cyan-300 font-semibold'>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format(item.price)}
                  </p>

                </div>

                {/* GLOW LINE */}
                <div
                  className='
                  absolute bottom-0 left-0
                  h-[2px] w-0
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500
                  group-hover:w-full
                  transition-all duration-500
                '
                ></div>

              </div>

            ))}

          </div>

          {/* PAGINATION */}
          <div className='flex justify-center flex-wrap gap-3 mt-14'>

            <button
              onClick={() =>
                setCurrentPage(prev => Math.max(prev - 1, 1))
              }
              className='
              px-5 py-2.5
              rounded-2xl
              bg-white/[0.05]
              border border-white/10
              text-blue-100
              hover:bg-cyan-500
              hover:text-white
              transition
            '
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (

              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`
                  px-5 py-2.5 rounded-2xl transition
                  ${currentPage === i + 1
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/[0.05] border border-white/10 text-blue-100 hover:bg-cyan-500 hover:text-white'
                  }
                `}
              >
                {i + 1}
              </button>

            ))}

            <button
              onClick={() =>
                setCurrentPage(prev =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className='
              px-5 py-2.5
              rounded-2xl
              bg-white/[0.05]
              border border-white/10
              text-blue-100
              hover:bg-cyan-500
              hover:text-white
              transition
            '
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
)
}

export default Collection

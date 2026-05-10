import React, { useEffect, useState } from 'react'
import axios from "axios"
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify'
import { Trash2, Package2, Sparkles } from 'lucide-react'

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list');

      if (response.data.success) {
        setList(response.data.products.reverse())
      }
      else {
        toast.error(response.data.message)
      }

    }
    catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  const removeProduct = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }
      else {
        toast.error(response.data.message)
      }

    }
    catch (err) {
      console.log(err)
      toast.error(err.message)

    }

  }

  useEffect(() => {
    fetchList()
  }, [])

  return (

   <div className='w-full text-white'>

      {/* HEADER */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>

        <div>
          <h1 className='text-3xl font-bold flex items-center gap-3'>
            <Package2 className='text-cyan-400' />
            Product Collection
          </h1>

          <p className='text-blue-200 mt-2 text-sm'>
            Manage your mandala gallery and artistic inventory ✨
          </p>
        </div>

        {/* STATS */}
        <div className='bg-white/10 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl shadow-lg shadow-cyan-500/10'>

          <div className='flex items-center gap-3'>
            <Sparkles className='text-cyan-300' size={20} />

            <div>
              <p className='text-sm text-blue-200'>
                Total Products
              </p>

              <h2 className='text-2xl font-bold'>
                {list.length}
              </h2>
            </div>
          </div>

        </div>

      </div>

      {/* TABLE HEADER */}
      <div className='hidden md:grid grid-cols-[100px_2fr_1fr_1fr_120px] 
      bg-white/10 border border-white/10 
      rounded-t-2xl px-6 py-4 text-sm font-semibold text-cyan-200 backdrop-blur-xl'>

        <p>Artwork</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className='text-center'>Action</p>

      </div>

      {/* PRODUCT LIST */}
      <div className='space-y-4 md:space-y-0'>

        {
          list.map((item, index) => (

            <div
              key={index}
              className='group grid md:grid-cols-[100px_2fr_1fr_1fr_120px] 
              items-center gap-4 
              bg-white/5 border border-white/10 
              md:border-t-0
              rounded-2xl md:rounded-none
              md:last:rounded-b-2xl
              p-4 md:px-6 md:py-4
              backdrop-blur-xl
              hover:bg-white/10
              hover:border-cyan-400/40
              transition-all duration-300'
            >

              {/* IMAGE */}
              <div className='relative overflow-hidden rounded-xl'>

                <img
                  className='w-20 h-20 object-cover rounded-xl 
                  group-hover:scale-110 transition duration-500'
                  src={item.images[0]}
                  alt=""
                />

                <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>

              </div>

              {/* NAME */}
              <div>

                <p className='font-semibold text-white text-lg'>
                  {item.name}
                </p>

                <p className='text-xs text-blue-200 mt-1 line-clamp-2'>
                  {item.description}
                </p>

              </div>

              {/* CATEGORY */}
              <div>
                <span className='px-3 py-1 rounded-full text-xs 
                bg-cyan-500/20 text-cyan-200 border border-cyan-400/20'>

                  {item.category}

                </span>
              </div>

              {/* PRICE */}
              <div>

                <p className='text-lg font-bold text-green-300'>
                  {currency}{item.price}
                </p>

              </div>

              {/* DELETE */}
              <div className='flex justify-center'>

                <button
                  onClick={() => removeProduct(item._id)}
                  className='group/delete flex items-center gap-2 
                  bg-red-500/15 hover:bg-red-500 
                  border border-red-400/20
                  px-4 py-2 rounded-xl
                  text-red-300 hover:text-white
                  transition-all duration-300'
                >

                  <Trash2
                    size={18}
                    className='group-hover/delete:rotate-12 transition'
                  />

                  Delete

                </button>

              </div>

            </div>

          ))
        }

      </div>

      {/* EMPTY STATE */}
      {
        list.length === 0 && (

          <div className='mt-20 flex flex-col items-center justify-center text-center'>

            <div className='w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-5'>

              <Package2 size={42} className='text-cyan-300' />

            </div>

            <h2 className='text-2xl font-semibold'>
              No Products Yet
            </h2>

            <p className='text-blue-200 mt-2'>
              Your mandala universe is waiting for its first star 🌌
            </p>

          </div>

        )
      }

    </div>
  )
}

export default List
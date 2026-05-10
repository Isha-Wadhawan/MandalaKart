import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios'
const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])

  useEffect(() => {
    // Only fetch if token actually exists and is not an empty string
    if (token) {
        loadOrderData();
    }
}, [token]); // This triggers once the token is finally available

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.get(backendUrl + '/api/order/userorders', { headers: { token: token } })

      if (response.data.success) {
        

        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date

            allOrdersItem.push(item)

          })
        })

        setorderData(allOrdersItem.reverse());

      }

    }
    catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token])

return (
  <div className='relative w-full min-h-screen overflow-hidden bg-[#050816]'>

    {/* BACKGROUND GLOWS */}
    <div className='absolute top-0 left-0 w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full'></div>

    <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full'></div>

    <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14'>

      {/* HEADER */}
      <div className='text-center mb-14'>

        <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full
        bg-blue-500/10 border border-blue-400/20
        text-blue-200 text-xs tracking-[0.25em] mb-5'>

          ✦ ORDER HISTORY ✦

        </div>

        <h1 className='text-4xl sm:text-5xl font-semibold text-white'>
          Your Mandala Journey
        </h1>

        <p className='mt-4 text-blue-200 max-w-2xl mx-auto'>
          Every artwork carries its own story. Track where your creations are now ✨
        </p>

      </div>

      {/* EMPTY STATE */}
      {orderData.length === 0 && (

        <div
          className='rounded-[2rem]
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          py-20 px-8 text-center'
        >

          <div className='text-6xl mb-5'>
            🫧
          </div>

          <h2 className='text-2xl text-white font-medium'>
            No Orders Yet
          </h2>

          <p className='mt-3 text-blue-200'>
            Your collection is waiting to begin.
          </p>

          <button
            onClick={() => navigate('/collection')}
            className='mt-7 px-7 py-3 rounded-2xl
            bg-gradient-to-r from-blue-500 to-indigo-600
            text-white
            hover:scale-105
            transition duration-300'
          >

            Explore Collection

          </button>

        </div>

      )}

      {/* ORDERS */}
      <div className='grid gap-7'>

        {orderData.map((item, index) => (

          <div
            key={index}
            className='group relative overflow-hidden
            rounded-[2rem]
            bg-white/5 backdrop-blur-2xl
            border border-white/10
            hover:border-blue-400/40
            transition duration-500
            shadow-2xl shadow-blue-900/10'
          >

            {/* GLOW */}
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700
            bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_45%)]'></div>

            <div className='relative p-6 sm:p-7'>

              <div className='flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between'>

                {/* LEFT */}
                <div className='flex flex-col sm:flex-row gap-6'>

                  {/* IMAGE */}
                  <div
                    className='w-full sm:w-32 h-32 overflow-hidden rounded-2xl
                    border border-white/10
                    bg-black/20'
                  >

                    <img
                      src={
                        Array.isArray(item.image)
                          ? item.image[0]
                          : Array.isArray(item.images)
                            ? item.images[0]
                            : (item.image || item.images)
                      }
                      alt=""
                      className='w-full h-full object-cover
                      transition duration-700 group-hover:scale-110'
                    />

                  </div>

                  {/* DETAILS */}
                  <div className='flex flex-col justify-center'>

                    {/* NAME */}
                    <h2 className='text-2xl font-semibold text-white'>
                      {item.name}
                    </h2>

                    {/* META */}
                    <div className='flex flex-wrap gap-3 mt-4'>

                      <span className='px-4 py-2 rounded-full
                      bg-white/5 border border-white/10
                      text-blue-100 text-sm'>

                        Qty: {item.quantity}

                      </span>

                      <span className='px-4 py-2 rounded-full
                      bg-white/5 border border-white/10
                      text-blue-100 text-sm'>

                        Size: {item.size}

                      </span>

                      <span className='px-4 py-2 rounded-full
                      bg-blue-500/10 border border-blue-400/20
                      text-blue-200 text-sm'>

                        ₹{item.price}

                      </span>

                    </div>

                    {/* DATE */}
                    <p className='mt-5 text-blue-300 text-sm'>
                      Ordered on {new Date(item.date).toDateString()}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}
                <div className='flex flex-col items-start lg:items-end gap-5'>

                  {/* STATUS */}
                  <div
                    className={`
                    px-5 py-3 rounded-2xl
                    border text-sm flex items-center gap-3
                    ${item.status === 'Delivered'
                        ? 'bg-emerald-500/10 border-emerald-400/20 text-emerald-300'
                        : 'bg-blue-500/10 border-blue-400/20 text-blue-200'}
                    `}
                  >

                    <span className={`
                    w-2.5 h-2.5 rounded-full
                    ${item.status === 'Delivered'
                        ? 'bg-emerald-400'
                        : 'bg-blue-400 animate-pulse'}
                    `}></span>

                    {item.status}

                  </div>

                  {/* PAYMENT */}
                  <div className='text-sm text-right'>

                    <p className='text-blue-300'>
                      Payment Method
                    </p>

                    <p className='text-white mt-1'>
                      {item.paymentMethod || "Online Payment"}
                    </p>

                    <p className={`mt-2 text-sm
                    ${item.payment
                        ? 'text-emerald-300'
                        : 'text-yellow-300'}
                    `}>

                      {item.payment ? '✔ Paid Successfully' : 'Pending Payment'}

                    </p>

                  </div>

                  {/* REFRESH BUTTON */}
                  <button
                    onClick={loadOrderData}
                    className='px-5 py-3 rounded-2xl
                    bg-gradient-to-r from-blue-500 to-indigo-600
                    text-white text-sm
                    transition duration-300
                    hover:scale-105
                    hover:shadow-xl hover:shadow-blue-500/30
                    active:scale-[0.98]'
                  >

                    Refresh Status ✦

                  </button>

                </div>

              </div>

            </div>

            {/* BOTTOM LIGHT LINE */}
            <div className='h-[2px] w-0 group-hover:w-full
            bg-gradient-to-r from-blue-400 via-indigo-400 to-transparent
            transition-all duration-700'></div>

          </div>

        ))}

      </div>

    </div>

  </div>
)
}

export default Orders

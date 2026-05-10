import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) return null;

    try {

      const response = await axios.get(
        backendUrl + '/api/order/list',
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders([...response.data.orders])
      }
      else {
        toast.error(response.data.message)
      }

    } catch (err) {
      toast.error(err.message)
    }
  }

  const statusHandler = async (e, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: e.target.value
        },
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        await fetchAllOrders();
      }

    } catch (err) {
      console.log(err);
      toast.error("Failed to update status")
    }
  }

  const paymentHandler = async (e, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          payment: e.target.value === "Paid"
        },
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        await fetchAllOrders();
      }

    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (

   <div className='w-full text-white'>
      {/* HEADER */}
      <div className='mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

        <div>

          <h1 className='text-4xl font-bold tracking-tight'>
            Orders Dashboard
          </h1>

          <p className='text-slate-400 mt-2'>
            Manage all mandala creations and shipments ✨
          </p>

        </div>

        <div className='flex gap-4'>

          <div className='bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl'>
            <p className='text-xs text-slate-400'>Total Orders</p>
            <h2 className='text-2xl font-bold'>{orders.length}</h2>
          </div>

        </div>

      </div>

      {/* ORDERS */}
      <div className='flex flex-col gap-6'>

        {orders.map((order, index) => (

          <div
            key={index}
            className='bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl hover:border-indigo-400/40 transition duration-300'
          >

            {/* TOP BAR */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6'>

              <div>

                <p className='text-xs uppercase tracking-widest text-slate-400'>
                  Order #{index + 1}
                </p>

                <h2 className='text-xl font-semibold mt-1'>
                  {order.address?.firstName} {order.address?.lastName}
                </h2>

                <p className='text-sm text-slate-400 mt-1'>
                  {new Date(order.date).toLocaleDateString()}
                </p>

              </div>

              <div className='flex flex-wrap gap-3'>

                {/* PAYMENT */}
                <div
  className={`px-4 py-2 rounded-xl text-sm font-semibold border
  flex items-center gap-2
  ${order.payment
      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30'
      : 'bg-amber-500/10 text-amber-300 border-amber-400/30'
    }`}
>

  <span
    className={`w-2 h-2 rounded-full
    ${order.payment
        ? 'bg-emerald-400'
        : 'bg-amber-400 animate-pulse'
      }`}
  ></span>

  {order.payment ? 'Payment Completed' : 'Payment Pending'}

</div>

                {/* STATUS */}
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className='px-4 py-2 rounded-xl border border-indigo-400/20 bg-slate-900/70 text-white outline-none'
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

              </div>

            </div>

            {/* ITEMS */}
            <div className='grid gap-4'>

              {order.items.map((item, i) => {

                const cleanQuantity =
                  typeof item.quantity === 'object'
                    ? Object.values(item.quantity)[0]
                    : item.quantity;

                return (

                  <div
                    key={i}
                    className={`rounded-2xl border p-4
                    ${item.custom
                        ? 'bg-purple-500/10 border-purple-400/20'
                        : 'bg-white/5 border-white/10'
                      }`}
                  >

                    <div className='flex flex-col md:flex-row gap-5'>

                      {/* IMAGE */}
                      <div className='relative'>

                        <img
                          src={
                            Array.isArray(item.image)
                              ? item.image[0]
                              : item.image
                          }
                          alt={item.name}
                          className='w-32 h-32 object-cover rounded-2xl border border-white/10 shadow-xl'
                        />

                        {item.custom && (
                          <div className='absolute top-2 left-2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full font-bold tracking-wide'>
                            CUSTOM
                          </div>
                        )}

                      </div>

                      {/* DETAILS */}
                      <div className='flex-1'>

                        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>

                          <div>

                            <h3 className='text-lg font-semibold'>
                              {item.name}
                            </h3>

                            <div className='flex flex-wrap gap-3 mt-3'>

                              <span className='bg-white/5 px-3 py-1 rounded-full text-sm text-slate-300'>
                                Qty: {cleanQuantity}
                              </span>

                              <span className='bg-white/5 px-3 py-1 rounded-full text-sm text-slate-300'>
                                Size: {item.size}
                              </span>

                              <span className='bg-white/5 px-3 py-1 rounded-full text-sm text-slate-300'>
                                {currency}{item.price}
                              </span>

                            </div>

                          </div>

                          {/* DOWNLOAD */}
                          {item.custom && (

                            <a
                              href={
                                Array.isArray(item.image)
                                  ? item.image[0]
                                  : item.image
                              }
                              download={`mandala-${order._id}.jpg`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className='px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition duration-300 text-sm font-medium shadow-lg'
                            >
                              Download Artwork
                            </a>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                )
              })}

            </div>

            {/* FOOTER */}
            <div className='mt-6 pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5'>

              {/* ADDRESS */}
              <div>

                <p className='text-sm text-slate-400 mb-1'>
                  Shipping Address
                </p>

                <p className='text-sm'>
                  {order.address?.street}, {order.address?.city}
                </p>

                <p className='text-sm'>
                  {order.address?.state}, {order.address?.zipcode}
                </p>

                <p className='text-sm mt-1 text-slate-300'>
                  📞 {order.address?.phone}
                </p>

              </div>

              {/* TOTAL */}
              <div className='text-right'>

                <p className='text-sm text-slate-400'>
                  Order Total
                </p>

                <h2 className='text-3xl font-bold text-indigo-300 mt-1'>
                  {currency}{order.amount}
                </h2>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Orders
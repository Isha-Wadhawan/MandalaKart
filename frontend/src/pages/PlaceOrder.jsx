import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios"


const PlaceOrder = () => {


  const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, user } = useContext(ShopContext);


  //   let storedUser = null;

  // try {
  //   const rawUser = localStorage.getItem("user");
  //   if (rawUser && rawUser !== "undefined") {
  //     storedUser = JSON.parse(rawUser);
  //   }
  // } catch (err) {
  //   console.error("Corrupted user in localStorage");
  //   localStorage.removeItem("user");
  // }

  // const currentUser = user || storedUser;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }))
  };

  // calculate final amount
  const amount = getCartAmount() + delivery_fee;

  // create dynamic UPI link 
  // detect mobile
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);


  const initPay = (order, orderItems) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Mandala by Jigyasa',
      description: 'Order Payment',
      order_id: order.id,

      handler: async (response) => {
          console.log("HANDLER STARTED", response);

        try {
            console.log("SENDING DATA:", {
      ...response,
      userId: user?._id,
      items: orderItems,
      address: formData,
      amount
    });
           const { data } = await axios.post(
    backendUrl + '/api/order/verifyRazorpay',
    {
    ...response,
    userId: user?._id,
    items: orderItems,
    address: formData,
    amount
  },
    { headers: { token } }
  );
    console.log("BACKEND RESPONSE:", data);
   
          if (data.success) {
            setCartItems({});
            navigate('/orders');
            toast.success("Payment Successful!");
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: { color: "#3399cc" }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      // 1. Convert cartItems object into an array of products (matching your existing logic)
      for (const itemsId in cartItems) {
        for (const size in cartItems[itemsId]) {
          if (cartItems[itemsId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemsId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemsId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const response = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });

      if (response.data.success) {
        initPay(response.data.order, orderItems);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create order");
    }
  }



  return (
  <form 
  onSubmit={onSubmitHandler} 
  className='w-full min-h-screen bg-[#050816] text-blue-100 overflow-hidden relative'
>

  {/* BACKGROUND GLOWS */}
  <div className='absolute top-0 left-0 w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full'></div>

  <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full'></div>

  <div className='relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14'>

    {/* HEADER */}
    <div className='text-center mb-14'>

      <h1 className='text-4xl sm:text-5xl font-semibold text-white'>
        Secure Checkout
      </h1>

      <p className='mt-4 text-blue-200 max-w-2xl mx-auto'>
        Your handcrafted mandala is almost ready to begin its journey ✦
      </p>

    </div>

    <div className='grid lg:grid-cols-[1.3fr_0.7fr] gap-10'>

      {/* ---------- LEFT ---------- */}
      <div
        className='rounded-[2rem] overflow-hidden
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        shadow-2xl shadow-blue-900/20'
      >

        {/* TOP */}
        <div className='p-7 border-b border-white/10'>

          <Title text1={'DELIVERY'} text2={'DETAILS'} />

          <p className='mt-3 text-blue-200 text-sm'>
            Enter your shipping information carefully.
          </p>

        </div>

        {/* FORM */}
      {/* FORM */}
<div className='p-6 sm:p-8 flex flex-col gap-6'>

  {/* NAME */}
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

    <div className='relative group'>
      <input
        required
        onChange={onChangeHandler}
        name='firstName'
        value={formData.firstName}
        placeholder=' '
        className='checkout-input peer'
      />
      <label className='floating-label'>
        First Name
      </label>
    </div>

    <div className='relative group'>
      <input
        required
        onChange={onChangeHandler}
        name='lastName'
        value={formData.lastName}
        placeholder=' '
        className='checkout-input peer'
      />
      <label className='floating-label'>
        Last Name
      </label>
    </div>

  </div>

  {/* EMAIL */}
  <div className='relative group'>
    <input
      required
      onChange={onChangeHandler}
      name='email'
      value={formData.email}
      type='email'
      placeholder=' '
      className='checkout-input peer'
    />
    <label className='floating-label'>
      Email Address
    </label>
  </div>

  {/* STREET */}
  <div className='relative group'>
    <input
      required
      onChange={onChangeHandler}
      name='street'
      value={formData.street}
      placeholder=' '
      className='checkout-input peer'
    />
    <label className='floating-label'>
      Street Address
    </label>
  </div>

  {/* CITY + STATE */}
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

    <div className='relative group'>
      <input
        required
        onChange={onChangeHandler}
        name='city'
        value={formData.city}
        placeholder=' '
        className='checkout-input peer'
      />
      <label className='floating-label'>
        City
      </label>
    </div>

    <div className='relative group'>
      <input
        required
        onChange={onChangeHandler}
        name='state'
        value={formData.state}
        placeholder=' '
        className='checkout-input peer'
      />
      <label className='floating-label'>
        State
      </label>
    </div>

  </div>

  {/* ZIP + COUNTRY */}
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

    <div className='relative group'>
      <input
        required
        onChange={onChangeHandler}
        name='zipcode'
        value={formData.zipcode}
        type='number'
        placeholder=' '
        className='checkout-input peer'
      />
      <label className='floating-label'>
        Zip Code
      </label>
    </div>

    <div className='relative group'>
      <input
        required
        onChange={onChangeHandler}
        name='country'
        value={formData.country}
        placeholder=' '
        className='checkout-input peer'
      />
      <label className='floating-label'>
        Country
      </label>
    </div>

  </div>

  {/* PHONE */}
  <div className='relative group'>
    <input
      required
      onChange={onChangeHandler}
      name='phone'
      value={formData.phone}
      type='number'
      placeholder=' '
      className='checkout-input peer'
    />
    <label className='floating-label'>
      Phone Number
    </label>
  </div>

</div>

      </div>

      {/* ---------- RIGHT ---------- */}
      <div className='flex flex-col gap-8'>

        {/* CART TOTAL */}
        <div
          className='rounded-[2rem]
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          p-7
          shadow-2xl shadow-blue-900/20'
        >

          <CartTotal />

        </div>

        {/* PAYMENT */}
        <div
          className='rounded-[2rem]
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          p-7
          shadow-2xl shadow-blue-900/20'
        >

          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* CARD */}
          <div
            className='mt-7 rounded-2xl overflow-hidden
            border border-white/10
            bg-gradient-to-br from-blue-500/10 to-indigo-500/10'
          >

            {/* TOP */}
            <div className='p-6 border-b border-white/10'>

              <div className='flex items-center justify-between'>

                <div>

                  <p className='text-sm uppercase tracking-[0.25em] text-blue-300'>
                    Razorpay
                  </p>

                  <h3 className='text-2xl font-semibold text-white mt-2'>
                    Secure Payment Gateway
                  </h3>

                </div>

                <div className='w-14 h-14 rounded-2xl
                bg-blue-500/15 border border-blue-400/20
                flex items-center justify-center text-2xl'>

                  💳

                </div>

              </div>

            </div>

            {/* TOTAL */}
            <div className='p-6 text-center'>

              <p className='text-blue-200 text-sm uppercase tracking-[0.2em]'>
                Total Amount
              </p>

              <h2 className='text-4xl font-bold text-white mt-3'>
                ₹{amount}
              </h2>

              <p className='mt-3 text-blue-200 text-sm'>
                Includes shipping & secure processing
              </p>

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`
            mt-8 w-full py-4 rounded-2xl
            bg-gradient-to-r from-blue-500 to-indigo-600
            text-white font-medium tracking-wide
            transition duration-300
            hover:scale-[1.02]
            hover:shadow-2xl hover:shadow-blue-500/30
            active:scale-[0.98]
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >

            {loading ? "Processing..." : "Pay Securely ✦"}

          </button>

        </div>

      </div>

    </div>

  </div>

</form>
  )
}

export default PlaceOrder

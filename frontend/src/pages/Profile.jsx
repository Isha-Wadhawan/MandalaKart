import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'; // Adjust path based on your folder structure

const Profile = () => {

const { user, token, navigate } = useContext(ShopContext);
useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!user) {
    return <div className="text-center p-20">Loading profile...</div>;
  }

return (
  <div className="relative w-full min-h-screen overflow-hidden bg-[#050816]">

    {/* BACKGROUND GLOWS */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full"></div>

    <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-14">

      {/* PROFILE HERO */}
      <div
        className="relative overflow-hidden rounded-[2rem]
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        shadow-2xl shadow-blue-900/20
        p-8 sm:p-10"
      >

        {/* glow */}
        <div className="absolute inset-0 opacity-60
        bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)]"></div>

        <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10">

          {/* LEFT */}
          <div className="flex flex-col items-center lg:items-start">

            {/* AVATAR */}
            <div
              className="relative w-32 h-32 rounded-full
              bg-gradient-to-br from-blue-500 to-indigo-600
              flex items-center justify-center
              shadow-2xl shadow-blue-500/30"
            >

              {/* outer ring */}
              <div className="absolute inset-0 rounded-full border border-white/20"></div>

              <span className="text-5xl font-semibold text-white">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>

            </div>

            {/* badge */}
            <div
              className="mt-5 px-4 py-2 rounded-full
              bg-emerald-400/10 border border-emerald-400/20
              text-emerald-300 text-xs tracking-[0.2em]"
            >

              ✦ VERIFIED COLLECTOR ✦

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex-1 text-center lg:text-left">

            <p className="text-blue-300 uppercase tracking-[0.25em] text-sm">
              Profile Overview
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-white">
              {user.name}
            </h1>

            <p className="mt-4 text-blue-200 text-lg">
              {user.email}
            </p>

            <p className="mt-6 text-blue-100/70 leading-relaxed max-w-2xl">
              Welcome back to your mandala sanctuary. Explore handcrafted artwork,
              track your cosmic creations, and continue building your peaceful collection.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">

              <div
                className="rounded-2xl
                bg-white/5 border border-white/10
                p-5"
              >

                <p className="text-2xl font-semibold text-white">
                  ✨
                </p>

                <p className="mt-2 text-sm text-blue-200">
                  Art Collector
                </p>

              </div>

              <div
                className="rounded-2xl
                bg-white/5 border border-white/10
                p-5"
              >

                <p className="text-2xl font-semibold text-white">
                  🎨
                </p>

                <p className="mt-2 text-sm text-blue-200">
                  Mandala Lover
                </p>

              </div>

              <div
                className="rounded-2xl
                bg-white/5 border border-white/10
                p-5 col-span-2 sm:col-span-1"
              >

                <p className="text-2xl font-semibold text-white">
                  🌌
                </p>

                <p className="mt-2 text-sm text-blue-200">
                  Peaceful Vibes
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ACTION CARDS */}
      <div className="grid md:grid-cols-2 gap-7 mt-12">

        {/* ORDERS */}
        <div
          onClick={() => navigate('/orders')}
          className="group relative overflow-hidden cursor-pointer
          rounded-[2rem]
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          p-7
          hover:border-blue-400/40
          transition duration-500
          hover:-translate-y-2
          shadow-xl shadow-blue-900/10"
        >

          {/* glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_50%)]"></div>

          <div className="relative">

            <div className="flex items-center justify-between">

              <div
                className="w-16 h-16 rounded-2xl
                bg-blue-500/10 border border-blue-400/20
                flex items-center justify-center"
              >

                <img
                  className="w-8 opacity-90"
                  src={assets.parcel_icon}
                  alt=""
                />

              </div>

              <span className="text-3xl text-blue-300 group-hover:translate-x-1 transition">
                →
              </span>

            </div>

            <h2 className="mt-7 text-2xl font-semibold text-white">
              My Orders
            </h2>

            <p className="mt-3 text-blue-200 leading-relaxed">
              Track shipments, payment status, and your handcrafted mandala journey.
            </p>

          </div>

          <div className="h-[2px] w-0 group-hover:w-full
          bg-gradient-to-r from-blue-400 to-transparent
          transition-all duration-700 mt-7"></div>

        </div>

        {/* COLLECTION */}
        <div
          onClick={() => navigate('/collection')}
          className="group relative overflow-hidden cursor-pointer
          rounded-[2rem]
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          p-7
          hover:border-purple-400/40
          transition duration-500
          hover:-translate-y-2
          shadow-xl shadow-purple-900/10"
        >

          {/* glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700
          bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_50%)]"></div>

          <div className="relative">

            <div className="flex items-center justify-between">

              <div
                className="w-16 h-16 rounded-2xl
                bg-purple-500/10 border border-purple-400/20
                flex items-center justify-center"
              >

                <img
                  className="w-8 opacity-90"
                  src={assets.menu_icon}
                  alt=""
                />

              </div>

              <span className="text-3xl text-purple-300 group-hover:translate-x-1 transition">
                →
              </span>

            </div>

            <h2 className="mt-7 text-2xl font-semibold text-white">
              Browse Collection
            </h2>

            <p className="mt-3 text-blue-200 leading-relaxed">
              Explore calming artwork, layered symmetry, and modern mandala creations.
            </p>

          </div>

          <div className="h-[2px] w-0 group-hover:w-full
          bg-gradient-to-r from-purple-400 to-transparent
          transition-all duration-700 mt-7"></div>

        </div>

      </div>

      {/* LOGOUT */}
      <div className="flex justify-center mt-16">

        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="group px-7 py-4 rounded-2xl
          bg-red-500/10 border border-red-400/20
          text-red-300
          hover:bg-red-500 hover:text-white
          transition duration-300
          hover:shadow-xl hover:shadow-red-500/20"
        >

          Logout From Account

        </button>

      </div>

    </div>

  </div>
)
};

export default Profile;
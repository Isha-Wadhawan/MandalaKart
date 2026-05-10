import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'

import Add from "./pages/Add"
import Orders from "./pages/Orders"
import List from "./pages/List"
import Login from './components/Login'

import { ToastContainer } from 'react-toastify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(
    localStorage.getItem('token')
      ? localStorage.getItem('token')
      : ''
  )

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (

    <div className='bg-[#020617] min-h-screen text-white overflow-x-hidden'>

      <ToastContainer />

      {token === "" ? (

        <Login setToken={setToken} />

      ) : (

        <>

          {/* NAVBAR */}
          <Navbar setToken={setToken} />

          {/* MAIN LAYOUT */}
          {/* MAIN LAYOUT */}
<div className='flex pt-24'>

  {/* SIDEBAR */}
  <Sidebar />

  {/* PAGE CONTENT */}
  <main
    className='
    flex-1
    ml-[280px]
    px-6 sm:px-10 lg:px-14
    py-8
    '
  >

    <div
      className='
      w-full
      max-w-[1400px]
      mx-auto
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6 sm:p-8 lg:p-10
      shadow-2xl shadow-black/20
      min-h-[calc(100vh-140px)]
      '
    >

      <Routes>
        <Route path="/add" element={<Add token={token} />} />
        <Route path="/list" element={<List token={token} />} />
        <Route path="/" element={<List token={token} />} />
        <Route path="/orders" element={<Orders token={token} />} />
      </Routes>

    </div>

  </main>

</div>

        </>

      )}

    </div>
  )
}

export default App
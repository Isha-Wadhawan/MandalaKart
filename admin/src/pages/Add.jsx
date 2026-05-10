
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Illustration")
  const [subCategory, setSubCategory] = useState("a")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestseller ? "true" : "false")
      formData.append("sizes", JSON.stringify(sizes))
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message);
        setName('')
        setDescription('')
        setCategory('Illustration')
        setSubCategory('a')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (

   <div className='w-full text-white'>

      {/* HEADER */}
      <div className='mb-10'>

        <h1 className='text-3xl sm:text-4xl font-bold tracking-wide'>
          Add New Artwork
        </h1>

        <p className='text-blue-300 mt-2 text-sm sm:text-base'>
          Upload handcrafted mandala pieces into your gallery ✨
        </p>

      </div>

      {/* MAIN CARD */}
      <form
        onSubmit={onSubmitHandler}
        className='max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl'
      >

        {/* IMAGE SECTION */}
        <div>

          <p className='text-lg font-semibold mb-5 text-blue-100'>
            Upload Artwork Images
          </p>

          <div className='flex flex-wrap gap-5'>

            {[image1, image2, image3, image4].map((img, i) => (

              <label
                key={i}
                htmlFor={`image${i + 1}`}
                className='group cursor-pointer'
              >

                <div className='w-28 h-28 rounded-2xl overflow-hidden border border-dashed border-blue-400/40 bg-black/20 hover:border-blue-400 transition duration-300 relative'>

                  <img
                    className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
                    src={!img ? assets.upload_area : URL.createObjectURL(img)}
                    alt=""
                  />

                  <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-medium'>
                    Upload
                  </div>

                </div>

                <input
                  hidden
                  type="file"
                  id={`image${i + 1}`}
                  onChange={(e) => {
                    if (i === 0) setImage1(e.target.files[0])
                    if (i === 1) setImage2(e.target.files[0])
                    if (i === 2) setImage3(e.target.files[0])
                    if (i === 3) setImage4(e.target.files[0])
                  }}
                />

              </label>

            ))}

          </div>

        </div>

        {/* PRODUCT NAME */}
        <div className='mt-10'>

          <p className='mb-3 text-blue-100 font-medium'>
            Product Name
          </p>

          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Ex: Sacred Lotus Mandala'
            className='w-full rounded-2xl bg-black/20 border border-white/10 px-5 py-4 outline-none focus:border-blue-400 transition'
          />

        </div>

        {/* DESCRIPTION */}
        <div className='mt-8'>

          <p className='mb-3 text-blue-100 font-medium'>
            Product Description
          </p>

          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Describe the inspiration, detailing, and artistic feel...'
            rows={5}
            className='w-full rounded-2xl bg-black/20 border border-white/10 px-5 py-4 outline-none focus:border-blue-400 transition resize-none'
          />

        </div>

        {/* GRID */}
        <div className='grid md:grid-cols-3 gap-6 mt-10'>

          {/* CATEGORY */}
          <div>

            <p className='mb-3 text-blue-100 font-medium'>
              Category
            </p>

            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className='w-full px-4 py-3 rounded-xl 
  bg-slate-900 text-white 
  border border-slate-700 
  outline-none 
  focus:border-cyan-400 
  focus:ring-2 focus:ring-cyan-400/30
  transition-all duration-300'
            >
              <option className='bg-slate-900 text-white'   value="Illustration">Illustration</option>
              <option className='bg-slate-900 text-white' value="Colorful">Colorful</option>
              <option className='bg-slate-900 text-white' value="Black & White">Black & White</option>
            </select>

          </div>

          {/* PRICE */}
          <div>

            <p className='mb-3 text-blue-100 font-medium'>
              Price
            </p>

            <input
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='250'
              className='w-full rounded-2xl bg-black/20 border border-white/10 px-5 py-4 outline-none focus:border-blue-400 transition'
            />

          </div>

          {/* SIZE */}
          <div>

            <p className='mb-3 text-blue-100 font-medium'>
              Sizes
            </p>

            <div className='flex gap-3 flex-wrap'>

              {["A2", "A3", "A4"].map(size => (

                <button
                  type='button'
                  key={size}
                  onClick={() =>
                    setSizes(prev =>
                      prev.includes(size)
                        ? prev.filter(item => item !== size)
                        : [...prev, size]
                    )
                  }
                  className={`
              px-5 py-2 rounded-xl border transition duration-300

              ${sizes.includes(size)
                      ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-black/20 border-white/10 hover:border-blue-400'
                    }
              `}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* BESTSELLER */}
        <div className='mt-10 flex items-center gap-4'>

          <label className='relative inline-flex items-center cursor-pointer'>

            <input
              type="checkbox"
              checked={bestseller}
              onChange={() => setBestseller(prev => !prev)}
              className='sr-only peer'
            />

            <div className='w-14 h-8 bg-gray-700 rounded-full peer peer-checked:bg-blue-500 transition'></div>

            <div className='absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-6'></div>

          </label>

          <p className='text-blue-100'>
            Add to Bestseller Collection
          </p>

        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          type='submit'
          className='mt-12 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 transition duration-300 font-semibold text-white flex items-center gap-3'
        >

          {loading && (
            <span className="loader"></span>
          )}

          {loading ? "Uploading Artwork..." : "Publish Artwork"}

        </button>

        {/* LOADER */}
        <style>{`
      .loader {
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>

      </form>

    </div>

  )
}

export default Add

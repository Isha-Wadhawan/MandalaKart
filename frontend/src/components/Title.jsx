// import React from 'react'

// const Title = ({text1,text2}) => {
//   return (
//     <div className='inline-flex gap-2 items-center mb-3'>
//       <p className='text-gray-500'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
//       <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
//     </div>
//   )
// }

// export default Title
import React from 'react'

const Title = ({ text1, text2, variant = "dark" }) => {

  const isLight = variant === "light"

  return (
    <div className='group inline-flex flex-col items-center gap-2 mb-3'>

      {/* TEXT */}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-light tracking-wide
        ${isLight ? "text-gray-800" : "text-white"}`}>

        <span className={`${isLight ? "text-blue-600" : "text-blue-300"}`}>
          {text1}{' '}
        </span>

        <span className={`font-semibold bg-gradient-to-r 
        ${isLight 
          ? "from-gray-900 to-blue-600" 
          : "from-white to-blue-200"} 
        bg-clip-text text-transparent`}>
          {text2}
        </span>

      </h2>

      {/* UNDERLINE */}
      <div className={`relative h-[2px] w-16 overflow-hidden
        ${isLight ? "bg-blue-200" : "bg-blue-400/40"}`}>

        <span className={`absolute left-0 top-0 h-full w-0 
        ${isLight 
          ? "bg-gradient-to-r from-blue-600 to-blue-400" 
          : "bg-gradient-to-r from-blue-400 to-blue-200"} 
        transition-all duration-500 
        group-hover:w-full`}>
        </span>

      </div>

    </div>
  )
}

export default Title
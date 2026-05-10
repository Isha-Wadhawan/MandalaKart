import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { FiTruck } from 'react-icons/fi'
import { MdOutlineVerified } from 'react-icons/md'

const CartTotal = () => {

    const {
        currency,
        delivery_fee,
        getCartAmount
    } = useContext(ShopContext)

    const subtotal = getCartAmount()
    const total = subtotal === 0
        ? 0
        : subtotal + delivery_fee

    return (

        <div className='w-full'>

            {/* TITLE */}
            <div className='mb-6'>

            

                <Title text1={'CART'} text2={'TOTAL'} />

            </div>

            {/* CARD */}
            <div className='relative overflow-hidden rounded-[2rem]
            border border-white/10
            bg-white/5 backdrop-blur-2xl
            p-6'>

                {/* glow */}
                <div className='absolute inset-0 opacity-40
                bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]'></div>

                <div className='relative space-y-5'>

                    {/* SUBTOTAL */}
                    <div className='flex items-center justify-between'>

                        <div>
                            <p className='text-blue-200 text-sm'>
                                Subtotal
                            </p>

                            <p className='text-xs text-blue-200/50 mt-1'>
                                Artwork total before shipping
                            </p>
                        </div>

                        <p className='text-white font-medium'>
                            {currency}{subtotal}.00
                        </p>

                    </div>

                    {/* LINE */}
                    <div className='h-px bg-gradient-to-r from-transparent via-white/10 to-transparent'></div>

                    {/* SHIPPING */}
                    <div className='flex items-center justify-between'>

                        <div className='flex items-center gap-3'>

                            <div className='w-10 h-10 rounded-xl
                            bg-blue-500/10 border border-blue-400/20
                            flex items-center justify-center text-blue-300'>

                                <FiTruck />

                            </div>

                            <div>

                                <p className='text-blue-200 text-sm'>
                                    Shipping Charges
                                </p>

                                <p className='text-xs text-blue-200/50 mt-1'>
                                    Secure packaging & delivery
                                </p>

                            </div>

                        </div>

                        <p className='text-white font-medium'>
                            {currency}{delivery_fee}.00
                        </p>

                    </div>

                    {/* LINE */}
                    <div className='h-px bg-gradient-to-r from-transparent via-white/10 to-transparent'></div>

                    {/* TOTAL */}
                    <div className='flex items-center justify-between pt-2'>

                        <div className='flex items-center gap-3'>

                            <div className='w-10 h-10 rounded-xl
                            bg-emerald-400/10 border border-emerald-400/20
                            flex items-center justify-center text-emerald-300'>

                                <MdOutlineVerified />

                            </div>

                            <div>

                                <p className='text-white font-semibold text-lg'>
                                    Grand Total
                                </p>

                                <p className='text-xs text-blue-200/50 mt-1'>
                                    Including taxes & shipping
                                </p>

                            </div>

                        </div>

                        <div className='text-right'>

                            <p className='text-3xl font-bold text-white'>
                                {currency}{total}.00
                            </p>

                        </div>

                    </div>

                 

                </div>

            </div>

        </div>

    )
}

export default CartTotal
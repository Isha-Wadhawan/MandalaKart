import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {

        try {

            e.preventDefault();
            setLoading(true);

            const response = await axios.post(
                backendUrl + '/api/user/admin',
                { email, password }
            )

            if (response.data.success) {

                setToken(response.data.token)
                toast.success("Welcome back Admin ✨")

            }
            else {
                toast.error(response.data.message)
            }

        }
        catch (err) {

            console.log(err)
            toast.error(err.message)

        }
        finally {
            setLoading(false)
        }
    }

    return (

        <div className='min-h-screen w-full overflow-hidden relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4'>

            {/* GLOW EFFECTS */}
            <div className='absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-indigo-500/20 blur-3xl rounded-full'></div>

            <div className='absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full'></div>

            {/* CARD */}
            <div className='relative z-10 w-full max-w-md'>

                <div className='bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl'>

                    {/* TOP */}
                    <div className='text-center mb-8'>

                        <div className='w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-xl'>
                            🎨
                        </div>

                        <h1 className='mt-5 text-3xl font-bold text-white'>
                            Mandala Admin
                        </h1>

                        <p className='mt-2 text-slate-400 text-sm'>
                            Enter the creative control chamber
                        </p>

                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={onSubmitHandler}
                        className='flex flex-col gap-5'
                    >

                        {/* EMAIL */}
                        <div>

                            <label className='text-sm text-slate-300 mb-2 block'>
                                Email Address
                            </label>

                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type='email'
                                placeholder='admin@mandala.com'
                                required
                                className='w-full px-4 py-3 rounded-2xl
                                bg-white/5 border border-white/10
                                text-white placeholder:text-slate-500
                                outline-none focus:border-indigo-400
                                focus:ring-2 focus:ring-indigo-500/20
                                transition duration-300'
                            />

                        </div>

                        {/* PASSWORD */}
                        <div>

                            <label className='text-sm text-slate-300 mb-2 block'>
                                Password
                            </label>

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type='password'
                                placeholder='••••••••'
                                required
                                className='w-full px-4 py-3 rounded-2xl
                                bg-white/5 border border-white/10
                                text-white placeholder:text-slate-500
                                outline-none focus:border-purple-400
                                focus:ring-2 focus:ring-purple-500/20
                                transition duration-300'
                            />

                        </div>

                        {/* BUTTON */}
                        <button
                            type='submit'
                            disabled={loading}
                            className={`mt-3 w-full py-3 rounded-2xl
                            font-semibold text-white
                            bg-gradient-to-r from-indigo-500 to-purple-600
                            hover:scale-[1.02]
                            active:scale-[0.98]
                            transition duration-300
                            shadow-lg shadow-indigo-500/20
                            flex items-center justify-center gap-2
                            ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                        >

                            {loading ? (
                                <>
                                    <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                                    Logging In...
                                </>
                            ) : (
                                <>
                                    Enter Dashboard ✨
                                </>
                            )}

                        </button>

                    </form>

                    {/* FOOTER */}
                    <div className='mt-8 text-center'>

                        <p className='text-xs text-slate-500'>
                            Mandala By Jigyasa Admin Panel
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login
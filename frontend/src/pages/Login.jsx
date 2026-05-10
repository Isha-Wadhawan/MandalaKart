import React, { useState , useContext, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState,setCurrentState] = useState('Login');
const { token, setToken, userData, setUser, navigate, backendUrl } = useContext(ShopContext);
  

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      if(currentState === 'SignUp') {
    const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
    if (response.data.success) {
        // Save token and user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        setToken(response.data.token);
        setUser(response.data.userData); // <-- update context
        toast.success('Account created!');
        navigate('/');
    } else {
        toast.error(response.data.message);
    }
} else {
    const response = await axios.post(backendUrl + '/api/user/login', { email, password });
    if (response.data.success) {
        // Save token and user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        setToken(response.data.token);
        setUser(response.data.userData); // <-- update context
        toast.success('Logged in successfully!');
        navigate('/');
    } else {
        toast.error(response.data.message);
    }
}

  
  }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  useEffect(()=>{
    if(token)
    {
      navigate('/')
    }

  }, [token])

 return (
  <div className='w-full min-h-screen bg-blue-900 flex items-center justify-center px-4'>

    <form 
      onSubmit={onSubmitHandler} 
      className='w-full sm:max-w-md 
      bg-white/5 backdrop-blur-md 
      border border-white/10 
      rounded-xl p-6 sm:p-8 
      flex flex-col gap-4 
      text-blue-100 
      hover:border-blue-400 
      transition duration-300 
      shadow-lg shadow-blue-500/10'
    >

      {/* HEADER */}
      <div className='text-center mb-4'>
        <p className='text-3xl font-semibold text-white'>
          {currentState}
        </p>
        <div className='w-10 h-[2px] bg-blue-400 mx-auto mt-2'></div>
      </div>

      {/* NAME */}
      {currentState !== 'Login' && (
        <input
          onChange={(e)=> setName(e.target.value)}
          value={name}
          type='text'
          placeholder='Full Name'
          className='input-style'
          required
        />
      )}

      {/* EMAIL */}
      <input
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
        type='email'
        placeholder='Email Address'
        className='input-style'
        required
      />

      {/* PASSWORD */}
      <input
        onChange={(e)=> setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='Password'
        className='input-style'
        required
      />

      {/* LINKS */}
      <div className='flex justify-between text-xs sm:text-sm text-blue-200 mt-1'>
        <p className='cursor-pointer hover:text-white transition'>
          Forgot Password
        </p>

        {
          currentState === 'Login'
          ? (
            <p 
              onClick={()=>setCurrentState('SignUp')} 
              className='cursor-pointer hover:text-white transition'
            >
              Create Account
            </p>
          )
          : (
            <p 
              onClick={()=>setCurrentState('Login')} 
              className='cursor-pointer hover:text-white transition'
            >
              Login Instead
            </p>
          )
        }
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className='mt-4 w-full py-2.5 rounded-lg 
        bg-blue-500 hover:bg-blue-400 
        text-white text-sm font-medium 
        transition duration-300 
        hover:shadow-lg hover:shadow-blue-400/30 
        active:scale-[0.97]'
      >
        {currentState === 'Login' ? 'Sign In' : 'Create Account'}
      </button>

    </form>

  </div>
)
}

export default Login

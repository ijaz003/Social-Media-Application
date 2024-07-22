import React, { useEffect, useState } from 'react'
import Input from '../Input'
import PasswordInput from '../PasswordInput'
import Button from '../Button'
import {Link, json} from 'react-router-dom'
import authService from '../../BackEndServices/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/authSlice'

function SignIn() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch()

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await authService.signin({ email, password });
      if (resp.statusText==="OK") {
        // console.log(resp.data)
        const userData=resp.data.userData;
        localStorage.setItem("token",JSON.stringify({token:resp.data.token}))
        dispatch(login({ userData }))

        alert("Login Successfully");
        navigate("/home")
      }
    } catch (error) {
      console.error("Signin error:", error.error);
      alert(error.message || error.error)
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email Address" name="email" label="Email address"/>
          <PasswordInput onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your Password" name="password" label="Password"/>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
          </div>
          <Button type="submit" text="Sign In"/>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?
          <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign UP
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn

import React, { useState } from 'react'
import Input from '../Input'
import PasswordInput from '../PasswordInput'
import Button from '../Button'
import { Link } from 'react-router-dom'
import authService from '../../BackEndServices/auth'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, name, password);

    try {
      const resp = await authService.signup({ email, name, password });

      if (resp.statusText="OK") {
        alert(resp.data.message);
        // console.log(resp.data.message)
        navigate("/signin")
      } else {
        alert(resp.data.error)
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error)
    }
  };


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
          <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email Address" name="email" label="Email address" />
          <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your Name" name="name" label="Name" />
          <PasswordInput onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your Password" name="password" label="Password" />
          <Button type="submit" text="Sign Up" />
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have Account?
          <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp;
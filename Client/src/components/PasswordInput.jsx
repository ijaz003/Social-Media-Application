import React from 'react'
import { useId } from 'react';
import { useState } from 'react';

function PasswordInput({
  type = "text", placeholder = "", className = "", name = "password", label="", ...props 
},ref) {
  const id=useId();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
          <div className="flex items-center justify-between">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
              {label}
            </label>
            
          </div>
          <div className="mt-2 relative">
            <input
              id={id}
              name={name}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
              {...props}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
  )
}

export default React.forwardRef(PasswordInput)
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import authService from '../BackEndServices/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.forgotPasword(email);
      setMessage('Reset link sent to your email');
      setError('');
      // Optionally, navigate to another page
      // navigate('/somepage');
    } catch (error) {
      setError('Failed to send reset link');
      setMessage('');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
        {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            type="email" 
            placeholder="Enter your Email Address" 
            name="email" 
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" text="Send Reset Link"/>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

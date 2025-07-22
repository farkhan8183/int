import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  
  // Form states
  const [donorType, setDonorType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = (isLoginMode) => {
    setLogin(isLoginMode);
    setError('');
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      alert('Login successful (demo)');
      setIsLoading(false);
      navigate('/dashboard'); // Demo navigation
    }, 1500);
  };

  const handleSignup = () => {
    if (!name || !email || !phone || !address || !donorType || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      alert('Signup successful (demo)');
      setIsLoading(false);
      setLogin(true); // Switch to login after signup
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 mr-2 py-2 rounded-lg font-semibold transition-all ${
              login ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-blue-700'
            }`}
            onClick={() => handleToggle(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-lg font-semibold transition-all ${
              !login ? 'bg-pink-600 text-white shadow-md' : 'bg-gray-100 text-pink-700'
            }`}
            onClick={() => handleToggle(false)}
          >
            Signup
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {login ? (
          <div>
            <h1 className="text-xl font-bold text-center text-blue-700 mb-2">Welcome Back!</h1>
            <div className="flex flex-col gap-4">
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="mt-5 w-full py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold text-center text-pink-600 mb-2">Join Us!</h1>
            <div className="flex flex-col gap-4">
              <input 
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input 
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea 
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <select
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                value={donorType}
                onChange={(e) => setDonorType(e.target.value)}
              >
                <option value="">Select Donor Type</option>
                <option value="person">Individual</option>
                <option value="restaurant">Restaurant</option>
              </select>
              <input 
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input 
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleSignup}
              disabled={isLoading}
              className="mt-5 w-full py-2 rounded-lg font-semibold bg-pink-600 hover:bg-pink-700 text-white shadow-md"
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        )}

        <div className="mt-4 text-sm text-center">
          {login ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => handleToggle(!login)}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {login ? 'Sign up' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
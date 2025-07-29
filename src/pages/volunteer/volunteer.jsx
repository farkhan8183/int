import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIChatWidget from '../../components/AIChatWidget';

const Vollogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('');
  const [skills, setSkills] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnic, setCnic] = useState('');
  const [department, setDepartment] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setTimeout(() => {
      alert('Login successful (demo)');
      setLoading(false);
      navigate('/volunteerpanel'); // Demo navigation
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!fullName || !email || !phone || !city || !availability || !password || !confirmPassword || !cnic) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert('Signup successful (demo)');
      setLoading(false);
      setLogin(true); // Switch to login after signup
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-yellow-100 px-4">
        <AIChatWidget />
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 mr-2 py-2 rounded-lg font-semibold transition-all ${
              login ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-green-700'
            }`}
            onClick={() => handleToggle(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-lg font-semibold transition-all ${
              !login ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-100 text-yellow-600'
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
            <h1 className="text-xl font-bold text-center text-green-700 mb-2">Welcome Back!</h1>
            <div className="flex flex-col gap-4">
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-5 w-full py-2 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white shadow-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <h1 className="text-xl font-bold text-center text-yellow-600 mb-2">Become a Volunteer!</h1>
            <div className="flex flex-col gap-4">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="Full Name *"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="Email *"
                type="email"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="Phone *"
                type="tel"
                required
              />
              <input
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="CNIC *"
                required
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="City *"
                required
              />
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Availability *</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="anytime">Anytime</option>
              </select>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="Department (optional)"
              />
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="Skills (optional)"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="Password *"
                type="password"
                required
              />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                placeholder="Confirm Password *"
                type="password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full py-2 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white shadow-md"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        )}

        <div className="mt-4 text-sm text-center">
          {login ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => handleToggle(!login)}
            className="cursor-pointer text-green-600 hover:underline"
          >
            {login ? 'Sign up' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Vollogin;
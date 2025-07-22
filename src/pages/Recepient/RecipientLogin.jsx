import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reclogin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
  });

  // Toggle between login/signup
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mock form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isSignup ? 'Signup successful (demo)!' : 'Login successful (demo)!');
    if (!isSignup) navigate('/'); // Redirect on "Login"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-yellow-100 px-6 py-16">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6">
          {isSignup ? 'Recipient Sign Up' : 'Recipient Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Signup-only fields */}
          {isSignup && (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Enter contact person's name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
            </>
          )}

          {/* Email (always shown) */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
              required
            />
          </div>

          {/* Password (always shown) */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-6 rounded-lg w-full transition duration-300"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle link */}
        <p className="text-sm text-center mt-4 text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="text-emerald-700 font-medium hover:underline focus:outline-none"
          >
            {isSignup ? 'Login here' : 'Sign up here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Reclogin;
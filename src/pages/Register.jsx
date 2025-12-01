import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

import logoImg from '../assets/logo.png';
import riveFile from '../assets/8682-16614-hand-from-screen-of-mobile-phone-giving-coin-to-piggy-bank.riv';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { register } = useAuth();

  const { RiveComponent } = useRive({
    src: riveFile,
    stateMachines: "State Machine 1",
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    autoplay: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-y-auto">
      
      {/* Container to center content. min-h-full ensures vertical centering on large screens */}
      <div className="w-full min-h-full flex items-center justify-center p-4 sm:p-8">
        
        {/* Decorative background glows */}
        <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* CARD CONTAINER 
           - Changed h-[80vh] to min-h-[650px]: Lets the card grow with content (prevents inner scrollbar).
           - flex-col lg:flex-row: Stacks on mobile, side-by-side on desktop.
        */}
        <div className="relative w-full max-w-6xl min-h-[650px] bg-white rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT: Form Column */}
          {/* Removed overflow-y-auto here to prevent double scrollbars */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center z-10">
            <div className="max-w-md mx-auto w-full">
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="Logo" className="h-8 w-8 object-contain" />
                <span className="text-lg font-bold text-gray-800 tracking-tight">Resume Orbit</span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 leading-tight mb-2">
                Join the future <br /> of creativity.
              </h1>
              <p className="text-gray-500 text-sm lg:text-base mb-8 font-medium">Create an account to start.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center p-2 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-blue-100 transition-all">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase px-4 pt-3 text-left">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 pb-3 pt-1 bg-transparent outline-none border-none text-gray-800 font-semibold placeholder-gray-300"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-blue-100 transition-all">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase px-4 pt-3 text-left">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-4 pb-3 pt-1 bg-transparent outline-none border-none text-gray-800 font-semibold placeholder-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-blue-100 transition-all relative">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase px-4 pt-3 text-left">Password</label>
                    <div className="flex items-center pr-4">
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••"
                        className="w-full px-4 pb-3 pt-1 bg-transparent outline-none border-none text-gray-800 font-semibold placeholder-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-blue-100 transition-all">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase px-4 pt-3 text-left">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••"
                      className="w-full px-4 pb-3 pt-1 bg-transparent outline-none border-none text-gray-800 font-semibold placeholder-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition"
                  >
                    {isLoading ? '...' : 'CREATE'}
                  </button>

                  <Link
                    to="/login"
                    className="py-3.5 bg-white border-2 border-blue-100 text-blue-600 font-bold rounded-xl flex items-center justify-center hover:bg-blue-50 transition"
                  >
                    LOGIN
                  </Link>
                </div>

                <p className="text-[11px] text-gray-400 mt-4">
                  Protected by reCAPTCHA and subject to the Google Privacy Policy &amp; Terms of Service.
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT: Animation Column */}
          {/* On mobile (hidden lg), this disappears. On desktop, it takes half width and stretches to match left column height */}
          <div className="hidden lg:flex w-1/2 relative min-h-full">
            <div className="absolute inset-0 overflow-hidden">
              <RiveComponent style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-50/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
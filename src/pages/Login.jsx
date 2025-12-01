import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

import riveFile from '../assets/5186-10398-skill-planets.riv';
import logoImg from '../assets/logo.png'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // Initialize Rive for the 3D Right Panel
  const { RiveComponent } = useRive({
    src: riveFile,
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 1. Page Background: Soft gradient to mimic the "floating" environment
    <div className="fixed inset-0 z-50 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-y-auto">
      
      {/* Container to center content. min-h-full ensures vertical centering on large screens */}
      <div className="w-full min-h-full flex items-center justify-center p-4 sm:p-8">
      
      {/* Decorative blurred blobs behind the card for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Main Floating Card Container */}
      <div className="w-full max-w-6xl h-[80vh] bg-white rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] flex overflow-hidden min-h-[650px] relative">
        
        {/* LEFT SIDE: Login Form */}
        <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          
          {/* Header / Logo */}
          <div className="flex items-center gap-3 mb-5">
            <img 
              src={logoImg} 
              alt="Logo" 
              className="h-20 w-20 object-contain" 
            />
            <span className="text-xl font-semibold text-gray-800 tracking-tight">Resume Orbit</span>
          </div>

          {/* Main Content */}
          <div className="space-y-5">
            {/* Headline - Serif font to match reference */}
            <div>
              <h1 className="font-serif text-4xl text-gray-900 leading-[1.1] mb-4">
                Navigate the professional universe with AI guidance
              </h1>
              <p className="text-gray-500 text-lg">
                Welcome back! Please login to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Email Input - Custom styling to match reference */}
                <div className="group relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-50 rounded-l-lg opacity-0 transition-opacity duration-200 group-focus-within:opacity-100" />
                  <div className="bg-gray-50 border-2 border-transparent focus-within:bg-white focus-within:border-blue-100 transition-all duration-200 rounded-lg overflow-hidden relative">
                    <label className="block lg:text-xs font-bold text-gray-400 uppercase tracking-wider px-4 pt-3 text-left">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 pb-3 pt-1 bg-transparent border-none focus:ring-0 text-gray-900 outline-none placeholder-transparent font-medium"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="group relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-50 rounded-l-lg opacity-0 transition-opacity duration-200 group-focus-within:opacity-100" />
                  <div className="bg-gray-50 border-2 border-transparent focus-within:bg-white focus-within:border-blue-100 transition-all duration-200 rounded-lg overflow-hidden relative">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider px-4 pt-3 text-left">
                      Password
                    </label>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 pb-3 pt-1 bg-transparent border-none focus:ring-0 outline-none text-gray-900 placeholder-transparent font-medium tracking-widest"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-within:bg-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500/20" />
                  <span className="text-sm text-gray-500 font-medium">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  Forgot Password
                </Link>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-200 transition-all duration-200 active:scale-[0.98]"
                >
                  {isLoading ? 'LOADING...' : 'LOGIN'}
                </button>
                
                <Link 
                  to="/register"
                  className="w-full py-4 bg-white border-2 border-blue-100 hover:border-blue-300 text-blue-400 hover:text-blue-500 font-bold rounded-lg text-center transition-all duration-200"
                >
                  SIGNUP
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8">
      
          </div>
        </div>

        {/* RIGHT SIDE: 3D Rive Animation */}
        {/* Hidden on mobile, full width on large screens */}
        <div className="hidden lg:block w-1/2 relative bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
          <div className="absolute inset-0 w-full h-full scale-110"> {/* Slight scale to ensure bleed */}
            <RiveComponent />
          </div>
          {/* Overlay to tint the animation slightly if needed to match brand */}
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none" />
        </div>

      </div>
    </div>
    </div>
  );
}
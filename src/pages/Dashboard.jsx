import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Bot, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  ArrowRight,
  ArrowLeft, // Added for navigation
  Settings,
  LogOut,
  Moon,
  Sun,
  Sparkles,
  Target,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { SVGMaskEffect } from '../components/ui/SVGMaskEffect';

// Import Assets
import logoImg from '../assets/logo.png';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // 1. Ref for the scroll container
  const scrollContainerRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 2. Scroll Handler Function
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjusts how far it slides (Card width + Gap)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen w-full h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={logoImg} alt="Logo" className="h-8 w-8 object-contain mr-3" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Resume Orbit</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-blue-500/20"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=ffffff`}
                  alt={user?.name}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                </div>
              </div>
              
              <button onClick={() => navigate('/profile')} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- WELCOME SECTION --- */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-serif text-gray-900 dark:text-gray-100 mb-3">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here's what's happening with your career orbit today.
          </p>
        </div>

        {/* --- SVG HERO --- */}
        <div className="mb-16">
          <SVGMaskEffect className="rounded-3xl min-h-[300px] p-8 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <Sparkles className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered Insights</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  Our advanced AI analyzes market trends, your skills, and career goals to provide actionable recommendations.
                </p>
                <button onClick={() => navigate('/chatbot')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center lg:mx-0 mx-auto transition-all">
                  <Bot className="h-5 w-5 mr-2" /> Start Analysis
                </button>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-center w-24">
                  <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-bold">Goals</p>
                </div>
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl text-center w-24">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-bold">Trends</p>
                </div>
              </div>
            </div>
          </SVGMaskEffect>
        </div>

        {/* --- SCROLLABLE CAROUSEL --- */}
        <div className="mb-16">
          {/* Header with Title and Scroll Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 px-1">
             <div>
               <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                 Quick Actions
               </h3>
             </div>
             <div className="flex gap-3 mt-4 md:mt-0">
               <button 
                 onClick={() => scroll('left')} 
                 className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                 aria-label="Scroll Left"
               >
                 <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
               </button>
               <button 
                 onClick={() => scroll('right')} 
                 className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                 aria-label="Scroll Right"
               >
                 <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
               </button>
             </div>
          </div>
          
          {/* Scroll Container with Ref */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {/* CARD 1: Resume (Blue) */}
            <div className="flex-shrink-0 w-80 md:w-96 h-[420px] snap-center">
              <div 
                onClick={() => navigate('/chatbot?purpose=resume-analysis')}
                className="w-full h-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-[32px] shadow-xl relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center p-8">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 border border-blue-200 dark:border-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <FileText size={24} />
                      </div>
                      <div className="absolute top-0 right-0 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-sm animate-bounce delay-75">
                         <Sparkles size={12} className="text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Tool 01.</span>
                  <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Resume Orbit</h2>
                  <p className="text-gray-500 text-sm max-w-[220px] mb-6">
                    Transform your CV into a digital asset. Analyze structure & impact.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                    <span>Analyze Now</span> <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Job Match (Green) */}
            <div className="flex-shrink-0 w-80 md:w-96 h-[420px] snap-center">
              <div 
                onClick={() => navigate('/chatbot?purpose=job-recommendations')}
                className="w-full h-full bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 border border-green-100 dark:border-gray-700 rounded-[32px] shadow-xl relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center p-8">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 border border-green-200 dark:border-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Briefcase size={24} />
                      </div>
                      <div className="absolute top-0 right-0 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-sm animate-bounce delay-100">
                        <Target size={12} className="text-red-500" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Tool 02.</span>
                  <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Job Match</h2>
                  <p className="text-gray-500 text-sm max-w-[220px] mb-6">
                    Discover roles that fit your profile with our AI-driven matching score.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-green-600 group-hover:gap-3 transition-all">
                    <span>Find Jobs</span> <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: AI Coach (Purple) */}
            <div className="flex-shrink-0 w-80 md:w-96 h-[420px] snap-center">
              <div 
                onClick={() => navigate('/chatbot?purpose=career-chat')}
                className="w-full h-full bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 border border-purple-100 dark:border-gray-700 rounded-[32px] shadow-xl relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center p-8">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 border border-purple-200 dark:border-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Bot size={24} />
                      </div>
                      <div className="absolute top-0 right-0 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-sm animate-bounce delay-100">
                        <MessageSquare size={12} className="text-blue-500" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Tool 03.</span>
                  <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">AI Coach</h2>
                  <p className="text-gray-500 text-sm max-w-[200px] mb-6">
                    Chat with your personal career strategist.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-purple-600 group-hover:gap-3 transition-all">
                    <span>Start Chat</span> <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- STATS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Resumes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Matches</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">47</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
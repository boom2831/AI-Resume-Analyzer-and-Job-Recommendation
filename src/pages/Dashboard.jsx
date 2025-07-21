// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { PinContainer } from '../components/ui/Pin3D';
// import { useTheme } from '../contexts/ThemeContext';
// import { 
//   Bot, 
//   FileText, 
//   MessageSquare, 
//   TrendingUp, 
//   ArrowRight,
//   Settings,
//   LogOut,
//   Moon,
//   Sun
// } from 'lucide-react';

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const quickActions = [
//     {
//       title: 'Analyze Resume',
//       description: 'Upload and analyze your resume',
//       icon: FileText,
//       action: () => navigate('/chatbot?purpose=resume-analysis'),
//       color: 'bg-blue-50 text-blue-600'
//     },
//     {
//       title: 'Get Job Recommendations',
//       description: 'Find relevant job opportunities',
//       icon: TrendingUp,
//       action: () => navigate('/chatbot?purpose=job-recommendations'),
//       color: 'bg-green-50 text-green-600'
//     },
//     {
//       title: 'Career Chat',
//       description: 'Chat with AI career advisor',
//       icon: Bot,
//       action: () => navigate('/chatbot?purpose=career-chat'),
//       color: 'bg-purple-50 text-purple-600'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Header */}
//       <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Bot className="h-8 w-8 text-blue-600 dark:text-blue-300 mr-3" />
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Career AI Dashboard</h1>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
//               >
//                 {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
//               </button>
//               <div className="flex items-center space-x-3">
//                 <img
//                   className="h-8 w-8 rounded-full"
//                   src={user?.avatar}
//                   alt={user?.name}
//                 />
//                 <div className="hidden md:block">
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">{user?.email}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => navigate('/profile')}
//                   className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   <Settings className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   <LogOut className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//             Welcome back, {user?.name}! 👋
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Ready to advance your career? Choose an action below to get started.
//           </p>
//         </div>

//         {/* Quick Actions */}
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {quickActions.map((action, index) => (
//                 <button
//                   key={index}
//                   onClick={action.action}
//                   className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm transition-all duration-200 text-left group bg-gray-50 dark:bg-gray-900"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className={`p-3 rounded-lg ${action.color} mr-4`}></div>
//                       <div>
//                         <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{action.title}</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{action.description}</p>
//                       </div>
//                     </div>
//                     <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white transition-colors" />
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// Dashboard.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useTheme } from '../contexts/ThemeContext';
// import { 
//   Bot, 
//   FileText, 
//   MessageSquare, 
//   TrendingUp, 
//   ArrowRight,
//   Settings,
//   LogOut,
//   Moon,
//   Sun
// } from 'lucide-react';
// import { PinContainer } from '../components/ui/Pin3D';

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const quickActions = [
//     {
//       title: 'Analyze Resume',
//       description: 'Upload and analyze your resume with AI-powered insights',
//       icon: FileText,
//       action: () => navigate('/chatbot?purpose=resume-analysis'),
//       bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50',
//       iconColor: 'text-blue-600 dark:text-blue-400',
//       hoverColor: 'hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/70 dark:hover:to-blue-800/70'
//     },
//     {
//       title: 'Get Job Recommendations',
//       description: 'Discover relevant job opportunities tailored to your skills',
//       icon: TrendingUp,
//       action: () => navigate('/chatbot?purpose=job-recommendations'),
//       bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50',
//       iconColor: 'text-green-600 dark:text-green-400',
//       hoverColor: 'hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/70 dark:hover:to-green-800/70'
//     },
//     {
//       title: 'Career Chat',
//       description: 'Get personalized career advice from our AI advisor',
//       icon: MessageSquare,
//       action: () => navigate('/chatbot?purpose=career-chat'),
//       bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50',
//       iconColor: 'text-purple-600 dark:text-purple-400',
//       hoverColor: 'hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/70 dark:hover:to-purple-800/70'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       {/* Header */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Bot className="h-8 w-8 text-blue-600 dark:text-blue-300 mr-3" />
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Career AI Dashboard</h1>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//                 title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
//               >
//                 {theme === 'dark' ? 
//                   <Sun className="h-5 w-5 text-yellow-400" /> : 
//                   <Moon className="h-5 w-5 text-gray-600" />
//                 }
//               </button>
              
//               <div className="flex items-center space-x-3">
//                 <img
//                   className="h-8 w-8 rounded-full ring-2 ring-blue-500/20"
//                   src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=ffffff`}
//                   alt={user?.name}
//                 />
//                 <div className="hidden md:block">
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">{user?.email}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => navigate('/profile')}
//                   className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   <Settings className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   <LogOut className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-12 text-center">
//           <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
//             Welcome back, {user?.name}! 👋
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Ready to advance your career? Choose an action below to get started with our AI-powered tools.
//           </p>
//         </div>

//         {/* Quick Actions with 3D Pin Cards */}
//         <div className="flex justify-center items-center">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
//             {quickActions.map((action, index) => (
//               <div key={index} className="flex justify-center">
//                 <PinContainer title={action.title} href="#">
//                   <div
//                     onClick={action.action}
//                     className={`w-80 h-64 rounded-2xl ${action.bgColor} ${action.hoverColor} border border-gray-200/50 dark:border-gray-700/50 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl group`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className={`p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-md group-hover:scale-110 transition-transform duration-300`}>
//                         <action.icon className={`w-8 h-8 ${action.iconColor}`} />
//                       </div>
//                       <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
//                     </div>
                    
//                     <div className="mt-6">
//                       <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
//                         {action.title}
//                       </h4>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//                         {action.description}
//                       </p>
//                     </div>
//                   </div>
//                 </PinContainer>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Additional Stats or Quick Info */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
//                 <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Resumes Analyzed</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
//                 <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Job Matches</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">47</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
//                 <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Chat Sessions</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Bot, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  ArrowRight,
  Settings,
  LogOut,
  Moon,
  Sun,
  Sparkles,
  Target,
  Award
} from 'lucide-react';
import { PinContainer } from '../components/ui/Pin3D';
import { SVGMaskEffect } from '../components/ui/SVGMaskEffect';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const quickActions = [
    {
      title: 'Analyze Resume',
      description: 'Upload and analyze your resume with AI-powered insights',
      icon: FileText,
      action: () => navigate('/chatbot?purpose=resume-analysis'),
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50',
      iconColor: 'text-blue-600 dark:text-blue-400',
      hoverColor: 'hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/70 dark:hover:to-blue-800/70'
    },
    {
      title: 'Get Job Recommendations',
      description: 'Discover relevant job opportunities tailored to your skills',
      icon: TrendingUp,
      action: () => navigate('/chatbot?purpose=job-recommendations'),
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50',
      iconColor: 'text-green-600 dark:text-green-400',
      hoverColor: 'hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/70 dark:hover:to-green-800/70'
    },
    {
      title: 'Career Chat',
      description: 'Get personalized career advice from our AI advisor',
      icon: MessageSquare,
      action: () => navigate('/chatbot?purpose=career-chat'),
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50',
      iconColor: 'text-purple-600 dark:text-purple-400',
      hoverColor: 'hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/70 dark:hover:to-purple-800/70'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-blue-600 dark:text-blue-300 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Career AI Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? 
                  <Sun className="h-5 w-5 text-yellow-400" /> : 
                  <Moon className="h-5 w-5 text-gray-600" />
                }
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-blue-500/20"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=ffffff`}
                  alt={user?.name}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/profile')}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to advance your career? Choose an action below to get started with our AI-powered tools.
          </p>
        </div>

        {/* SVG Mask Effect Section */}
        <div className="mb-16">
          <SVGMaskEffect className="rounded-3xl min-h-[300px] p-8 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <Sparkles className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    AI-Powered Career Insights
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  Discover personalized career opportunities and insights tailored specifically for you. 
                  Our advanced AI analyzes market trends, your skills, and career goals to provide 
                  actionable recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate('/chatbot')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center"
                  >
                    <Bot className="h-5 w-5 mr-2" />
                    Start AI Chat
                  </button>
                  <button
                    onClick={() => navigate('/profile')}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-xl transition-colors duration-200"
                  >
                    View Profile
                  </button>
                </div>
              </div>
              
              {/* Right Content - Feature Icons */}
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-center">
                    <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Goal Tracking</p>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl text-center">
                    <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Market Analysis</p>
                  </div>
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-center">
                    <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Guidance</p>
                  </div>
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-center">
                    <Award className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </SVGMaskEffect>
        </div>

        {/* Quick Actions with 3D Pin Cards */}
        <div className="flex justify-center items-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {quickActions.map((action, index) => (
              <div key={index} className="flex justify-center">
                <PinContainer title={action.title} href="#">
                  <div
                    onClick={action.action}
                    className={`w-80 h-64 rounded-2xl ${action.bgColor} ${action.hoverColor} border border-gray-200/50 dark:border-gray-700/50 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl group`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className={`w-8 h-8 ${action.iconColor}`} />
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </PinContainer>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats or Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Resumes Analyzed</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Job Matches</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Chat Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
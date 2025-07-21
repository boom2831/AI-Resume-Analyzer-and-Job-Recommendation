import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Paperclip, Send, User, Bot, ArrowLeft, Moon, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Get the purpose from URL parameters
  const purpose = searchParams.get('purpose') || 'general';

  const getWelcomeMessage = (purpose) => {
    switch (purpose) {
      case 'job-recommendations':
        return "🎯 **Job Recommendations Specialist**\n\nHello! I'm here to help you find the perfect job opportunities. Please upload your resume (PDF) and I'll analyze your skills and experience to recommend relevant positions from top companies.\n\n**What I can help with:**\n• Find jobs matching your skills\n• Suggest companies to apply to\n• Provide application tips\n• Analyze job market trends\n\nReady to discover your next career move? 📈";
      
      case 'resume-analysis':
        return "📝 **Resume Analysis Expert**\n\nHello! I'm your personal resume optimization specialist. Please upload your resume (PDF) and I'll provide detailed feedback to make it stand out to recruiters.\n\n**What I can help with:**\n• Identify areas for improvement\n• Suggest better wording and formatting\n• Highlight missing keywords\n• Optimize for ATS systems\n• Compare against job descriptions\n\nLet's make your resume irresistible! ✨";
      
      case 'career-chat':
        return "💼 **Career Development Coach**\n\nHello! I'm your AI career coach here to guide you through your professional journey. Whether you need advice on career transitions, skill development, or industry insights, I'm here to help.\n\n**What I can help with:**\n• Career planning and goal setting\n• Industry insights and trends\n• Skill development recommendations\n• Networking strategies\n• Interview preparation tips\n\nWhat would you like to discuss today? 🤔";
      
      default:
        return "👋 **Career AI Assistant**\n\nHello! I'm your personal career assistant. Please upload your resume (PDF) and ask me anything about job recommendations, resume improvements, or career advice.\n\n**I can help with:**\n• Job recommendations\n• Resume analysis and optimization\n• Career guidance and planning\n• Industry insights\n\nLet's advance your career together! 🚀";
    }
  };

  useEffect(() => {
    // Add initial welcome message based on purpose
    setMessages([
      {
        text: getWelcomeMessage(purpose),
        isUser: false,
      },
    ]);
  }, [purpose]);

  useEffect(() => {
    // Scroll to the bottom of the chat on new message
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result.split(',')[1]);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!file) {
        alert("Please upload your resume first.");
        return;
    }

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const resumeBase64 = await fileToBase64(file);
        
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              prompt: input,
              resume_base64: resumeBase64,
              session_id: user?.id || 'user123' 
          }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        const botResponse = {
            text: data.response,
            isUser: false,
        };
        setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        text: 'Sorry, I encountered an error. Please check the console and try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const getHeaderTitle = (purpose) => {
    switch (purpose) {
      case 'job-recommendations':
        return 'Job Recommendations';
      case 'resume-analysis':
        return 'Resume Analysis';
      case 'career-chat':
        return 'Career Chat';
      default:
        return 'Career AI Chat';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Bot className="h-8 w-8 text-blue-600 dark:text-blue-300 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{getHeaderTitle(purpose)}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
          </button>
          <img
            className="h-8 w-8 rounded-full"
            src={user?.avatar}
            alt={user?.name}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 my-4 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              {!msg.isUser && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  <Bot size={20} />
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-lg shadow-sm ${msg.isUser ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-br-none dark:bg-gradient-to-br dark:from-blue-700 dark:to-purple-700' : 'bg-white text-gray-800 rounded-bl-none border dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'}`}>
                <div className="prose prose-sm max-w-none text-left dark:prose-invert">
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
               {msg.isUser && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 flex-shrink-0 shadow-lg dark:from-gray-700 dark:to-gray-600 dark:text-gray-200">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t p-4">
        <div className="max-w-3xl mx-auto">
           {fileName && (
            <div className="bg-blue-50 border border-blue-300 text-blue-800 text-sm rounded-lg px-4 py-2 mb-2 flex justify-between items-center">
              <span className="font-medium">{fileName}</span>
              <button onClick={() => { setFile(null); setFileName(''); }} className="text-blue-600 hover:text-blue-800 font-bold text-lg">&times;</button>
            </div>
          )}
          <div className="flex items-center bg-gray-100 rounded-xl p-2 shadow-sm">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-3 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
            >
              <Paperclip size={22} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or upload a resume..."
              className="flex-1 bg-transparent px-4 py-2 text-gray-800 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !file}
              className="p-3 text-white bg-gradient-to-br from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-200 shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send size={22} />
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

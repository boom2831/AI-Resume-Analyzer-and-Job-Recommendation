import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Paperclip, 
  Send, 
  User, 
  Bot, 
  ArrowLeft, 
  Moon, 
  Sun,
  Sparkles,
  X 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import botIcon from '../assets/bot.png'; 

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

  const purpose = searchParams.get('purpose') || 'general';

  const getWelcomeMessage = (purpose) => {
    switch (purpose) {
      case 'job-recommendations':
        return "🎯 **Job Recommendations Specialist**\n\nHello! I'm here to help you find the perfect job opportunities. Please upload your resume (PDF) and I'll analyze your skills and experience to recommend relevant positions from top companies.";
      case 'resume-analysis':
        return "📝 **Resume Analysis Expert**\n\nHello! I'm your personal resume optimization specialist. Please upload your resume (PDF) and I'll provide detailed feedback to make it stand out to recruiters.";
      case 'career-chat':
        return "💼 **Career Development Coach**\n\nHello! I'm your AI career coach. Whether you need advice on career transitions, skill development, or industry insights, I'm here to help.";
      default:
        return "👋 **Career AI Assistant**\n\nHello! I'm your personal career assistant. Please upload your resume (PDF) and ask me anything about job recommendations, resume improvements, or career advice.";
    }
  };

  useEffect(() => {
    setMessages([
      {
        text: getWelcomeMessage(purpose),
        isUser: false,
      },
    ]);
  }, [purpose]);

  useEffect(() => {
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
        const response = await fetch('https://jew3xuj4jmbnp6ykb2jxmzxr540mcrgv.lambda-url.eu-north-1.on.aws/', {
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
      case 'job-recommendations': return 'Job Match';
      case 'resume-analysis': return 'Resume Analysis';
      case 'career-chat': return 'Career Coach';
      default: return 'AI Assistant';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <img 
                src={botIcon} 
                alt="AI Assistant" 
                className="w-10 h-10 rounded-full mr-3 object-cover shadow-sm"
              />
              
              <div>
                <h1 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
                  {getHeaderTitle(purpose)}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- CHAT AREA --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              
              {/* Bot Avatar (Chat Bubble) */}
              {!msg.isUser && (
                <div className="w-8 h-8 rounded-full overflow-hidden shadow-md mt-1 border border-gray-100 dark:border-gray-700">
                  <img src={botIcon} alt="Bot" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`
                  p-5 rounded-2xl max-w-[85%] sm:max-w-lg shadow-sm text-sm leading-relaxed
                  ${msg.isUser 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-bl-none'
                  }
                `}
              >
                <div className={`prose prose-sm max-w-none ${msg.isUser ? 'prose-invert' : 'dark:prose-invert'}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>

              {/* User Avatar */}
              {msg.isUser && (
                <img
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-md mt-1"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                  alt="User"
                />
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* --- INPUT AREA --- */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-3xl mx-auto">
          
          {/* File Preview Pill */}
          {fileName && (
            <div className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-100 dark:border-blue-900/50">
              <Paperclip size={12} />
              <span className="truncate max-w-[200px]">{fileName}</span>
              <button 
                onClick={() => { setFile(null); setFileName(''); }} 
                className="hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* Input Container */}
          <div className="relative flex items-end gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-[24px] border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf"
            />
            
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              title="Upload PDF"
            >
              <Paperclip size={20} />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); 
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 max-h-32 min-h-[44px] py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm resize-none scrollbar-hide"
              rows={1}
            />

            <button
              onClick={handleSendMessage}
              disabled={isLoading || !file}
              className={`
                p-3 rounded-full flex items-center justify-center transition-all duration-200 shadow-md
                ${isLoading || !file 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 active:scale-95'
                }
              `}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={18} className={!file ? 'opacity-50' : 'opacity-100'} />
              )}
            </button>
          </div>
          
          <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-2">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </footer>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Send, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown'

// Main App Component
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Add initial welcome message
    setMessages([
      {
        text: "Hello! I'm your personal career assistant. Please upload your resume (PDF) and ask me anything about job recommendations or resume improvements.",
        isUser: false,
      },
    ]);
  }, []);

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
    reader.onload = () => resolve(reader.result.split(',')[1]);
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
              session_id: 'user123' 
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

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md p-4 flex items-center">
        <Bot className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Career AI Agent</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 my-4 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              {!msg.isUser && (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                  <Bot size={24} />
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-lg ${msg.isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}>
                <div className="prose prose-sm max-w-none text-left">
                <ReactMarkdown>
                    {msg.text}
                </ReactMarkdown>
                </div>


              </div>
               {msg.isUser && (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                  <User size={24} />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto">
           {fileName && (
            <div className="bg-blue-100 border border-blue-300 text-blue-800 text-sm rounded-md px-4 py-2 mb-2 flex justify-between items-center">
              <span>{fileName}</span>
              <button onClick={() => { setFile(null); setFileName(''); }} className="text-blue-600 hover:text-blue-800">&times;</button>
            </div>
          )}
          <div className="flex items-center bg-gray-100 rounded-xl p-2">
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
              className="p-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
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

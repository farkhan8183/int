import React, { useState, useEffect } from 'react';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { FaRobot, FaArrowRight } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { RiChatSmile3Fill } from 'react-icons/ri';

const AIChatWidget = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Default to open
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      text: "Hello! I'm FoodBridge AI Assistant. I can help with recipes, food donation tips, and answer questions about our platform. How can I assist you today?",
      sender: 'bot'
    }
  ]);

  // Suggested questions
  const suggestedQuestions = [
    "How can restaurants donate excess food?",
    "What types of food can be donated?",
    "Give me a recipe using leftover rice",
    "How does FoodBridge ensure food safety?",
    "Can individuals volunteer with FoodBridge?"
  ];

  // Pulse animation for the widget
  const [isPulsing, setIsPulsing] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = async (question = null) => {
    const query = question || userInput;
    
    if (!query.trim()) {
      setError('Please enter your question or recipe request');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Add user message to chat
    setChatHistory(prev => [...prev, {
      id: Date.now(),
      text: query,
      sender: 'user'
    }]);

    try {
      const response = await fetch('https://primary-production-03db.up.railway.app/webhook/charity', {
        method: 'POST',             
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeRequest: query })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        text: data.recipe || "Here's the information you requested:",
        sender: 'bot'
      }]);
    } catch (err) {
      setError(err.message || 'Failed to generate response');
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
      if (!question) setUserInput('');
    }
  }

  return (
    <>
      
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'w-80 md:w-96' : 'w-24'}`}>
        {/* Closed State (Minimized) - More prominent */}
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className={`bg-gradient-to-r from-emerald-500 to-emerald-700 text-white p-4 rounded-full shadow-xl z-40 flex items-center justify-center 
              ${isPulsing ? 'animate-pulse ring-4 ring-emerald-300' : ''}`}
            aria-label="Open AI Chat"
            style={{
              width: '80px',
              height: '80px'
            }}
          >
            <div className="relative flex flex-col items-center">
              <RiChatSmile3Fill className="h-10 w-10" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                AI
              </span>
              <span className="text-xs mt-1 font-semibold">Ask AI</span>
            </div>
          </button>
        )}

        {/* Open State */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl w-full h-[500px] flex flex-col border-2 border-emerald-300 overflow-hidden transform transition-all duration-300">
            {/* Chat Header - More vibrant */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center animate-pulse">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">FoodBridge AI Assistant</h3>
                  <p className="text-xs text-emerald-100">Ask me anything about food donations or recipes</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-700 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <IoMdClose className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-emerald-50">
              <div className="space-y-4">
                {chatHistory.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-emerald-200 rounded-bl-none shadow-sm'}`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border border-emerald-200 rounded-bl-none shadow-sm px-4 py-3 rounded-2xl max-w-xs">
                      <div className="flex space-x-2 items-center">
                        <span className="text-sm text-emerald-600">Thinking</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Questions */}
              {chatHistory.length <= 1 && (
                <div className="mt-6">
                  <p className="text-xs text-gray-500 mb-2 text-center">Try asking:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleGenerate(question)}
                        className="bg-white border border-emerald-200 hover:bg-emerald-50 rounded-xl px-3 py-2 text-sm text-left flex items-center justify-between transition-colors"
                      >
                        <span className="truncate">{question}</span>
                        <FaArrowRight className="text-emerald-500 ml-2 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-emerald-200 p-3 bg-white">
              {error && <div className="text-red-500 text-xs mb-2 text-center">{error}</div>}
              <div className="flex space-x-2">
                <input
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    setError(null);
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="Type your question here..."
                  disabled={isLoading}
                  className="flex-1 border border-emerald-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={() => handleGenerate()}
                  disabled={isLoading || !userInput.trim()}
                  className={`p-2 rounded-full ${isLoading || !userInput.trim() 
                    ? 'bg-gray-300 text-gray-500' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'} transition-colors flex-shrink-0`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Powered by FoodBridge AI technology</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChatWidget;
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  // WhatsApp contact details
  const phoneNumber = "+923408918463"; // No spaces or special characters
  const defaultMessage = "Hello FoodBridge, I need some information about...";

  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center"
      style={{ 
        width: '80px', 
        height: '80px',
        animation: 'pulse 2s infinite'
      }}
      aria-label="Contact via WhatsApp"
    >
      <div className="relative flex flex-col items-center">
        <FaWhatsapp className="h-10 w-10" />
        <span className="text-xs mt-1 font-semibold">Chat Now</span>
        
        {/* Optional notification badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-ping">
          !
        </span>
      </div>
      
      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </a>
  );
};

export default WhatsAppButton;
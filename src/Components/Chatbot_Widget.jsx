import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const FloatingChatWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChatRedirect = () => {
    // This would be replaced with your actual navigation/redirect logic
    window.location.href = "/chatbot"; // Replace with your chat page URL
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget bubble with shadow and animation */}
      <button
        onClick={handleChatRedirect}
        className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Tooltip that appears on hover */}
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 animate-fadeIn">
          Ask AI for suggestions
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

// Custom animation
const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease forwards;
  }
`;

const FloatingChatWidgetWithStyles = () => (
  <>
    <style>{customStyles}</style>
    <FloatingChatWidget />
  </>
);

export default FloatingChatWidgetWithStyles;

import React, { useState, useEffect } from 'react';

const InvestmentLandingPage = () => {
  const [isVisible, setIsVisible] = useState({
    badge: false,
    heading1: false,
    heading2: false,
    subtitle: false,
    buttons: false
  });

  useEffect(() => {
    // Staggered animations
    const timers = [
      setTimeout(() => setIsVisible(prev => ({ ...prev, badge: true })), 300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, heading1: true })), 800),
      setTimeout(() => setIsVisible(prev => ({ ...prev, heading2: true })), 1300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, subtitle: true })), 1800),
      setTimeout(() => setIsVisible(prev => ({ ...prev, buttons: true })), 2300),
    ];
    
    // Cleanup
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const fadeClass = (element) => 
    `transition-all duration-1000 transform ${
      isVisible[element] 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-10'
    }`;

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      
      {/* Simple decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl" />
      
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 ${fadeClass('badge')}`}>
            <div className="w-5 h-5 rounded-full bg-blue-500" />
            <span className="text-sm text-white/60 tracking-wide">Wealth Solutions</span>
          </div>
          
          {/* Main heading */}
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-2 tracking-tight">
              <span className={`block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 ${fadeClass('heading1')}`}>
                Secure Your
              </span>
              <span className={`block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white/90 to-purple-300 ${fadeClass('heading2')}`}>
                Financial Future
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className={`text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4 ${fadeClass('subtitle')}`}>
            Strategic investment solutions designed to grow and protect your wealth for generations.
          </p>
          
          {/* Call to action buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${fadeClass('buttons')}`}>
            <button className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-lg bg-transparent border border-white/20 hover:bg-white/5 text-white/80 font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/80 pointer-events-none" />
    </div>
  );
};

export default InvestmentLandingPage;
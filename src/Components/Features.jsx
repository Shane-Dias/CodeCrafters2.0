import React, { useEffect, useState, useRef } from 'react';

const FeatureCard = ({ icon, title, description, glowColor }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the card enters the viewport, set it to visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once we've shown the card, we can stop observing it
          observer.unobserve(cardRef.current);
        }
      },
      { 
        threshold: 0.2, // Card will start appearing when 20% is visible
        rootMargin: '0px 0px -50px 0px' // Slightly before it comes into view
      }
    );
    
    // Start observing the card element
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    // Clean up observer on component unmount
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Default glow color if none provided
  const defaultGlowColor = 'rgba(59, 130, 246, 0.3)'; // blue-500 with opacity
  const activeGlowColor = glowColor || defaultGlowColor;
  
  return (
    <div 
      ref={cardRef}
      className={`bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 transition-all duration-1000 transform relative overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered 
          ? `0 0 25px 2px ${activeGlowColor}, 0 0 10px 0 ${activeGlowColor} inset` 
          : `0 0 5px 0 ${activeGlowColor}`
      }}
    >
      {/* Subtle glow effect in the background */}
      <div 
        className="absolute -inset-1 rounded-xl opacity-30 blur-xl transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${activeGlowColor} 0%, transparent 70%)`,
          opacity: isHovered ? 0.5 : 0.2
        }}
      />
      
      {/* Content with relative positioning to stay above the glow effect */}
      <div className="relative z-10">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
          style={{ 
            backgroundColor: isHovered ? `${activeGlowColor}40` : 'rgba(59, 130, 246, 0.2)',
            boxShadow: isHovered ? `0 0 10px 0 ${activeGlowColor}` : 'none'
          }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-medium text-white mb-2 transition-colors duration-300">{title}</h3>
        <p className="text-white/60 transition-colors duration-300">{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose WealthGrow</h2>
          <p className="text-white/60 max-w-2xl mx-auto">We provide intelligent investment solutions tailored to your goals and risk tolerance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            glowColor="rgba(59, 130, 246, 0.5)" // Blue glow
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Strategic Portfolio"
            description="Diversified investment strategies designed to maximize returns while managing risk effectively."
          />
          
          <FeatureCard
            glowColor="rgba(139, 92, 246, 0.5)" // Purple glow
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Secure Investments"
            description="Advanced security protocols and careful due diligence to protect your financial assets."
          />
          
          <FeatureCard
            glowColor="rgba(16, 185, 129, 0.5)" // Green glow
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            title="Growth Focus"
            description="Data-driven strategies to identify high-potential growth opportunities across multiple sectors."
          />
          
          <FeatureCard
            glowColor="rgba(245, 158, 11, 0.5)" // Amber glow
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title="Expert Advisors"
            description="Access to financial experts and investment professionals who understand market dynamics."
          />
          
          <FeatureCard
            glowColor="rgba(236, 72, 153, 0.5)" // Pink glow
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Innovative Solutions"
            description="Cutting-edge investment approaches that leverage the latest market research and technology."
          />
          
          <FeatureCard
            glowColor="rgba(6, 182, 212, 0.5)" // Cyan glow
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Long-Term Vision"
            description="Strategic planning for sustainable wealth growth and generational financial security."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
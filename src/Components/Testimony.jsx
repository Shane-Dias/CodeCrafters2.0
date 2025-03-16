import React, { useState, useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Testimonials data with specific glow colors
  const testimonials = [
    {
      quote: "WealthGrow transformed our financial future. Their strategic approach to investments delivered returns we hadn't thought possible while keeping risk manageable.",
      author: "Sarah Johnson",
      position: "Tech Executive",
      image: "/api/placeholder/80/80",
      glowColor: "from-blue-600/20 to-cyan-400/20" // Blue to cyan gradient glow
    },
    {
      quote: "The expertise and personalized attention from WealthGrow's advisors made all the difference. Our retirement portfolio has flourished under their management.",
      author: "Michael Chen",
      position: "Retired Professor",
      image: "/api/placeholder/80/80",
      glowColor: "from-purple-600/20 to-pink-400/20" // Purple to pink gradient glow
    },
    {
      quote: "As a business owner, I needed investment solutions that understood my unique situation. WealthGrow delivered with tailored strategies that have grown my assets consistently.",
      author: "David Patel",
      position: "Small Business Owner",
      image: "/api/placeholder/80/80",
      glowColor: "from-emerald-600/20 to-teal-400/20" // Emerald to teal gradient glow
    }
  ];

  // Handle scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse" 
           style={{animationDuration: '15s'}} />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl animate-pulse" 
           style={{animationDuration: '20s'}} />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.025] bg-[length:50px_50px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-10 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block py-1 px-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-3">Testimonials</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">What Our Clients Say</h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm">Trusted by investors worldwide for our expertise and proven results.</p>
        </div>
        
        <div className={`max-w-3xl mx-auto relative transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`} style={{ transitionDelay: '300ms' }}>
          {/* Main card with dynamic glow effect based on active testimonial */}
          <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-white/5 overflow-hidden">
            {/* Dynamic glow effect that changes with each testimonial */}
            <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeIndex].glowColor} opacity-30 blur-xl`} />
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Animated ring around the card */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl animate-pulse" 
                 style={{animationDuration: '3s'}} />
            
            {/* Content container with z-index to appear above backgrounds */}
            <div className="relative z-10">
              <svg className="w-10 h-10 text-blue-500/50 mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <div className="min-h-40">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-1000 ${
                      index === activeIndex ? 'opacity-100 block' : 'opacity-0 hidden'
                    }`}
                  >
                    <blockquote className="text-base md:text-lg text-white font-light leading-relaxed mb-6 relative">
                      {testimonial.quote}
                    </blockquote>
                    
                    <div className="flex items-center">
                      {/* Glowing avatar border that matches testimonial color */}
                      <div className={`p-0.5 rounded-full bg-gradient-to-r ${testimonial.glowColor.replace("/20", "")} mr-3 shadow-lg`}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                          <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-white text-sm">{testimonial.author}</div>
                        <div className="text-blue-400/80 text-xs">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all ${
                      index === activeIndex 
                        ? `w-10 h-1 bg-gradient-to-r ${testimonial.glowColor.replace("/20", "")}`
                        : 'w-8 h-1 bg-white/20'
                    } rounded-full`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Glowing stats cards */}
          <div className={`grid grid-cols-3 gap-3 mt-6 transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`} style={{ transitionDelay: '600ms' }}>
            {/* Each stat card has its own glow color */}
            <div className="relative group overflow-hidden">
              {/* Blue glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-cyan-400/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/5 shadow-lg group-hover:border-blue-500/20 transition-all duration-500">
                <div className="text-lg font-bold text-white">98%</div>
                <div className="text-white/60 text-xs">Client Satisfaction</div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden">
              {/* Purple glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-400/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/5 shadow-lg group-hover:border-purple-500/20 transition-all duration-500">
                <div className="text-lg font-bold text-white">$2.4B+</div>
                <div className="text-white/60 text-xs">Assets Managed</div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden">
              {/* Green glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 to-teal-400/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/5 shadow-lg group-hover:border-emerald-500/20 transition-all duration-500">
                <div className="text-lg font-bold text-white">15+ Years</div>
                <div className="text-white/60 text-xs">Industry Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
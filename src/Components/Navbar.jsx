import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Set active item based on current path
    const path = window.location.pathname.substring(1);
    setActiveItem(path || 'dashboard');
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ["Dashboard", "Exchange", "Crypto", "Trade", "Market", "InvestHub"];

  return (
    <nav className={`
      fixed w-full z-50 transition-all duration-300
      ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg py-2' : 'bg-gray-900 py-4'}
    `}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 lg:px-6">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 py-2 px-4 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(70,70,70,0.1)] border-t border-l border-gray-700">
            <a href="/">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                WealthGrow
              </span>
            </a>
          </div>
          
          {/* Mobile menu button would go here */}
          <button className="md:hidden text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-wrap justify-center md:justify-end space-x-3 md:space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`/${item.toLowerCase()}`}
                onClick={() => setActiveItem(item.toLowerCase())}
                className={`
                  relative py-2 px-3 lg:px-4 rounded-lg transition-all duration-300 flex items-center justify-center
                  ${activeItem === item.toLowerCase() 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-cyan-400 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.35),inset_-2px_-2px_5px_rgba(80,80,80,0.05)]' 
                    : 'bg-gray-800/80 text-gray-300 shadow-[3px_3px_6px_rgba(0,0,0,0.25),-2px_-2px_5px_rgba(70,70,70,0.05)]'}
                  hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-2px_-2px_5px_rgba(70,70,70,0.05)]
                  overflow-hidden group border border-gray-800 hover:border-cyan-900/50
                `}
              >
                <span className={`
                  relative z-10 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] 
                  transition-colors duration-300 text-sm lg:text-base
                `}>
                  {item}
                </span>
                
                {activeItem === item.toLowerCase() && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                )}
                
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
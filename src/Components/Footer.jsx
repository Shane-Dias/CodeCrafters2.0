import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Products",
      links: [
        { name: "Trading", href: "/trading" },
        { name: "Investments", href: "/investments" },
        { name: "API", href: "/api" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Market News", href: "/news" },
        { name: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: "Twitter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      ),
      href: "https://twitter.com"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
      href: "https://linkedin.com"
    },
    {
      name: "GitHub",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      href: "https://github.com"
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-200 mt-auto pt-8 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {/* Logo and description */}
          <div className="col-span-2">
            <div className="mb-3">
              <div className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 py-1.5 px-3 rounded-lg shadow-[3px_3px_10px_rgba(0,0,0,0.4),-3px_-3px_10px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">
                  InvestPortal
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-4">
              Your premier destination for cryptocurrency investments, market analysis, and trading solutions.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 bg-gray-800 p-1.5 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.25),-1px_-1px_3px_rgba(70,70,70,0.05)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.25),inset_-1px_-1px_3px_rgba(70,70,70,0.05)] border border-gray-800 hover:border-cyan-900/50"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-semibold mb-3 text-gray-100">{section.title}</h3>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs flex items-center"
                    >
                      <span className="mr-1.5 text-xs">&#9670;</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter - Compact version */}
        <div className="mt-6 py-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-sm font-semibold mb-1">Stay updated</h3>
              <p className="text-gray-400 text-xs">Get the latest news from InvestPortal</p>
            </div>
            <div className="flex w-full sm:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="py-1.5 px-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-cyan-500 text-gray-200 text-sm w-full sm:w-48"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-1.5 px-3 text-sm rounded-r-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright - More compact */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-3 sm:mb-0">
            &copy; {currentYear} InvestPortal. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs">
              Privacy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs">
              Terms
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
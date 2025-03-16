import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, TrendingUp } from 'lucide-react';

const investors = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/api/placeholder/80/80",
    monthlyProfit: 20.4,
    followers: 1247,
    risk: "Moderate",
    bio: "Experienced investor specializing in Tech and Energy sectors.",
    portfolioHighlights: ["Tech", "Energy", "ETFs"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/api/placeholder/80/80",
    monthlyProfit: 18.7,
    followers: 863,
    risk: "Low",
    bio: "Focused on stable investments like Dividend Stocks and Bonds.",
    portfolioHighlights: ["Dividend Stocks", "REITs", "Bonds"],
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    avatar: "/api/placeholder/80/80",
    monthlyProfit: 25.2,
    followers: 2134,
    risk: "High",
    bio: "Aggressive trader in Crypto and Growth Stocks.",
    portfolioHighlights: ["Crypto", "Growth Stocks", "Options"],
  },
  {
    id: 4,
    name: "Priya Patel",
    avatar: "/api/placeholder/80/80",
    monthlyProfit: 15.6,
    followers: 792,
    risk: "Moderate",
    bio: "Investing in Blue Chips and Foreign Markets for stability.",
    portfolioHighlights: ["Index Funds", "Blue Chips", "Foreign Markets"],
  },
  {
    id: 5,
    name: "Michael Johnson",
    avatar: "/api/placeholder/40/40",
    monthlyProfit: 22.8,
    followers: 1853,
    risk: "High",
    isFollowing: false,
    portfolioHighlights: ["Biotech", "AI Stocks", "Emerging Markets"]
  },
  {
    id: 6,
    name: "Emma Wilson",
    avatar: "/api/placeholder/40/40",
    monthlyProfit: 16.9,
    followers: 641,
    risk: "Low",
    isFollowing: false,
    portfolioHighlights: ["Value Stocks", "Consumer Staples", "Defense"]
  },
  {
    id: 7,
    name: "Raj Mehta",
    avatar: "/api/placeholder/40/40",
    monthlyProfit: 19.3,
    followers: 1102,
    risk: "Moderate",
    isFollowing: true,
    portfolioHighlights: ["Renewable Energy", "EV Stocks", "Utilities"]
  },
  {
    id: 8,
    name: "Sophia Garcia",
    avatar: "/api/placeholder/40/40",
    monthlyProfit: 24.7,
    followers: 1932,
    risk: "High",
    isFollowing: false,
    portfolioHighlights: ["NFTs", "Web3", "Metaverse"]
  },
  {
    id: 9,
    name: "David Kim",
    avatar: "/api/placeholder/40/40",
    monthlyProfit: 17.2,
    followers: 876,
    risk: "Moderate",
    isFollowing: false,
    portfolioHighlights: ["Healthcare", "Pharmaceuticals", "Medical Devices"]
  }
];

const InvestorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const investor = investors.find((inv) => inv.id === parseInt(id));

  if (!investor) {
    return <div className="text-center text-red-500">Investor not found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black pt-12 pb-12">
    <div className="bg-gray-900 bg-opacity-80 text-gray-100 p-8 rounded-xl shadow-lg w-full max-w-xl backdrop-blur-sm border border-cyan-900 border-opacity-30 hover:shadow-cyan-500/10 transition-all">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </button>
        
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
          Follow
        </button>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full border-2 border-cyan-400 overflow-hidden bg-gradient-to-br from-cyan-500/30 to-purple-500/30 shadow-lg shadow-cyan-900/20 hover:border-cyan-300 transition-all">
          <img src="/api/placeholder/96/96" alt={investor.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-3xl font-bold text-cyan-400 mt-5">{investor.name}</h2>
        <p className="text-gray-300 mt-3 max-w-md">{investor.bio}</p>
        
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="flex items-center text-sm text-gray-300">
            <UserCheck className="h-4 w-4 mr-1 text-cyan-400" /> 
            {investor.followers.toLocaleString()} followers
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="text-sm text-gray-300">Member since 2022</div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all">
          <div className="text-sm text-gray-400">Monthly Profit</div>
          <div className="text-xl font-bold text-cyan-400 flex items-center mt-1">
            <TrendingUp className="h-5 w-5 mr-1" />
            {investor.monthlyProfit}%
          </div>
        </div>
        
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all">
          <div className="text-sm text-gray-400">Risk Level</div>
          <div className="text-xl font-bold text-cyan-400 flex items-center mt-1">
            {investor.risk === "High" && <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>}
            {investor.risk === "Moderate" && <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>}
            {investor.risk === "Low" && <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>}
            {investor.risk}
          </div>
        </div>
      </div>
      
      {/* Performance Chart Placeholder */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Performance</h3>
        <div className="bg-gray-800 bg-opacity-50 rounded-lg h-32 overflow-hidden flex items-end p-2">
          {/* Mimicking chart bars */}
          <div className="flex-1 h-20 bg-cyan-500/30 mx-1 rounded-t-sm"></div>
          <div className="flex-1 h-14 bg-cyan-500/30 mx-1 rounded-t-sm"></div>
          <div className="flex-1 h-24 bg-cyan-500/30 mx-1 rounded-t-sm"></div>
          <div className="flex-1 h-16 bg-cyan-500/30 mx-1 rounded-t-sm"></div>
          <div className="flex-1 h-22 bg-cyan-500/30 mx-1 rounded-t-sm"></div>
          <div className="flex-1 h-28 bg-cyan-600/60 mx-1 rounded-t-sm"></div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Portfolio Highlights</h3>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {investor.portfolioHighlights.map((item, idx) => {
            const colors = [
              {bg: "bg-cyan-800", text: "text-cyan-300"},
              {bg: "bg-purple-800", text: "text-purple-300"},
              {bg: "bg-blue-800", text: "text-blue-300"}
            ];
            const color = colors[idx % colors.length];
            
            return (
              <span key={idx} 
                className={`${color.bg} ${color.text} bg-opacity-50 px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-70 cursor-pointer transition-all`}>
                {item}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Action Section */}
      <div className="mt-8 flex gap-4">
        <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md transition-colors flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Message
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition-colors flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
            <span className="text-cyan-400">Bought</span> 50 shares of TSLA at $180.45
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
            <span className="text-cyan-400">Updated</span> portfolio strategy for Q1 2025
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
            <span className="text-cyan-400">Sold</span> 200 shares of NVDA at $950.20
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default InvestorProfile;

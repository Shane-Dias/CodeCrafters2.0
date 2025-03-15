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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black pt-20">
  <div className="bg-gray-900 bg-opacity-80 text-gray-100 p-8 rounded-xl shadow-lg w-full max-w-lg backdrop-blur-sm border border-cyan-900 border-opacity-30">
    <button onClick={() => navigate(-1)} className="flex items-center text-cyan-400 hover:text-cyan-300 mb-4">
      <ArrowLeft className="h-5 w-5 mr-2" /> Back
    </button>
    
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full border-2 border-cyan-400 overflow-hidden bg-gradient-to-br from-cyan-500/30 to-purple-500/30">
        <img src="/api/placeholder/96/96" alt={investor.name} className="w-full h-full object-cover" />
      </div>
      <h2 className="text-2xl font-bold text-cyan-400 mt-4">{investor.name}</h2>
      <p className="text-gray-400 text-sm mt-2">{investor.bio}</p>
      <div className="flex items-center text-sm text-gray-400 mt-2">
        <UserCheck className="h-4 w-4 mr-1 text-cyan-400" /> {investor.followers.toLocaleString()} followers
      </div>
    </div>
    
    <div className="mt-6 border-t border-gray-700 pt-4">
      <h3 className="text-lg font-semibold text-cyan-300">Investment Stats</h3>
      <div className="flex justify-between mt-2 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-cyan-400" /> {investor.monthlyProfit}% profit (Last Month)
        </span>
        <span>Risk: {investor.risk}</span>
      </div>
    </div>
    
    <div className="mt-6 border-t border-gray-700 pt-4">
      <h3 className="text-lg font-semibold text-cyan-300">Portfolio Highlights</h3>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {investor.portfolioHighlights.map((item, idx) => {
          // Rotate between different color schemes for tags
          const colors = [
            {bg: "bg-cyan-800", text: "text-cyan-300"},
            {bg: "bg-purple-800", text: "text-purple-300"},
            {bg: "bg-blue-800", text: "text-blue-300"},
            {bg: "bg-green-800", text: "text-green-300"},
            {bg: "bg-pink-800", text: "text-pink-300"}
          ];
          const color = colors[idx % colors.length];
          
          return (
            <span key={idx} className={`${color.bg} ${color.text} bg-opacity-50 px-3 py-1 rounded-lg text-xs`}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  </div>
</div>
  );
};

export default InvestorProfile;

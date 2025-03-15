import React, { useState } from 'react';
import { Shield, Info, Star, UserCheck, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopInvestorsSection = () => {
  // Initial investor data with isFollowing property
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: "Alex Morgan",
      avatar: "/api/placeholder/30/30",
      followers: 24853,
      monthlyProfit: 32.4,
      risk: "Medium",
      portfolioHighlights: ["Bitcoin", "Ethereum", "Tech Stocks"],
      isFollowing: false
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "/api/placeholder/30/30",
      followers: 18392,
      monthlyProfit: 28.7,
      risk: "Low",
      portfolioHighlights: ["Blue Chips", "Commodities", "ETFs"],
      isFollowing: false
    },
    {
      id: 3,
      name: "Michael Wilson",
      avatar: "/api/placeholder/30/30",
      followers: 12485,
      monthlyProfit: 19.2,
      risk: "High",
      portfolioHighlights: ["Small Cap", "NFTs", "DeFi"],
      isFollowing: false
    },
    {
      id: 4,
      name: "Alex Morgan",
      avatar: "/api/placeholder/30/30",
      followers: 24853,
      monthlyProfit: 32.4,
      risk: "Medium",
      portfolioHighlights: ["Bitcoin", "Ethereum", "Tech Stocks"],
      isFollowing: false
    },
    {
      id: 5,
      name: "Sarah Chen",
      avatar: "/api/placeholder/30/30",
      followers: 18392,
      monthlyProfit: 28.7,
      risk: "Low",
      portfolioHighlights: ["Blue Chips", "Commodities", "ETFs"],
      isFollowing: false
    },
    {
      id: 6,
      name: "Michael Wilson",
      avatar: "/api/placeholder/30/30",
      followers: 12485,
      monthlyProfit: 19.2,
      risk: "High",
      portfolioHighlights: ["Small Cap", "NFTs", "DeFi"],
      isFollowing: false
    },
    {
      id: 7,
      name: "Alex Morgan",
      avatar: "/api/placeholder/30/30",
      followers: 24853,
      monthlyProfit: 32.4,
      risk: "Medium",
      portfolioHighlights: ["Bitcoin", "Ethereum", "Tech Stocks"],
      isFollowing: false
    },
    {
      id: 8,
      name: "Sarah Chen",
      avatar: "/api/placeholder/30/30",
      followers: 18392,
      monthlyProfit: 28.7,
      risk: "Low",
      portfolioHighlights: ["Blue Chips", "Commodities", "ETFs"],
      isFollowing: false
    },
    {
      id: 9,
      name: "Michael Wilson",
      avatar: "/api/placeholder/30/30",
      followers: 12485,
      monthlyProfit: 19.2,
      risk: "High",
      portfolioHighlights: ["Small Cap", "NFTs", "DeFi"],
      isFollowing: false
    }
  ]);

  // Function to toggle follow status
  const toggleFollow = (investorId) => {
    setInvestors(prevInvestors => 
      prevInvestors.map(investor => 
        investor.id === investorId 
          ? { 
              ...investor, 
              isFollowing: !investor.isFollowing,
              // Increment or decrement follower count based on follow status
              followers: investor.isFollowing 
                ? investor.followers - 1 
                : investor.followers + 1
            } 
          : investor
      )
    );
  };

 const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl shadow-lg mx-auto pt-24" style={{
      backgroundImage: 'radial-gradient(circle at top right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
      boxShadow: '0 0 25px rgba(79, 70, 229, 0.4)'
    }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Shield className="h-8 w-8 mr-3 text-indigo-400" />
          <div>
            <h2 className="text-3xl font-bold text-indigo-400 mb-2" style={{ textShadow: '0 0 10px rgba(79, 70, 229, 0.6)' }}>
              Top Performing Investors
            </h2>
            <p className="text-gray-400">Follow and copy trade from leading investors on our platform</p>
          </div>
        </div>
        <button className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
          <Info className="h-4 w-4 mr-1" />
          <span className="text-sm">How it works</span>
        </button>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {investors.map((investor, index) => {
          // Alternate between different colored cards
          const cardThemes = [
            {
              bg: "bg-gray-800",
              highlight: "text-indigo-400",
              border: "border-indigo-500",
              glow: "shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            },
            {
              bg: "bg-gray-800",
              highlight: "text-cyan-400",
              border: "border-cyan-500",
              glow: "shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            },
            {
              bg: "bg-gray-800",
              highlight: "text-violet-400",
              border: "border-violet-500",
              glow: "shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
            }
          ];
          
          const cardTheme = cardThemes[index % cardThemes.length];
          const buttonColor = index % cardThemes.length === 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 
                             index % cardThemes.length === 1 ? 'bg-cyan-600 hover:bg-cyan-700' : 
                             'bg-violet-600 hover:bg-violet-700';
          
          return (
            <div 
              key={investor.id} 
              className={`${cardTheme.bg} rounded-xl p-4 transition-all duration-300 border-2 ${cardTheme.border} backdrop-blur-sm ${cardTheme.glow}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full p-0.5 bg-gray-700 border border-gray-600">
                    <img src={investor.avatar} alt={investor.name} className="w-10 h-10 rounded-full" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-base flex items-center gap-1 ${cardTheme.highlight}`}>
                      {investor.name}
                      {investor.monthlyProfit > 20 && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                    </h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <UserCheck className="h-3 w-3 mr-1" />
                      <span>{investor.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-emerald-400 font-bold text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {investor.monthlyProfit}% profit
                  </div>
                  <div className="text-xs text-gray-400">{investor.risk} risk</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Portfolio:</span>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {investor.portfolioHighlights.map((item, idx) => (
                      <span 
                        key={idx} 
                        className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap bg-gray-700 ${cardTheme.highlight}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    className="text-xs px-3 py-1.5 rounded-lg text-gray-300 transition-all duration-200 bg-gray-700 hover:bg-gray-600 shadow-md flex-1"
                    onClick={() => navigate(`/view/${investor.id}`)}
                  >
                    View
                  </button>
                  <button 
                    className={`text-xs px-3 py-1.5 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md flex-1 ${
                      investor.isFollowing 
                        ? `${cardTheme.highlight} bg-gray-700 border border-gray-600` 
                        : `text-white ${buttonColor}`
                    }`}
                    onClick={() => toggleFollow(investor.id)}
                  >
                    {investor.isFollowing ? 'Following' : 'Follow & Copy'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopInvestorsSection;
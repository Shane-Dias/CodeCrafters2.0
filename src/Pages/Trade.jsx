import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Search, RefreshCw } from 'lucide-react';

const TradingDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('crypto');

  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      // Mock API data - would be replaced with actual API calls
      setTimeout(() => {
        const mockData = {
          crypto: [
            { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 58743.21, change: 2.4 },
            { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3291.45, change: -1.2 },
            { id: 'sol', name: 'Solana', symbol: 'SOL', price: 148.76, change: 5.6 },
            { id: 'bnb', name: 'Binance Coin', symbol: 'BNB', price: 576.23, change: 3.1 },
            { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.58, change: -0.3 },
            { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.82, change: 1.1 },
            { id: 'xrp', name: 'Ripple', symbol: 'XRP', price: 0.57, change: -2.4 },
            { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.14, change: 8.5 },
            { id: 'avax', name: 'Avalanche', symbol: 'AVAX', price: 35.67, change: 4.2 },
            { id: 'link', name: 'Chainlink', symbol: 'LINK', price: 17.89, change: 3.7 }
          ],
          bonds: [
            { id: 'us10y', name: 'US 10Y Treasury', symbol: 'US10Y', price: 98.75, change: -0.2, yield: 4.25 },
            { id: 'us30y', name: 'US 30Y Treasury', symbol: 'US30Y', price: 94.38, change: -0.4, yield: 4.45 },
            { id: 'de10y', name: 'German 10Y Bund', symbol: 'DE10Y', price: 97.85, change: 0.1, yield: 2.35 },
            { id: 'uk10y', name: 'UK 10Y Gilt', symbol: 'UK10Y', price: 96.42, change: -0.3, yield: 3.95 },
            { id: 'jp10y', name: 'Japan 10Y Bond', symbol: 'JP10Y', price: 99.85, change: 0.05, yield: 0.85 },
            { id: 'us2y', name: 'US 2Y Treasury', symbol: 'US2Y', price: 99.42, change: -0.15, yield: 3.85 }
          ],
          commodities: [
            { id: 'gold', name: 'Gold', symbol: 'XAU', price: 2342.78, change: 0.7 },
            { id: 'silver', name: 'Silver', symbol: 'XAG', price: 31.45, change: 1.2 },
            { id: 'oil', name: 'Crude Oil', symbol: 'WTI', price: 76.34, change: -2.3 },
            { id: 'natgas', name: 'Natural Gas', symbol: 'NG', price: 2.12, change: -0.8 },
            { id: 'copper', name: 'Copper', symbol: 'HG', price: 4.25, change: 1.5 },
            { id: 'platinum', name: 'Platinum', symbol: 'PL', price: 938.67, change: -0.5 },
            { id: 'wheat', name: 'Wheat', symbol: 'ZW', price: 624.75, change: 2.1 },
            { id: 'corn', name: 'Corn', symbol: 'ZC', price: 459.25, change: 0.8 }
          ]
        };
        
        setAssets(mockData[category]);
        if (mockData[category].length > 0) {
          setCurrentAsset(mockData[category][0]);
          generateChartData(mockData[category][0].id);
        }
        setIsLoading(false);
      }, 500);
    };
    
    fetchAssets();
  }, [category]);
  
  const generateChartData = (assetId) => {
    // Generate mock historical data
    const basePrice = assets.find(a => a.id === assetId)?.price || 100;
    const volatility = category === 'crypto' ? 0.05 : 0.02;
    
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = 14; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const change = (Math.random() - 0.5) * volatility * currentPrice;
      currentPrice += change;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: parseFloat(currentPrice.toFixed(2))
      });
    }
    
    setChartData(data);
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 pt-24">
    {/* Header */}
    <div className="bg-gray-800 shadow-lg shadow-indigo-500/30 border-b-2 border-indigo-500/50 p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <LineChart size={28} className="text-indigo-400" />
          <h1 className="text-xl font-bold text-gray-100">Trading Dashboard</h1>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Search assets..."
            className="px-3 py-1 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="ml-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center shadow-lg shadow-indigo-500/50"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                if (currentAsset) generateChartData(currentAsset.id);
                setIsLoading(false);
              }, 300);
            }}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      
      {/* Category tabs */}
      <div className="flex space-x-2 mt-2">
        {['crypto', 'bonds', 'commodities'].map(cat => (
          <button 
            key={cat}
            className={`px-3 py-1 rounded-md ${category === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-gray-700'}`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
    
    <div className="flex flex-1 overflow-hidden">
      {/* Asset list */}
      <div className="w-64 bg-gray-800 shadow-lg shadow-indigo-500/30 border-r-2 border-indigo-500/50 overflow-y-auto scroll-container">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <RefreshCw className="animate-spin h-6 w-6 text-indigo-400" />
          </div>
        ) : (
          <ul className="p-2">
            {filteredAssets.map(asset => (
              <li 
                key={asset.id}
                className={`p-2 mb-1 rounded-md cursor-pointer ${currentAsset?.id === asset.id ? 'bg-indigo-900 border-l-4 border-indigo-500' : 'hover:bg-gray-700'}`}
                onClick={() => {
                  setCurrentAsset(asset);
                  generateChartData(asset.id);
                }}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium text-gray-100">{asset.symbol}</div>
                    <div className="text-sm text-gray-400">{asset.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-100">${asset.price.toLocaleString()}</div>
                    <div className={`flex items-center text-sm ${asset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? 
                        <TrendingUp size={12} className="mr-1" /> : 
                        <TrendingDown size={12} className="mr-1" />
                      }
                      {asset.change}%
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-4 overflow-y-auto scroll-container">
        {currentAsset && (
          <>
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-indigo-500/30 border-2 border-indigo-500/50 p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-100">{currentAsset.name} ({currentAsset.symbol})</h2>
                  {category === 'bonds' && (
                    <div className="text-sm text-indigo-400">Yield: {currentAsset.yield}%</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-100">${currentAsset.price.toLocaleString()}</div>
                  <div className={`flex items-center justify-end ${currentAsset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentAsset.change >= 0 ? 
                      <TrendingUp className="mr-1" /> : 
                      <TrendingDown className="mr-1" />
                    }
                    {currentAsset.change}%
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price chart */}
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-cyan-500/30 border-2 border-cyan-500/50 p-4 h-64">
              <h3 className="text-lg font-medium mb-2 text-gray-100">Price History</h3>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <RefreshCw className="animate-spin h-6 w-6 text-indigo-400" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="85%">
                  <LineChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis domain={['auto', 'auto']} stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }} />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                      fill="url(#colorPrice)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            
            {/* Trading interface */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800 rounded-xl shadow-lg shadow-emerald-500/30 border-2 border-emerald-500/50 p-4">
                <h3 className="font-medium text-gray-100">Buy {currentAsset.symbol}</h3>
                <div className="mt-2">
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Amount"
                  />
                  <button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded shadow-lg shadow-emerald-500/50 transition-all">
                    Buy
                  </button>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl shadow-lg shadow-red-500/30 border-2 border-red-500/50 p-4">
                <h3 className="font-medium text-gray-100">Sell {currentAsset.symbol}</h3>
                <div className="mt-2">
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Amount"
                  />
                  <button className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded shadow-lg shadow-red-500/50 transition-all">
                    Sell
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
  );
};

export default TradingDashboard;
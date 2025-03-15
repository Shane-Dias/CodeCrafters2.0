import React, { useState, useEffect } from 'react';
import { TrendingUp, Briefcase, Filter, Search, Star, BarChart2 } from 'lucide-react';

const AssetsMarketplace = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [assetType, setAssetType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  
  // Mock data initialization
  useEffect(() => {
    const mockAssets = [
      { id: 1, name: 'Apple Inc.', symbol: 'AAPL', type: 'Stock', price: 178.42, change: 2.35, changePercent: 1.33 },
      { id: 2, name: 'Microsoft', symbol: 'MSFT', type: 'Stock', price: 332.18, change: 3.21, changePercent: 0.98 },
      { id: 3, name: 'Bitcoin', symbol: 'BTC', type: 'Crypto', price: 42876.13, change: -1087.22, changePercent: -2.47 },
      { id: 4, name: 'Ethereum', symbol: 'ETH', type: 'Crypto', price: 2283.64, change: -32.18, changePercent: -1.39 },
      { id: 5, name: 'Tesla Inc.', symbol: 'TSLA', type: 'Stock', price: 245.30, change: 5.62, changePercent: 2.35 },
      { id: 6, name: 'Gold', symbol: 'GLD', type: 'Commodity', price: 2391.45, change: 12.56, changePercent: 0.53 },
    ];
    setAssets(mockAssets);
    setFilteredAssets(mockAssets);
  }, []);

  // Filter and sort assets
  useEffect(() => {
    let result = [...assets];
    if (assetType !== 'All') result = result.filter(asset => asset.type === assetType);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(asset => asset.name.toLowerCase().includes(query) || asset.symbol.toLowerCase().includes(query));
    }
    
    // Sort logic
    if (sortBy === 'priceAsc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceDesc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'gainers') result.sort((a, b) => b.changePercent - a.changePercent);
    else if (sortBy === 'losers') result.sort((a, b) => a.changePercent - b.changePercent);
    else result.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)); // trending
    
    setFilteredAssets(result);
  }, [assets, assetType, searchQuery, sortBy]);

  const toggleWatchlist = (id) => {
    setWatchlist(watchlist.includes(id) 
      ? watchlist.filter(item => item !== id) 
      : [...watchlist, id]);
  };

  // Utility functions
  const getChangeColor = (change) => change > 0 ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-gray-400';
  const getAssetTypeBorder = (type) => {
    const borders = {
      'Stock': 'border-blue-700',
      'Crypto': 'border-purple-700',
      'ETF': 'border-green-700',
      'Commodity': 'border-yellow-700'
    };
    return borders[type] || 'border-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      <div className="p-8 pb-24">
        <h1 className="mb-10 text-xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600 [text-shadow:_0_0_30px_rgb(6_182_212_/_45%)] md:text-center">
          Assets Marketplace
        </h1>

        {/* Summary Cards */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 justify-center">
          <div className="bg-white/5 p-6 rounded-2xl border-[4px] border-blue-700 shadow-lg flex items-center justify-between group w-64 md:w-80 hover:scale-105 transition-all">
            <div>
              <h3 className="text-gray-400 font-medium mb-1">Available Assets</h3>
              <p className="text-3xl font-bold text-white">{assets.length}</p>
            </div>
            <Briefcase className="text-blue-400 w-12 h-12 group-hover:scale-110 transition-transform" />
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border-[4px] border-green-700 shadow-lg flex items-center justify-between group w-64 md:w-80 hover:scale-105 transition-all">
            <div>
              <h3 className="text-gray-400 font-medium mb-1">Market Trend</h3>
              <p className="text-3xl font-bold text-white">+1.2%</p>
            </div>
            <TrendingUp className="text-emerald-400 w-12 h-12 group-hover:scale-110 transition-transform" />
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border-[4px] border-yellow-700 shadow-lg flex items-center justify-between group w-64 md:w-80 hover:scale-105 transition-all">
            <div>
              <h3 className="text-gray-400 font-medium mb-1">Your Watchlist</h3>
              <p className="text-3xl font-bold text-white">{watchlist.length}</p>
            </div>
            <Star className="text-yellow-400 w-12 h-12 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 py-3 w-full bg-white/5 border border-blue-800/50 rounded-lg text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 w-full md:w-2/3 justify-end">
            <select
              className="px-4 py-3 bg-white/5 border border-blue-800/50 rounded-lg text-white"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value="All">All Asset Types</option>
              <option value="Stock">Stocks</option>
              <option value="Crypto">Cryptocurrencies</option>
              <option value="ETF">ETFs</option>
              <option value="Commodity">Commodities</option>
            </select>
            
            <select
              className="px-4 py-3 bg-white/5 border border-blue-800/50 rounded-lg text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="trending">Most Volatile</option>
              <option value="gainers">Top Gainers</option>
              <option value="losers">Top Losers</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
            
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2">
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className={`p-6 rounded-2xl bg-transparent border-[4px] ${getAssetTypeBorder(asset.type)} shadow-lg hover:scale-105 transition-all`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 rounded-full font-bold text-white bg-blue-800 bg-opacity-20">
                  {asset.type}
                </span>
                <Star 
                  className={`w-6 h-6 cursor-pointer ${watchlist.includes(asset.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                  onClick={() => toggleWatchlist(asset.id)}
                />
              </div>
              
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                <p className="text-white font-bold">{asset.symbol}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-white">${asset.price.toLocaleString()}</p>
                <div className={`flex items-center ${getChangeColor(asset.change)}`}>
                  {asset.changePercent > 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg w-full transition-all">
                  Buy
                </button>
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg w-full transition-all">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsMarketplace;
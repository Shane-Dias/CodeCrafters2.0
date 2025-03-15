import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Briefcase,
  Filter,
  Search,
  Star,
  BarChart2,
} from "lucide-react";
import StockDetails from "../Components/StockDetails";

const AssetsMarketplace = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [assetType, setAssetType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const [viewMode, setViewMode] = useState("card"); // Added from StockDetails

  // Mock API Key - In production, use environment variables
  const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || "demo_key";

  // Stock symbols to fetch (moved from StockDetails)
  const SYMBOLS = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "TSLA",
    "RELIANCE",
    "TCS",
    "INFY",
    "HDFCBANK",
  ];

  // Company name mapping (moved from StockDetails)
  const COMPANY_NAMES = {
    AAPL: "Apple Inc.",
    GOOGL: "Alphabet Inc.",
    MSFT: "Microsoft Corp.",
    AMZN: "Amazon.com Inc.",
    TSLA: "Tesla Inc.",
    RELIANCE: "Reliance Industries Ltd.",
    TCS: "Tata Consultancy Services Ltd.",
    INFY: "Infosys Ltd.",
    HDFCBANK: "HDFC Bank Ltd.",
  };

  // Fetch stock data (initial load)
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockData = await Promise.all(
          SYMBOLS.map(async (symbol) => {
            const response = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${symbol}`);
            }
            const data = await response.json();
            return {
              symbol,
              companyName: COMPANY_NAMES[symbol] || symbol,
              type: "Stock", // Adding type for filtering
              ...data,
              // Normalize property names to match the expected format in the filter logic
              price: data.c,
              changePercent: data.dp,
            };
          })
        );
        setAssets(stockData);
        setFilteredAssets(stockData);
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    fetchStockData();
  }, []);

  // Filter and sort assets
  useEffect(() => {
    let result = [...assets];
    if (assetType !== "All")
      result = result.filter((asset) => asset.type === assetType);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (asset) =>
          asset.name?.toLowerCase().includes(query) ||
          asset.companyName?.toLowerCase().includes(query) ||
          asset.symbol?.toLowerCase().includes(query)
      );
    }

    // Sort logic
    if (sortBy === "priceAsc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceDesc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "gainers")
      result.sort((a, b) => b.changePercent - a.changePercent);
    else if (sortBy === "losers")
      result.sort((a, b) => a.changePercent - b.changePercent);
    else
      result.sort(
        (a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)
      ); // trending

    setFilteredAssets(result);
  }, [assets, assetType, searchQuery, sortBy]);

  const toggleWatchlist = (id) => {
    setWatchlist(
      watchlist.includes(id)
        ? watchlist.filter((item) => item !== id)
        : [...watchlist, id]
    );
  };

  // Utility functions
  const getChangeColor = (change) =>
    change > 0
      ? "text-emerald-400"
      : change < 0
      ? "text-red-400"
      : "text-gray-400";

  const getAssetTypeBorder = (type) => {
    const borders = {
      Stock: "border-blue-700",
      Crypto: "border-purple-700",
      ETF: "border-green-700",
      Commodity: "border-yellow-700",
    };
    return borders[type] || "border-gray-700";
  };

  // Add sorting handler from StockDetails
  const requestSort = (key) => {
    // Map the keys to the expected sortBy values
    const keyToSortMap = {
      c: sortBy === "priceDesc" ? "priceAsc" : "priceDesc",
      dp: sortBy === "gainers" ? "losers" : "gainers",
    };

    setSortBy(keyToSortMap[key] || "trending");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-14">
      <div className="p-8 pb-24">
        <h1 className="mb-10 text-xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600 [text-shadow:_0_0_30px_rgb(6_182_212_/_45%)] md:text-center">
          Assets Marketplace
        </h1>

        {/* Summary Cards */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 justify-center">
          <div className="bg-white/5 p-6 rounded-2xl border-[4px] border-blue-700 shadow-lg flex items-center justify-between group w-64 md:w-80 hover:scale-105 transition-all">
            <div>
              <h3 className="text-gray-400 font-medium mb-1">
                Available Assets
              </h3>
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
              <p className="text-3xl font-bold text-white">
                {watchlist.length}
              </p>
            </div>
            <Star className="text-yellow-400 w-12 h-12 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Adding search/filter controls from original AssetsMarketplace */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Stock">Stocks</option>
              <option value="Crypto">Crypto</option>
              <option value="ETF">ETFs</option>
              <option value="Commodity">Commodities</option>
            </select>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 pl-10 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none cursor-pointer"
              >
                <option value="trending">Trending</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="gainers">Top Gainers</option>
                <option value="losers">Top Losers</option>
              </select>
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* View mode toggle from StockDetails */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Stock Details
          </h2>

          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode("card")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "card"
                  ? "bg-gray-700 text-cyan-400 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] border-t border-l border-gray-600 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]"
                  : "bg-gray-800 text-gray-400 shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)]"
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "table"
                  ? "bg-gray-700 text-cyan-400 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] border-t border-l border-gray-600 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]"
                  : "bg-gray-800 text-gray-400 shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)]"
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Pass the relevant props to StockDetails */}
        <StockDetails
          stocks={filteredAssets}
          viewMode={viewMode}
          requestSort={requestSort}
          watchlist={watchlist}
          toggleWatchlist={toggleWatchlist}
        />
      </div>
    </div>
  );
};

export default AssetsMarketplace;
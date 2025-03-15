import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

// Stock Exchange Panel Component
const StockExchangePanel = ({ title, stocks, loading }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
    <div className="bg-gray-900 text-gray-100 p-4 border-b border-gray-700">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="overflow-x-auto scroll-container">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price (₹)</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Change (%)</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-300">
                Loading stock data...
              </td>
            </tr>
          ) : stocks.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-300">
                No stock data available
              </td>
            </tr>
          ) : (
            stocks.map(stock => (
              <tr key={stock.symbol} className="hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-300">
                  {stock.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {stock.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 text-right">
                  ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                  stock.change > 0 ? 'text-emerald-400' : stock.change < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  <div className="flex items-center justify-end">
                    {stock.change > 0 ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : stock.change < 0 ? (
                      <TrendingDown size={16} className="mr-1" />
                    ) : null}
                    {stock.change > 0 ? '+' : ''}{stock.change}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                  {stock.volume.toLocaleString('en-IN')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

// Main Dashboard Component
const StockExchangeDashboard = () => {
  const [nseData, setNseData] = useState([]);
  const [bseData, setBseData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [threshold, setThreshold] = useState(2); // Price difference threshold in percentage

  // Fetch data from APIs
  const fetchStockData = async () => {
    setLoading(true);
    try {
      // In a real application, you would use actual API endpoints
      // Using sample data for demonstration
       const API_KEY = 'O6KFG4YKYRHDRF0Q'; 
      // Fetch NSE stock data
const nseResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TCS.NSE&interval=5min&apikey=${API_KEY}`);
const nseData = await nseResponse.json();
console.log("NSE Data:", nseData);

// Fetch BSE stock data
const bseResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=RELIANCE.BSE&interval=5min&apikey=${API_KEY}`);
const bseData = await bseResponse.json();
console.log("BSE Data:", bseData);

      
      // Simulating API response for demonstration
      const sampleStocks = [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.' },
        { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.' },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.' },
        { symbol: 'INFY', name: 'Infosys Ltd.' },
        { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.' },
        { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.' },
        { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.' },
        { symbol: 'ITC', name: 'ITC Ltd.' }
      ];
      
      const mockNseData = sampleStocks.map(stock => ({
        ...stock,
        price: parseFloat((Math.random() * 2000 + 500).toFixed(2)), 
        change: parseFloat((Math.random() * 8 - 4).toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000
      }));
      
      const mockBseData = mockNseData.map(stock => {
        // Creating some variance between NSE and BSE prices
        const priceVariance = stock.price * (Math.random() * 0.05 - 0.025);
        return {
          ...stock,
          price: parseFloat((stock.price + priceVariance).toFixed(2)),
          change: parseFloat((stock.change + (Math.random() * 0.6 - 0.3)).toFixed(2)),
          volume: Math.floor(stock.volume * (Math.random() * 0.2 + 0.9))
        };
      });
      
      setNseData(mockNseData);
      setBseData(mockBseData);
      setLastUpdated(new Date());
      
      // Check for significant price differences
      detectPriceDifferences(mockNseData, mockBseData, threshold);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      // Add error notification
      setNotifications(prev => [...prev, {
        id: Date.now(),
        message: "Failed to fetch latest stock data",
        type: "error"
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Detect significant price differences between NSE and BSE
  const detectPriceDifferences = (nseStocks, bseStocks, thresholdPercent) => {
    const newNotifications = [];
    
    nseStocks.forEach(nseStock => {
      const bseStock = bseStocks.find(stock => stock.symbol === nseStock.symbol);
      
      if (bseStock) {
        const priceDiff = Math.abs(nseStock.price - bseStock.price);
        const percentDiff = (priceDiff / nseStock.price) * 100;
        
        if (percentDiff > thresholdPercent) {
          newNotifications.push({
            id: Date.now() + Math.random(),
            symbol: nseStock.symbol,
            message: `${nseStock.symbol} has a ${percentDiff.toFixed(2)}% price difference between NSE (₹${nseStock.price}) and BSE (₹${bseStock.price})`,
            type: "alert",
            timestamp: new Date()
          });
        }
      }
    });
    
    if (newNotifications.length > 0) {
      setNotifications(prev => [...newNotifications, ...prev].slice(0, 10)); // Keep last 10 notifications
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStockData();
    
    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(fetchStockData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Handle threshold change
  const handleThresholdChange = (e) => {
    const value = parseFloat(e.target.value);
    setThreshold(value);
    detectPriceDifferences(nseData, bseData, value);
  };

  // Handle manual refresh
  const handleRefresh = () => {
    fetchStockData();
  };

  // Render notifications
  const renderNotifications = () => {
    if (notifications.length === 0) return null;
    
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border border-gray-700 scroll-container">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold flex items-center text-gray-100">
          <AlertTriangle size={18} className="text-amber-400 mr-2" />
          Price Difference Alerts
        </h2>
        <button 
          onClick={() => setNotifications([])}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-150"
        >
          Clear All
        </button>
      </div>
      <div className="max-h-48 overflow-y-auto scroll-container">
        {notifications.length === 0 ? (
          <div className="text-gray-400 text-center py-3">No alerts at this time</div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className="border-l-4 border-amber-500 bg-gray-900 p-3 mb-2 rounded"
            >
              <p className="text-amber-300">{notification.message}</p>
              {notification.timestamp && (
                <p className="text-xs text-gray-400 mt-1">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
    );
  };

  // Render comparison data
  const renderComparisonTable = () => {
    const comparisonData = nseData.map(nseStock => {
      const bseStock = bseData.find(stock => stock.symbol === nseStock.symbol) || {};
      
      const priceDiff = bseStock.price ? 
        (nseStock.price - bseStock.price) : 0;
      
      const percentDiff = bseStock.price ? 
        ((priceDiff / nseStock.price) * 100) : 0;
      
      const isSignificant = Math.abs(percentDiff) > threshold;
      
      return {
        symbol: nseStock.symbol,
        name: nseStock.name,
        nsePrice: nseStock.price,
        bsePrice: bseStock.price || 'N/A',
        priceDiff,
        percentDiff,
        isSignificant
      };
    });
    
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 border border-gray-700">
      <div className="bg-gray-900 text-gray-100 p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">NSE vs BSE Comparison</h2>
      </div>
      <div className="overflow-x-auto scroll-container">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">NSE Price (₹)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">BSE Price (₹)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Difference (₹)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Difference (%)</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-300">
                  Loading comparison data...
                </td>
              </tr>
            ) : comparisonData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-300">
                  No comparison data available
                </td>
              </tr>
            ) : (
              comparisonData.map(item => (
                <tr 
                  key={item.symbol} 
                  className={`hover:bg-gray-700 transition-colors duration-150 ${item.isSignificant ? 'bg-amber-900 bg-opacity-40' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-300">
                    {item.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 text-right">
                    ₹{item.nsePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 text-right">
                    {typeof item.bsePrice === 'number' 
                      ? `₹${item.bsePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                      : item.bsePrice}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                    item.priceDiff > 0 ? 'text-emerald-400' : item.priceDiff < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {typeof item.priceDiff === 'number' 
                      ? `${item.priceDiff > 0 ? '+' : ''}₹${Math.abs(item.priceDiff).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                      : 'N/A'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                    item.percentDiff > 0 ? 'text-emerald-400' : item.percentDiff < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {typeof item.percentDiff === 'number' 
                      ? `${item.percentDiff > 0 ? '+' : ''}${item.percentDiff.toFixed(2)}%` 
                      : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 pt-28">
    <div className="max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Indian Stock Exchange Dashboard</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
          <p className="text-gray-400">
            Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="threshold" className="mr-2 text-sm font-medium text-gray-300">Alert Threshold (%): </label>
              <input
                id="threshold"
                type="number"
                min="0.1"
                max="10"
                step="0.1"
                value={threshold}
                onChange={handleThresholdChange}
                className="p-1 border border-gray-700 rounded w-16 text-center bg-gray-800 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-150 shadow-lg shadow-indigo-500/30"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      {renderNotifications()}
      
      {/* Stock Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StockExchangePanel 
          title="National Stock Exchange (NSE)" 
          stocks={nseData} 
          loading={loading} 
        />
        <StockExchangePanel 
          title="Bombay Stock Exchange (BSE)" 
          stocks={bseData} 
          loading={loading} 
        />
      </div>
      
      {/* Comparison Table */}
      {renderComparisonTable()}
    </div>
  </div>
  );
};

export default StockExchangeDashboard;
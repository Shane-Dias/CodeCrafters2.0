import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowUp, ArrowDown, RefreshCw, DollarSign, Wallet, TrendingUp, Bell } from 'lucide-react';

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true'
        );
        if (response.ok) {
          const data = await response.json();
          setCryptoData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    const coin = cryptoData.find(c => c.id === selectedCrypto);
    if (!coin || !coin.sparkline_in_7d?.price) return [];
    
    return coin.sparkline_in_7d.price.map((price, i) => ({
      time: i,
      price
    })).filter((_, i) => i % 12 === 0);
  };

  const handlePurchase = () => {
    if (!purchaseAmount) return;
    const coin = cryptoData.find(c => c.id === selectedCrypto);
    if (!coin) return;
    
    const amount = parseFloat(purchaseAmount);
    const coinAmount = amount / coin.current_price;
    
    alert(`Purchase: ${coinAmount.toFixed(8)} ${coin.symbol.toUpperCase()} for $${amount.toFixed(2)}`);
    setPurchaseAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pt-24">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign size={28} className="text-indigo-400" />
          <h1 className="text-2xl font-bold text-gray-100">CryptoWealth</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell size={20} className="text-gray-300" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">2</span>
            </div>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">JD</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-indigo-400" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { 
                title: "Portfolio Value", 
                amount: `$${cryptoData.reduce((sum, coin) => sum + (coin.current_price || 0), 0).toLocaleString()}`, 
                icon: Wallet, 
                glow: "shadow-lg", 
                color: "bg-gray-800", 
                textColor: "text-indigo-400", 
                borderColor: "border-indigo-500" 
              },
              { 
                title: "24h Change", 
                amount: `${cryptoData.reduce((sum, coin) => sum + (coin.price_change_percentage_24h || 0), 0).toFixed(2)}%`, 
                icon: TrendingUp, 
                glow: "shadow-lg", 
                color: "bg-gray-800", 
                textColor: "text-cyan-400", 
                borderColor: "border-cyan-500" 
              },
              { 
                title: "Coins Tracked", 
                amount: cryptoData.length, 
                icon: DollarSign, 
                glow: "shadow-lg", 
                color: "bg-gray-800", 
                textColor: "text-emerald-400", 
                borderColor: "border-emerald-500" 
              }
            ].map((item, index) => (
              <div key={index} className={`${item.color} ${item.glow} rounded-xl border-2 ${item.borderColor} p-4`}>
                <div className="flex flex-col items-center">
                  <item.icon size={28} className={item.textColor} />
                  <h2 className="text-sm font-medium text-gray-400 mt-2">{item.title}</h2>
                  <p className={`text-lg font-bold mt-1 ${item.textColor}`}>{item.amount}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Crypto List */}
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-indigo-500/30 border-2 border-indigo-500/50 p-4">
              <h2 className="font-semibold text-xl text-gray-100 mb-4">Top Cryptocurrencies</h2>
              <ul className="space-y-2">
                {cryptoData.map((coin) => (
                  <li 
                    key={coin.id} 
                    className={`p-3 cursor-pointer flex items-center justify-between rounded-lg ${selectedCrypto === coin.id ? 'bg-gray-700 border-l-4 border-indigo-500' : 'hover:bg-gray-700'}`}
                    onClick={() => setSelectedCrypto(coin.id)}
                  >
                    <div className="flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                      <span className="font-medium">{coin.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${coin.current_price.toLocaleString()}</div>
                      <div className={`text-xs flex items-center ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {coin.price_change_percentage_24h >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chart */}
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-cyan-500/30 border-2 border-cyan-500/50 p-4 lg:col-span-2">
              <h2 className="font-semibold text-xl text-gray-100 mb-4">
                {cryptoData.find(c => c.id === selectedCrypto)?.name || ''} Price Chart
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }} />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Buy Amount (USD)</label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      value={purchaseAmount} 
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      className="flex-1 p-2 rounded-l bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                      placeholder="Enter amount"
                    />
                    <button 
                      onClick={handlePurchase}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-r shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
                    >
                      Buy
                    </button>
                  </div>
                </div>
                {purchaseAmount && (
                  <div className="text-sm mt-2 text-gray-300">
                    You will receive: <span className="text-indigo-400 font-semibold">
                      {(parseFloat(purchaseAmount) / (cryptoData.find(c => c.id === selectedCrypto)?.current_price || 1)).toFixed(6)} {cryptoData.find(c => c.id === selectedCrypto)?.symbol.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoDashboard;
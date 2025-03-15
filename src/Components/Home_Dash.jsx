import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

const Dashboard = () => {
  const [stockPrice, setStockPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${API_KEY}`
        );
        const data = await response.json();
        setStockPrice(data.c); // 'c' = current price
        setPriceChange(data.dp); // 'dp' = percent change
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStockPrice();
  }, []);

  return (
    <section className="py-24 bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
          Your Portfolio Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Apple Stock Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.35),-5px_-5px_15px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 hover:translate-y-[-5px] transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gray-700 mr-3 flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(70,70,70,0.1)]">
                  <span className="text-cyan-400 font-bold">A</span>
                </div>
                <h3 className="text-xl font-semibold">Apple Inc.</h3>
              </div>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(70,70,70,0.1)]">
                AAPL
              </span>
            </div>

            {loading ? (
              <div className="h-16 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                    ${stockPrice?.toFixed(2) || "—"}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      priceChange >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {priceChange >= 0 ? "+" : ""}
                    {priceChange?.toFixed(2) || 0}%
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Today's Volume</span>
                    <span className="text-gray-200">12.4M</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Market Cap</span>
                    <span className="text-gray-200">$2.45T</span>
                  </div>
                </div>
              </>
            )}

            <button className="w-full mt-4 py-3 rounded-lg bg-gray-700 text-cyan-400 font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30 hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
              View Details
            </button>
          </div>

          {/* Portfolio Performance Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.35),-5px_-5px_15px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 hover:translate-y-[-5px] transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Portfolio Performance</h3>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(70,70,70,0.1)]">
                30d
              </span>
            </div>

            <div className="h-32 relative mb-4 flex items-end justify-between px-2">
              {/* Simplified chart representation */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-lg"></div>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div
                  key={n}
                  className="relative w-6 bg-cyan-400 rounded-t-sm shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                  style={{
                    height: `${Math.random() * 70 + 20}%`,
                    opacity: 0.7 + n / 10,
                  }}
                ></div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Total Return</p>
                <p className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                  +12.4%
                </p>
              </div>
              <button className="py-2 px-4 rounded-lg bg-gray-700 text-cyan-400 text-sm font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                Full Report
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.35),-5px_-5px_15px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 hover:translate-y-[-5px] transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
              {["Buy Stock", "Sell Asset", "Add Funds", "Withdraw"].map(
                (action, index) => (
                  <button
                    key={index}
                    className="py-3 rounded-lg bg-gray-700 text-cyan-400 text-sm font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30 hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                  >
                    {action}
                  </button>
                )
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Watchlist
              </h4>
              {["MSFT", "GOOGL", "AMZN"].map((stock, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 py-2 px-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200"
                >
                  <span>{stock}</span>
                  <span
                    className={
                      index % 2 === 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {index % 2 === 0 ? "+" : "-"}
                    {Math.floor(Math.random() * 5) + 1}.
                    {Math.floor(Math.random() * 99)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

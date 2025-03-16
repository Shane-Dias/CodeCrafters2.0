import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  PieChart,
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Bookmark,
  RefreshCw,
} from "lucide-react";

const InvestmentForm = () => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [riskLevel, setRiskLevel] = useState("Medium");
  const [volatility, setVolatility] = useState(0.15);
  const [showModal, setShowModal] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [portfolioData, setPortfolioData] = useState(null); // Store API response
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Retrieve watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else {
      // Default watchlist for demo purposes
      setWatchlist(["AAPL", "GOOGL", "MSFT", "AMZN"]);
    }
  }, []);

  // Handle buy stocks
  const handleBuy = () => {
    alert("Stocks purchased successfully!");
    setShowModal(false);
  };

  // Handle back button in modal
  const handleBack = () => {
    setShowModal(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/recommendations/recommend_portfolio/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tickers: watchlist,
            total_portfolio_value: Number.parseFloat(investmentAmount),
            risk: riskLevel.toLowerCase(),
            volatility: Number.parseFloat(volatility),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get portfolio recommendation");
      }

      const data = await response.json();
      setPortfolioData(data); // Store the API response
      setShowModal(true); // Show the modal
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex items-center justify-center bg-gray-900">
      {/* Main Container */}
      <div className="w-full max-w-lg mt-10">
        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl p-8 relative"
          style={{
            backgroundColor: "#1a1a2e",
            boxShadow:
              "20px 20px 60px rgba(0, 0, 0, 0.4), -5px -5px 20px rgba(59, 59, 90, 0.2)",
          }}
        >
          {/* Header with gradient effect */}
          <div
            className="absolute top-0 left-0 right-0 h-24 rounded-t-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(80, 200, 220, 0.1), rgba(150, 100, 240, 0.1))",
              zIndex: "0",
            }}
          ></div>

          <div className="relative z-10">
            <div className="mb-8 flex items-center">
              <div
                className="mr-4 p-3 rounded-xl"
                style={{
                  backgroundColor: "#252542",
                  boxShadow:
                    "5px 5px 10px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(59, 59, 90, 0.2)",
                }}
              >
                <PieChart size={24} className="text-cyan-400" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-200">
                Stock <span style={{ color: "#06b6d4" }}>Investment</span>
              </h2>
            </div>

            {/* Watchlist Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Bookmark size={18} className="mr-2 text-purple-400" />
                <h3 className="text-lg font-semibold text-gray-200">
                  Your Watchlist
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {watchlist.map((stock) => (
                  <div
                    key={stock}
                    className="py-2 px-3 rounded-xl relative"
                    style={{
                      backgroundColor: "#252542",
                      boxShadow:
                        "inset 3px 3px 7px rgba(0, 0, 0, 0.3), inset -1px -1px 3px rgba(59, 59, 90, 0.2)",
                    }}
                  >
                    <span
                      className="font-medium"
                      style={{
                        background: "linear-gradient(90deg, #06b6d4, #b388ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stock}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Amount */}
            <div className="mb-6">
              <label className="block mb-3 text-gray-300 font-medium">
                <div className="flex items-center">
                  <DollarSign size={18} className="mr-2 text-cyan-400" />
                  Investment Amount
                </div>
              </label>
              <div
                className="rounded-xl p-1"
                style={{
                  backgroundColor: "#252542",
                  boxShadow:
                    "inset 5px 5px 10px rgba(0, 0, 0, 0.3), inset -1px -1px 3px rgba(59, 59, 90, 0.2)",
                }}
              >
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  className="w-full px-4 py-3 bg-transparent border-none rounded-lg focus:outline-none text-gray-200"
                />
              </div>
            </div>

            {/* Risk Level */}
            <div className="mb-6">
              <label className="block mb-3 text-gray-300 font-medium">
                <div className="flex items-center">
                  <AlertCircle size={18} className="mr-2 text-cyan-400" />
                  Risk Level
                </div>
              </label>

              {/* Custom Radio Button Group */}
              <div
                className="flex bg-gray-100 p-1 rounded-xl"
                style={{
                  backgroundColor: "#252542",
                  boxShadow:
                    "inset 5px 5px 10px rgba(0, 0, 0, 0.3), inset -1px -1px 3px rgba(59, 59, 90, 0.2)",
                }}
              >
                {["Low", "Medium", "High"].map((level) => (
                  <div
                    key={level}
                    className={`flex-1 relative ${
                      riskLevel === level ? "z-10" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="riskLevel"
                      id={`risk-${level}`}
                      value={level}
                      checked={riskLevel === level}
                      onChange={() => setRiskLevel(level)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`risk-${level}`}
                      className={`block text-center py-3 px-4 cursor-pointer transition-all duration-200 text-sm font-medium rounded-lg ${
                        riskLevel === level
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                      style={
                        riskLevel === level
                          ? {
                              background:
                                "linear-gradient(135deg, #06b6d4, #b388ff)",
                              boxShadow:
                                "3px 3px 6px rgba(0, 0, 0, 0.3), -1px -1px 3px rgba(59, 59, 90, 0.2)",
                            }
                          : {}
                      }
                    >
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Volatility (if Medium) */}
            {riskLevel === "Medium" && (
              <div className="mb-6">
                <label className="block mb-3 text-gray-300 font-medium">
                  <div className="flex items-center">
                    <TrendingUp size={18} className="mr-2 text-cyan-400" />
                    Volatility (%)
                  </div>
                </label>

                {/* Custom Range Slider */}
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={volatility * 100}
                    onChange={(e) => setVolatility(e.target.value / 100)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: "linear-gradient(to right, #06b6d4, #b388ff)",
                      boxShadow:
                        "inset 2px 2px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 3px rgba(59, 59, 90, 0.2)",
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">Low</span>
                    <span className="text-sm font-medium text-gray-300">
                      {(volatility * 100).toFixed(0)}%
                    </span>
                    <span className="text-xs text-gray-400">High</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-bold text-white relative overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #b388ff)",
                  boxShadow:
                    "6px 6px 12px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(59, 59, 90, 0.2)",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <CreditCard className="mr-2" size={20} />
                    Invest Now
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal for Results */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div
            className="w-full max-w-md p-8 rounded-3xl"
            style={{
              backgroundColor: "#1a1a2e",
              boxShadow:
                "20px 20px 60px rgba(0, 0, 0, 0.4), -5px -5px 20px rgba(59, 59, 90, 0.2)",
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div
                  className="mr-4 p-3 rounded-xl"
                  style={{
                    backgroundColor: "#252542",
                    boxShadow:
                      "5px 5px 10px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(59, 59, 90, 0.2)",
                  }}
                >
                  <CheckCircle size={24} className="text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-200">
                  Portfolio Recommendation
                </h2>
              </div>

              {/* Results Panel */}
              {portfolioData ? (
                <div
                  className="p-6 rounded-2xl mb-6"
                  style={{
                    backgroundColor: "#252542",
                    boxShadow:
                      "inset 5px 5px 10px rgba(0, 0, 0, 0.3), inset -1px -1px 3px rgba(59, 59, 90, 0.2)",
                  }}
                >
                  {/* Expected Returns */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">
                      Expected Annual Returns
                    </div>
                    <div
                      className="text-2xl font-bold"
                      style={{
                        background: "linear-gradient(90deg, #06b6d4, #b388ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {portfolioData.expected_return.toFixed(2)}%
                    </div>
                  </div>

                  {/* Volatility and Sharpe Ratio */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Annual Volatility
                      </div>
                      <div className="text-lg font-semibold text-gray-200">
                        {portfolioData.volatility.toFixed(2)}%
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Sharpe Ratio
                      </div>
                      <div className="text-lg font-semibold text-gray-200">
                        {portfolioData.sharpe.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Allocation */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">
                      Dynamic Allocation
                    </div>

                    {Object.entries(portfolioData.allocation).map(
                      ([ticker, percentage], index) => (
                        <div key={index} className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-300">
                              {ticker}
                            </span>
                            <span className="font-medium text-gray-300">
                              {percentage}%
                            </span>
                          </div>
                          <div
                            className="w-full h-2 rounded-full overflow-hidden"
                            style={{
                              backgroundColor: "#1a1a2e",
                              boxShadow:
                                "inset 2px 2px 5px rgba(0, 0, 0, 0.3), inset -1px -1px 3px rgba(59, 59, 90, 0.2)",
                            }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${percentage}%`,
                                background:
                                  "linear-gradient(90deg, #06b6d4, #b388ff)",
                              }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Funds Remaining */}
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Funds Remaining
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      ${portfolioData.leftover.toFixed(2)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  No portfolio data available.
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-xl font-medium text-gray-300 flex items-center justify-center"
                  style={{
                    backgroundColor: "#252542",
                    boxShadow:
                      "5px 5px 10px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(59, 59, 90, 0.2)",
                  }}
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back
                </button>
                <button
                  onClick={handleBuy}
                  className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #b388ff)",
                    boxShadow:
                      "5px 5px 10px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(59, 59, 90, 0.2)",
                  }}
                >
                  <CreditCard className="mr-2" size={18} />
                  Buy Stocks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentForm;

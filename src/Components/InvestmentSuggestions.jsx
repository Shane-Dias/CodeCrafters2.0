import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

const InvestmentSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recommendations");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/recommendation?symbol=INFY&token=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        setSuggestions(data.slice(0, 5)); // Limiting to 5 items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Sample data for AI recommendations tab
  const aiRecommendations = [
    {
      symbol: "NVDA",
      confidence: 92,
      sentiment: "Strong Buy",
      reason: "AI market growth",
    },
    {
      symbol: "TSLA",
      confidence: 78,
      sentiment: "Buy",
      reason: "EV market expansion",
    },
    {
      symbol: "MSFT",
      confidence: 85,
      sentiment: "Buy",
      reason: "Cloud services growth",
    },
  ];

  return (
    <section className="py-24 bg-gray-800 text-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
          Investment Insights
        </h2>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          {["recommendations", "ai-insights"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gray-700 text-cyan-400 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] border-t border-l border-gray-600 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]"
                  : "bg-gray-900 text-gray-400 shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)]"
              }`}
            >
              {tab === "recommendations"
                ? "Analyst Recommendations"
                : "AI Insights"}
            </button>
          ))}
        </div>

        {activeTab === "recommendations" ? (
          <div className="bg-gray-900 rounded-xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(70,70,70,0.1)] border-t border-l border-gray-700">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 rounded-lg bg-gray-800 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                        AAPL Analyst Consensus
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Based on {suggestions.length} analyst recommendations
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                        Buy
                      </div>
                      <div className="text-sm text-green-400">
                        Strong signal
                      </div>
                    </div>
                  </div>

                  {/* Rating visualization */}
                  <div className="mt-4 flex h-8 rounded-lg overflow-hidden shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: "45%" }}
                    ></div>
                    <div
                      className="bg-green-400 h-full"
                      style={{ width: "20%" }}
                    ></div>
                    <div
                      className="bg-gray-500 h-full"
                      style={{ width: "15%" }}
                    ></div>
                    <div
                      className="bg-red-400 h-full"
                      style={{ width: "10%" }}
                    ></div>
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 px-1">
                    <span>Strong Buy</span>
                    <span>Buy</span>
                    <span>Hold</span>
                    <span>Sell</span>
                    <span>Strong Sell</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Recent Analyst Updates
                  </h3>
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-800 shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:translate-x-1 transition-all duration-300 border-l border-t border-gray-700"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center">
                            <span className="text-cyan-400 font-medium drop-shadow-[0_0_3px_rgba(34,211,238,0.4)]">
                              AAPL
                            </span>
                            <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded-full">
                              {item.period?.substring(0, 10) || "Latest"}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center">
                            <span className="text-xs text-gray-400 mr-2">
                              Sentiment:
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                item.buy > item.sell
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {item.buy > item.sell ? "Bullish" : "Bearish"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex space-x-3 text-sm">
                            <div>
                              <div className="text-gray-400">Buy</div>
                              <div className="font-medium text-green-400">
                                {item.buy}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400">Hold</div>
                              <div className="font-medium">{item.hold}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Sell</div>
                              <div className="font-medium text-red-400">
                                {item.sell}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(70,70,70,0.1)] border-t border-l border-gray-700">
            <div className="mb-6 p-4 rounded-lg bg-gray-800 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)]">
              <h3 className="text-xl font-semibold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                AI-Powered Investment Opportunities
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Our algorithm analyzed market data across 5,000+ stocks
              </p>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(70,70,70,0.05)]">
                  <div className="text-sm text-gray-400">Market Sentiment</div>
                  <div className="text-2xl font-bold text-green-400">
                    Bullish
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(70,70,70,0.05)]">
                  <div className="text-sm text-gray-400">Confidence Level</div>
                  <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                    87%
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(70,70,70,0.05)]">
                  <div className="text-sm text-gray-400">Opportunity Score</div>
                  <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                    8.4/10
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Top AI Recommendations</h3>
              {aiRecommendations.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-800 shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:translate-x-1 transition-all duration-300 border-l border-t border-gray-700 group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <span className="text-lg text-cyan-400 font-medium drop-shadow-[0_0_3px_rgba(34,211,238,0.4)]">
                          {item.symbol}
                        </span>
                        <span
                          className={`ml-2 text-xs px-2 py-1 rounded-full ${
                            item.sentiment.includes("Buy")
                              ? "bg-green-900/50 text-green-400"
                              : "bg-red-900/50 text-red-400"
                          }`}
                        >
                          {item.sentiment}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-300">
                        {item.reason}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end">
                        <div className="font-medium text-sm text-gray-400">
                          Confidence
                        </div>
                        <div className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.4)]">
                          {item.confidence}%
                        </div>
                      </div>
                      <button className="mt-2 py-1 px-3 text-xs rounded-lg bg-gray-700 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[2px_2px_4px_rgba(0,0,0,0.25),-2px_-2px_4px_rgba(70,70,70,0.08)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.25),inset_-2px_-2px_4px_rgba(70,70,70,0.08)]">
                        View Analysis
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full mt-4 py-3 rounded-lg bg-gray-800 text-cyan-400 font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30 hover:text-cyan-300 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                Generate Custom AI Insight
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InvestmentSuggestions;

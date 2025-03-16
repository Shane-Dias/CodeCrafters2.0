import { Star } from "lucide-react";
import React, { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

// Define company names
const COMPANY_NAMES = {
  AAPL: "Apple Inc.",
  GOOGL: "Alphabet Inc.",
  MSFT: "Microsoft Corporation",
  AMZN: "Amazon.com Inc.",
  TSLA: "Tesla Inc.",
  META: "Meta Platforms Inc.",
};

// Icons for companies (upgraded with glowing effect)
const StockIcon = ({ symbol }) => {
  const getIconLetter = () => symbol.charAt(0);

  const getSymbolColor = () => {
    const colors = [
      "text-indigo-400",
      "text-cyan-400",
      "text-emerald-400",
      "text-violet-400",
      "text-amber-400",
    ];
    return colors[symbol.charCodeAt(0) % colors.length];
  };

  const shadowColor = getSymbolColor().replace("text", "shadow");

  return (
    <div
      className={`w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shadow-lg ${shadowColor}/30 border border-gray-700`}
    >
      <span className={`${getSymbolColor()} font-bold`}>{getIconLetter()}</span>
    </div>
  );
};

const StockDetails = () => {
  const [isLoading2, setIsLoading2] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "symbol",
    direction: "ascending",
  });
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'

  const SYMBOLS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META"];
  // Example stock symbols

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
            console.log(data);
            return {
              symbol,
              companyName: COMPANY_NAMES[symbol] || symbol,
              ...data,
            };
          })
        );
        setStocks(stockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  // Sorting logic
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedStocks = () => {
    const sortableStocks = [...stocks];
    if (sortConfig.key) {
      sortableStocks.sort((a, b) => {
        if (typeof a[sortConfig.key] === "number") {
          return sortConfig.direction === "ascending"
            ? a[sortConfig.key] - b[sortConfig.key]
            : b[sortConfig.key] - a[sortConfig.key];
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableStocks;
  };

  const handlePurchase = async (stock) => {
    console.log(stock.c,stock.symbol);
    setIsLoading2(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/request-buy/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            coin: 1,
            symbol: stock.symbol,
            quantity: 1,
            price:stock.c ,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Store transaction data for OTP verification
        setTransactionData({
          coin: coin.id,
          amount: amount,
          coinAmount: coinAmount,
          transactionId: data.transaction_key, // If your API returns this
        });
        setIsLoading2(false);
        // Show OTP modal only if request was successful
        setShowOtpModal(true);
      } else {
        const errorData = await response.json();
        setIsLoading2(false);
        alert(errorData.error || "Purchase request failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading2(false);
      alert("Purchase request failed. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setOtpError("Please enter OTP");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/confirm-buy/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            transaction_key: transactionData?.transactionId,
            otp: otp,
          }),
        }
      );

      if (response.ok) {
        setShowOtpModal(false);
        setOtp("");
        setPurchaseAmount("");
        navigate("/success");
      } else {
        const errorData = await response.json();
        setOtpError(errorData.error || "Verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setOtpError("Verification failed");
    }
  };

  // Add this OTP Modal component within your return statement
  const OtpModal = () => {
    if (!showOtpModal) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border-2 border-indigo-500/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-100">Verify Purchase</h3>
            <button
              onClick={() => setShowOtpModal(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-gray-300 mb-4">
            Enter the OTP sent to your registered mobile number to complete your
            purchase.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Transaction Details
              </label>
              <div className="bg-gray-700 rounded p-3 text-sm">
                <p className="text-gray-300">
                  <span className="font-medium">Coin:</span>{" "}
                  {cryptoData.find((c) => c.id === selectedCrypto)?.name}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Amount:</span> $
                  {parseFloat(purchaseAmount).toFixed(2)}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Quantity:</span>{" "}
                  {(
                    parseFloat(purchaseAmount) /
                    (cryptoData.find((c) => c.id === selectedCrypto)
                      ?.current_price || 1)
                  ).toFixed(6)}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                One-Time Password (OTP)
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter OTP"
              />
              {otpError && (
                <p className="mt-1 text-sm text-red-400">{otpError}</p>
              )}
            </div>

            <button
              onClick={verifyOtp}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Initialize watchlist state from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("stock-watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  // Update localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem("stock-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Toggle watchlist for a stock
  const toggleWatchlist = (symbol) => {
    setWatchlist((prev) =>
      prev.includes(symbol)
        ? prev.filter((item) => item !== symbol)
        : [...prev, symbol]
    );
  };

  if (loading) {
    return (
      <div className="py-24 bg-gray-900 text-gray-200 flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin drop-shadow-[0_0_10px_rgba(79,70,229,0.6)]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const sortedStocks = getSortedStocks();

  return (
    <section className="text-gray-200">
      <div className="container mx-auto">
        {/* View Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 mr-2 rounded-lg ${
              viewMode === "card"
                ? "bg-indigo-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "table"
                ? "bg-indigo-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Table View
          </button>
        </div>

        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedStocks.map((stock, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 shadow-lg shadow-indigo-500/20 border-2 border-indigo-500/20 hover:shadow-indigo-500/30 hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <StockIcon symbol={stock.symbol} />
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold">
                        {stock.companyName}
                      </h3>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded-lg text-gray-300">
                        {stock.symbol}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleWatchlist(stock.symbol)}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    <Star
                      className={`${
                        watchlist.includes(stock.symbol)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  </button>
                </div>

                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-indigo-400 drop-shadow-[0_0_5px_rgba(79,70,229,0.4)]">
                    ${stock.c?.toFixed(2)}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      stock.dp >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stock.dp >= 0 ? "+" : ""}
                    {stock.dp?.toFixed(2)}%
                  </span>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg shadow-indigo-500/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Open</p>
                      <p className="font-medium">${stock.o?.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Previous Close</p>
                      <p className="font-medium">${stock.pc?.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">High</p>
                      <p className="font-medium text-emerald-400">
                        ${stock.h?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Low</p>
                      <p className="font-medium text-red-400">
                        ${stock.l?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Change</p>
                      <p
                        className={`font-medium ${
                          stock.d >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {stock.d >= 0 ? "+" : ""}
                        {stock.d?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">% Change</p>
                      <p
                        className={`font-medium ${
                          stock.dp >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {stock.dp >= 0 ? "+" : ""}
                        {stock.dp?.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handlePurchase(stock)}
                    className="py-2 px-4 rounded-lg bg-gray-700 text-cyan-400 text-sm font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] center"
                  >
                    Buy
                  </button>
                  {isLoading2 && <div class="loader"></div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg shadow-indigo-500/30 border-2 border-indigo-500/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-left">
                    {[
                      "Symbol",
                      "Company",
                      "Price",
                      "Change",
                      "% Change",
                      "High",
                      "Low",
                      "Watchlist",
                    ].map((header, index) => {
                      const key =
                        index === 0
                          ? "symbol"
                          : index === 1
                          ? "companyName"
                          : index === 2
                          ? "c"
                          : index === 3
                          ? "d"
                          : index === 4
                          ? "dp"
                          : index === 5
                          ? "h"
                          : index === 6
                          ? "l"
                          : "watchlist";

                      return (
                        <th
                          key={index}
                          className="py-3 px-4 font-medium cursor-pointer hover:text-indigo-400 transition-colors duration-200"
                          onClick={() =>
                            key !== "watchlist" && requestSort(key)
                          }
                        >
                          <div className="flex items-center">{header}</div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sortedStocks.map((stock, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <StockIcon symbol={stock.symbol} />
                          <span className="ml-2 font-medium text-indigo-400 drop-shadow-[0_0_3px_rgba(79,70,229,0.3)]">
                            {stock.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{stock.companyName}</td>
                      <td className="py-4 px-4 font-bold">
                        ${stock.c?.toFixed(2)}
                      </td>
                      <td
                        className={`py-4 px-4 ${
                          stock.d >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {stock.d >= 0 ? "+" : ""}
                        {stock.d?.toFixed(2)}
                      </td>
                      <td
                        className={`py-4 px-4 ${
                          stock.dp >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {stock.dp >= 0 ? "+" : ""}
                        {stock.dp?.toFixed(2)}%
                      </td>
                      <td className="py-4 px-4 text-emerald-400">
                        ${stock.h?.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-red-400">
                        ${stock.l?.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleWatchlist(stock.symbol)}
                          className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                        >
                          <Star
                            className={`${
                              watchlist.includes(stock.symbol)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-400"
                            }`}
                            size={20}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <OtpModal />
    </section>
  );
};

export default StockDetails;

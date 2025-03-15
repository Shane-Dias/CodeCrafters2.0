import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

// Company name mapping for display purposes
const COMPANY_NAMES = {
  AAPL: "Apple Inc.",
  GOOGL: "Alphabet Inc.",
  MSFT: "Microsoft Corp.",
  AMZN: "Amazon.com Inc.",
  TSLA: "Tesla Inc.",
};

// Icons for companies (simplified representations)
const StockIcon = ({ symbol }) => {
  const getIconLetter = () => {
    return symbol.charAt(0);
  };

  return (
    <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(70,70,70,0.1)]">
      <span className="text-cyan-400 font-bold">{getIconLetter()}</span>
    </div>
  );
};

const StockDetails = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "symbol",
    direction: "ascending",
  });
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'

  const SYMBOLS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"]; // Example stock symbols

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
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStocks;
  };

  //User Buying Stocks Script
  const handleBuy = async (stock) => {
    const response = await fetch("http://127.0.0.1:8000/api/accounts/buy/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the user is authenticated
      },
      body: JSON.stringify({
        symbol: stock.symbol,
        company_name: stock.companyName,
        price: stock.c,
        quantity: 1, // Default quantity
      }),
    });
  
    if (response.ok) {
      alert("Stock purchased successfully!");
    } else {
      alert("Failed to purchase stock.");
    }
  };
  

  if (loading) {
    return (
      <div className="py-24 bg-gray-900 text-gray-200 flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 bg-gray-900 text-gray-200 flex justify-center items-center h-64">
        <div className="bg-gray-800 p-6 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.35),-5px_-5px_15px_rgba(70,70,70,0.1)] border-t border-l border-gray-700">
          <div className="text-red-400 mb-2 text-xl">⚠️ Error</div>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 py-2 px-4 rounded-lg bg-gray-700 text-cyan-400 font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6">
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

        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getSortedStocks().map((stock, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.35),-5px_-5px_15px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <StockIcon symbol={stock.symbol} />
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold">
                        {stock.companyName}
                      </h3>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(70,70,70,0.1)]">
                        {stock.symbol}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                    ${stock.c.toFixed(2)}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      stock.dp >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stock.dp >= 0 ? "+" : ""}
                    {stock.dp.toFixed(2)}%
                  </span>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Open</p>
                      <p className="font-medium">${stock.o.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Previous Close</p>
                      <p className="font-medium">${stock.pc.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">High</p>
                      <p className="font-medium text-green-400">
                        ${stock.h.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Low</p>
                      <p className="font-medium text-red-400">
                        ${stock.l.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Change</p>
                      <p
                        className={`font-medium ${
                          stock.d >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.d >= 0 ? "+" : ""}
                        {stock.d.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">% Change</p>
                      <p
                        className={`font-medium ${
                          stock.dp >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.dp >= 0 ? "+" : ""}
                        {stock.dp.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button onClick={() => handleBuy(stock)} className="py-2 px-4 rounded-lg bg-gray-700 text-cyan-400 text-sm font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    Buy
                  </button>
                  <button className="py-2 px-4 rounded-lg bg-gray-700 text-gray-300 text-sm font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 overflow-hidden">
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
                          : "l";

                      return (
                        <th
                          key={index}
                          className="py-3 px-4 font-medium cursor-pointer hover:text-cyan-400 transition-colors duration-200"
                          onClick={() => requestSort(key)}
                        >
                          <div className="flex items-center">
                            {header}
                            {sortConfig.key === key && (
                              <span className="ml-1 text-cyan-400">
                                {sortConfig.direction === "ascending"
                                  ? "↑"
                                  : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {getSortedStocks().map((stock, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <StockIcon symbol={stock.symbol} />
                          <span className="ml-2 font-medium text-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.3)]">
                            {stock.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{stock.companyName}</td>
                      <td className="py-4 px-4 font-bold">
                        ${stock.c.toFixed(2)}
                      </td>
                      <td
                        className={`py-4 px-4 ${
                          stock.d >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.d >= 0 ? "+" : ""}
                        {stock.d.toFixed(2)}
                      </td>
                      <td
                        className={`py-4 px-4 ${
                          stock.dp >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.dp >= 0 ? "+" : ""}
                        {stock.dp.toFixed(2)}%
                      </td>
                      <td className="py-4 px-4 text-green-400">
                        ${stock.h.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-red-400">
                        ${stock.l.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StockDetails;

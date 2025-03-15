import React from "react";
import { Star, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

// Icons for companies (upgraded with glowing effect)
const StockIcon = ({ symbol }) => {
  const getIconLetter = () => {
    return symbol.charAt(0);
  };

  // Generate a consistent color based on the symbol
  const getSymbolColor = () => {
    const colors = [
      "text-indigo-400",
      "text-cyan-400",
      "text-emerald-400",
      "text-violet-400",
      "text-amber-400",
    ];
    const index = symbol.charCodeAt(0) % colors.length;
    return colors[index];
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
        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin drop-shadow-[0_0_10px_rgba(79,70,229,0.6)]"></div>
      </div>
    );
  }

  return (
    <section className="text-gray-200">
      <div className="container mx-auto">
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock, index) => (
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
                    ${stock.price?.toFixed(2) || stock.c?.toFixed(2)}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      (stock.changePercent || stock.dp) >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {(stock.changePercent || stock.dp) >= 0 ? "+" : ""}
                    {(stock.changePercent || stock.dp)?.toFixed(2)}%
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
                          (stock.d || stock.change) >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {(stock.d || stock.change) >= 0 ? "+" : ""}
                        {(stock.d || stock.change)?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">% Change</p>
                      <p
                        className={`font-medium ${
                          (stock.dp || stock.changePercent) >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {(stock.dp || stock.changePercent) >= 0 ? "+" : ""}
                        {(stock.dp || stock.changePercent)?.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleBuy(stock)}
                    className="py-2 px-4 rounded-lg bg-gray-700 text-cyan-400 text-sm font-medium shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(70,70,70,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(70,70,70,0.08)] transition-all duration-300 border border-cyan-900/30 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                  >
                    Buy
                  </button>
                  <button className="py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 hover:bg-gray-600 text-gray-200 text-sm font-medium shadow-lg shadow-gray-700/50 hover:shadow-gray-700/70 transition-all duration-300">
                    Details
                  </button>
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
                  {stocks.map((stock, index) => (
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
                        ${(stock.price || stock.c)?.toFixed(2)}
                      </td>
                      <td
                        className={`py-4 px-4 ${
                          (stock.d || stock.change) >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {(stock.d || stock.change) >= 0 ? "+" : ""}
                        {(stock.d || stock.change)?.toFixed(2)}
                      </td>
                      <td
                        className={`py-4 px-4 ${
                          (stock.dp || stock.changePercent) >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {(stock.dp || stock.changePercent) >= 0 ? "+" : ""}
                        {(stock.dp || stock.changePercent)?.toFixed(2)}%
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
    </section>
  );
};
export default StockDetails;

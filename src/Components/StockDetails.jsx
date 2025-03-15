import React from "react";
import { Star, DollarSign } from "lucide-react";

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

const StockDetails = ({
  stocks = [],
  viewMode = "card",
  requestSort,
  watchlist = [],
  toggleWatchlist,
}) => {
  // Handle loading state when no stocks are available
  if (!stocks || stocks.length === 0) {
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
                  <button className="py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300">
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

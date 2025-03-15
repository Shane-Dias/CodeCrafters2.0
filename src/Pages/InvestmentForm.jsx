import { useState } from "react";
import { useWatchlist } from "../Context/WatchlistContext";

const InvestmentForm = () => {
  const { watchlist } = useWatchlist();
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [riskLevel, setRiskLevel] = useState("Medium");
  const [volatility, setVolatility] = useState(0.15);

  // Handle stock selection
  const handleStockSelect = (stock) => {
    if (!selectedStocks.includes(stock)) {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedStocks,
      investmentAmount,
      riskLevel,
      volatility,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Invest in Stocks</h2>

      {/* Stock Dropdown */}
      <div className="mb-4">
        <label className="block mb-2">Select Stocks</label>
        <select
          onChange={(e) => handleStockSelect(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
        >
          <option value="" disabled selected>
            Select a stock
          </option>
          {watchlist.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setSelectedStocks(watchlist)}
          className="mt-2 bg-cyan-500 text-white px-3 py-1 rounded-md"
        >
          Select All from Watchlist
        </button>
      </div>

      {/* Display Selected Stocks */}
      {selectedStocks.length > 0 && (
        <div className="mb-4">
          <p className="mb-2">Selected Stocks:</p>
          <div className="flex flex-wrap gap-2">
            {selectedStocks.map((stock) => (
              <span
                key={stock}
                className="bg-gray-600 px-2 py-1 rounded text-sm"
              >
                {stock}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Investment Amount */}
      <div className="mb-4">
        <label className="block mb-2">Investment Amount</label>
        <input
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
          placeholder="Enter amount"
        />
      </div>

      {/* Risk Level */}
      <div className="mb-4">
        <label className="block mb-2">Risk Level</label>
        <select
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Volatility (if Medium) */}
      {riskLevel === "Medium" && (
        <div className="mb-4">
          <label className="block mb-2">Volatility (%)</label>
          <input
            type="number"
            value={volatility}
            onChange={(e) => setVolatility(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
            placeholder="Enter volatility"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-cyan-500 w-full py-2 rounded-md font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default InvestmentForm;

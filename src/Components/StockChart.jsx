import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StockChart = ({ ticker = "AAPL" }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/get_stock_data/${ticker}`)
      .then(response => response.json())
      .then(data => setStockData(data.data))
      .catch(error => console.error("Error fetching stock data:", error));
  }, [ticker]);

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">Stock Price Chart - {ticker}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={stockData}>
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Close" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;

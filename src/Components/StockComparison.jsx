import React, { useState, useEffect } from 'react';

// Your Finnhub API key (should ideally be in .env and accessed via a backend)
const API_KEY = import .meta.env.VITE_FINNHUB_API_KEY || "demo_key";

// List of popular stock symbols
const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'NVDA', 'JPM', 'WMT', 'DIS'];

const StockComparison = () => {
  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch stock data from Finnhub API
  const fetchStockData = async (symbol) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        symbol,
        currentPrice: data.c || 'N/A',
        highPrice: data.h || 'N/A',
        lowPrice: data.l || 'N/A',
        openPrice: data.o || 'N/A',
        prevClose: data.pc || 'N/A',
        change: ((data.c - data.pc) / data.pc * 100).toFixed(2) || 'N/A',
      };
    } catch (err) {
      console.error('Error fetching stock data:', err);
      return null;
    }
  };

  // Compare stocks when selections change
  useEffect(() => {
    const compareStocks = async () => {
      if (!stock1 || !stock2 || stock1 === stock2) {
        setComparisonData(null);
        setError(stock1 && stock2 && stock1 === stock2 ? 'Please select two different stocks.' : 'Please select both stocks.');
        return;
      }

      setLoading(true);
      setError(null);

      const stock1Data = await fetchStockData(stock1);
      const stock2Data = await fetchStockData(stock2);

      if (!stock1Data || !stock2Data) {
        setError('Error fetching stock data. Please try again.');
        setComparisonData(null);
      } else {
        setComparisonData({ stock1: stock1Data, stock2: stock2Data });
      }
      setLoading(false);
    };

    compareStocks();
  }, [stock1, stock2]);

  // Generate conclusion
  const generateConclusion = (stock1Data, stock2Data) => {
    const priceDiff = stock1Data.currentPrice - stock2Data.currentPrice;
    const changeDiff = stock1Data.change - stock2Data.change;

    let conclusion = '';
    if (priceDiff > 0) {
      conclusion += `${stock1Data.symbol} is trading at a higher price than ${stock2Data.symbol} by $${Math.abs(priceDiff).toFixed(2)}. `;
    } else {
      conclusion += `${stock2Data.symbol} is trading at a higher price than ${stock1Data.symbol} by $${Math.abs(priceDiff).toFixed(2)}. `;
    }

    if (changeDiff > 0) {
      conclusion += `${stock1Data.symbol} has a better daily performance with a ${Math.abs(changeDiff).toFixed(2)}% higher change than ${stock2Data.symbol}.`;
    } else {
      conclusion += `${stock2Data.symbol} has a better daily performance with a ${Math.abs(changeDiff).toFixed(2)}% higher change than ${stock1Data.symbol}.`;
    }

    return conclusion;
  };

  // Inline styles (you can move these to a separate CSS file)
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    selectorContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
    },
    select: {
      padding: '8px',
      fontSize: '16px',
      borderRadius: '4px',
      width: '45%',
    },
    resultContainer: {
      marginTop: '20px',
    },
    resultContent: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#f2f2f2',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Stock Comparison Tool</h1>
      <div style={styles.selectorContainer}>
        <div>
          <label style={styles.label} htmlFor="stock1">Select Stock 1:</label>
          <select
            id="stock1"
            value={stock1}
            onChange={(e) => setStock1(e.target.value)}
            style={styles.select}
          >
            <option value="">--Select a Stock--</option>
            {stockSymbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label} htmlFor="stock2">Select Stock 2:</label>
          <select
            id="stock2"
            value={stock2}
            onChange={(e) => setStock2(e.target.value)}
            style={styles.select}
          >
            <option value="">--Select a Stock--</option>
            {stockSymbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.resultContainer}>
        <h2>Comparison Result</h2>
        <div style={styles.resultContent}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {comparisonData && (
            <>
              <h3>{comparisonData.stock1.symbol} vs {comparisonData.stock2.symbol}</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Metric</th>
                    <th style={styles.th}>{comparisonData.stock1.symbol}</th>
                    <th style={styles.th}>{comparisonData.stock2.symbol}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>Current Price</td>
                    <td style={styles.td}>${comparisonData.stock1.currentPrice}</td>
                    <td style={styles.td}>${comparisonData.stock2.currentPrice}</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>High Price</td>
                    <td style={styles.td}>${comparisonData.stock1.highPrice}</td>
                    <td style={styles.td}>${comparisonData.stock2.highPrice}</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Low Price</td>
                    <td style={styles.td}>${comparisonData.stock1.lowPrice}</td>
                    <td style={styles.td}>${comparisonData.stock2.lowPrice}</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Open Price</td>
                    <td style={styles.td}>${comparisonData.stock1.openPrice}</td>
                    <td style={styles.td}>${comparisonData.stock2.openPrice}</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Previous Close</td>
                    <td style={styles.td}>${comparisonData.stock1.prevClose}</td>
                    <td style={styles.td}>${comparisonData.stock2.prevClose}</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Change (%)</td>
                    <td style={styles.td}>{comparisonData.stock1.change}%</td>
                    <td style={styles.td}>{comparisonData.stock2.change}%</td>
                  </tr>
                </tbody>
              </table>
              <h4>Conclusion</h4>
              <p>{generateConclusion(comparisonData.stock1, comparisonData.stock2)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockComparison;
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  RefreshCw,
  DollarSign,
  Wallet,
  TrendingUp,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true"
        );
        if (response.ok) {
          const data = await response.json();
          setCryptoData(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    const coin = cryptoData.find((c) => c.id === selectedCrypto);
    if (!coin || !coin.sparkline_in_7d?.price) return [];

    return coin.sparkline_in_7d.price
      .map((price, i) => ({
        time: i,
        price,
      }))
      .filter((_, i) => i % 12 === 0);
  };

  const handlePurchase = async () => {
    if (!purchaseAmount) return;
    const coin = cryptoData.find((c) => c.id === selectedCrypto);
    if (!coin) return;
    const symbol = coin ? coin.symbol.toUpperCase() : "";
    const amount = parseFloat(purchaseAmount);
    const coinAmount = amount / coin.current_price;
    console.log(sessionStorage.getItem("access_token"));
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
            coin: coin.id,
            symbol: symbol,
            quantity: amount,
            coin_amount: coinAmount,
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

        // Show OTP modal only if request was successful
        setShowOtpModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Purchase request failed");
      }
    } catch (error) {
      console.error("Error:", error);
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pt-24">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign size={28} className="text-indigo-400" />
          <h1 className="text-2xl font-bold text-gray-100">CryptoWealth</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell size={20} className="text-gray-300" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">2</span>
            </div>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">JD</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-indigo-400" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Portfolio Value",
                amount: `$${cryptoData
                  .reduce((sum, coin) => sum + (coin.current_price || 0), 0)
                  .toLocaleString()}`,
                icon: Wallet,
                glow: "shadow-lg",
                color: "bg-gray-800",
                textColor: "text-indigo-400",
                borderColor: "border-indigo-500",
              },
              {
                title: "24h Change",
                amount: `${cryptoData
                  .reduce(
                    (sum, coin) =>
                      sum + (coin.price_change_percentage_24h || 0),
                    0
                  )
                  .toFixed(2)}%`,
                icon: TrendingUp,
                glow: "shadow-lg",
                color: "bg-gray-800",
                textColor: "text-cyan-400",
                borderColor: "border-cyan-500",
              },
              {
                title: "Coins Tracked",
                amount: cryptoData.length,
                icon: DollarSign,
                glow: "shadow-lg",
                color: "bg-gray-800",
                textColor: "text-emerald-400",
                borderColor: "border-emerald-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color} ${item.glow} rounded-xl border-2 ${item.borderColor} p-4`}
              >
                <div className="flex flex-col items-center">
                  <item.icon size={28} className={item.textColor} />
                  <h2 className="text-sm font-medium text-gray-400 mt-2">
                    {item.title}
                  </h2>
                  <p className={`text-lg font-bold mt-1 ${item.textColor}`}>
                    {item.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Crypto List */}
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-indigo-500/30 border-2 border-indigo-500/50 p-4">
              <h2 className="font-semibold text-xl text-gray-100 mb-4">
                Top Cryptocurrencies
              </h2>
              <ul className="space-y-2">
                {cryptoData.map((coin) => (
                  <li
                    key={coin.id}
                    className={`p-3 cursor-pointer flex items-center justify-between rounded-lg ${
                      selectedCrypto === coin.id
                        ? "bg-gray-700 border-l-4 border-indigo-500"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCrypto(coin.id)}
                  >
                    <div className="flex items-center">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                      />
                      <span className="font-medium">{coin.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${coin.current_price.toLocaleString()}
                      </div>
                      <div
                        className={`text-xs flex items-center ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? (
                          <ArrowUp size={10} />
                        ) : (
                          <ArrowDown size={10} />
                        )}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chart */}
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-cyan-500/30 border-2 border-cyan-500/50 p-4 lg:col-span-2">
              <h2 className="font-semibold text-xl text-gray-100 mb-4">
                {cryptoData.find((c) => c.id === selectedCrypto)?.name || ""}{" "}
                Price Chart
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()}>
                    <defs>
                      <linearGradient
                        id="colorPrice"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4f46e5"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4f46e5"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Buy Amount (USD)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      className="flex-1 p-2 rounded-l bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter amount"
                    />
                    <button
                      onClick={handlePurchase}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-r shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
                    >
                      Buy
                    </button>
                  </div>
                </div>
                {purchaseAmount && (
                  <div className="text-sm mt-2 text-gray-300">
                    You will receive:{" "}
                    <span className="text-indigo-400 font-semibold">
                      {(
                        parseFloat(purchaseAmount) /
                        (cryptoData.find((c) => c.id === selectedCrypto)
                          ?.current_price || 1)
                      ).toFixed(6)}{" "}
                      {cryptoData
                        .find((c) => c.id === selectedCrypto)
                        ?.symbol.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <OtpModal />
    </div>
  );
};

export default CryptoDashboard;

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import { 
  Wallet, 
  TrendingUp, 
  BarChart2, 
  Shield, 
  PieChart,
  DollarSign,
  Calendar,
  Settings,
  Bell
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import axios from 'axios';

// Configure axios with CSRF token for Django
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const InvestmentDashboard = () => {
  const [balanceData, setBalanceData] = useState({ balance: 0 });
  const [investmentData, setInvestmentData] = useState({ investments: 0, profits: 0 });
  const [insuranceAmount] = useState(10000);
  const [performanceData, setPerformanceData] = useState([]);
  const [sectorAllocationData, setSectorAllocationData] = useState([]);
  const [monthlyInvestmentData, setMonthlyInvestmentData] = useState([]);
  const [assetAllocationData, setAssetAllocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#10b981', '#f97316', '#f43f5e'];

  const setFallbackData = () => {
    setPerformanceData([
      { name: 'Jan', profit: 2500 },
      { name: 'Feb', profit: 3000 },
      { name: 'Mar', profit: 2800 },
      { name: 'Apr', profit: 3500 },
      { name: 'May', profit: 4000 },
      { name: 'Jun', profit: 3700 },
      { name: 'Jul', profit: 4200 },
    ]);
    
    setSectorAllocationData([
      { name: 'Technology', value: 35 },
      { name: 'Healthcare', value: 20 },
      { name: 'Finance', value: 15 },
      { name: 'Consumer', value: 10 },
      { name: 'Energy', value: 10 },
      { name: 'Others', value: 10 },
    ]);
    
    setMonthlyInvestmentData([
      { name: 'Jan', amount: 1200 },
      { name: 'Feb', amount: 1400 },
      { name: 'Mar', amount: 1100 },
      { name: 'Apr', amount: 1600 },
      { name: 'May', amount: 1800 },
      { name: 'Jun', amount: 1500 },
      { name: 'Jul', amount: 2000 },
    ]);
    
    setAssetAllocationData([
      { label: 'Stocks', value: 60, color: 'bg-indigo-500', textColor: 'text-indigo-300' },
      { label: 'Bonds', value: 25, color: 'bg-cyan-500', textColor: 'text-cyan-300' },
      { label: 'Cash', value: 10, color: 'bg-violet-500', textColor: 'text-violet-300' },
      { label: 'Alternatives', value: 5, color: 'bg-emerald-500', textColor: 'text-emerald-300' }
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const balanceResponse = await axios.get('/api/accounts/user/balance/');
        setBalanceData(balanceResponse.data);
        setUsername(balanceResponse.data.email ? balanceResponse.data.email.split('@')[0] : 'JP');
        
        const investmentResponse = await axios.get('/api/accounts/investments/');
        setInvestmentData(investmentResponse.data);
        
        const performanceResponse = await axios.get('/api/accounts/performance/');
        setPerformanceData(Array.isArray(performanceResponse.data) ? performanceResponse.data : []);
        
        const sectorResponse = await axios.get('/api/accounts/sector-allocation/');
        setSectorAllocationData(Array.isArray(sectorResponse.data) ? sectorResponse.data : []);
        
        const monthlyResponse = await axios.get('/api/accounts/monthly-investments/');
        setMonthlyInvestmentData(Array.isArray(monthlyResponse.data) ? monthlyResponse.data : []);
        
        const assetResponse = await axios.get('/api/accounts/asset-allocation/');
        // Ensure assetAllocationData is an array
        setAssetAllocationData(Array.isArray(assetResponse.data) ? assetResponse.data : []);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
        setFallbackData();
      }
    };
    
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-gray-100 items-center justify-center">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 pt-20">
      <div className="w-16 lg:w-64 bg-gray-800 shadow-lg p-4 hidden md:block">
        <div className="flex flex-col items-center lg:items-start space-y-8 mt-6">
          <div className="flex items-center space-x-3">
            <DollarSign size={24} className="text-indigo-400" />
            <span className="font-bold text-xl hidden lg:block text-indigo-400">WealthPulse</span>
          </div>
          
          {[
            { icon: Wallet, label: "Dashboard", color: "text-indigo-400" },
            { icon: PieChart, label: "Portfolio", color: "text-cyan-400" },
            { icon: TrendingUp, label: "Markets", color: "text-emerald-400" },
            { icon: Calendar, label: "Planning", color: "text-violet-400" },
            { icon: Shield, label: "Security", color: "text-amber-400" },
            { icon: Settings, label: "Settings", color: "text-pink-400" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-700 cursor-pointer ${i === 0 ? 'bg-gray-700' : ''}`}>
              <item.icon size={20} className={i === 0 ? item.color : "text-gray-400"} />
              <span className={`hidden lg:block ${i === 0 ? item.color + " font-medium" : "text-gray-400"}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Investment Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{username.substring(0, 2).toUpperCase()}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[
            { title: "Balance", amount: formatCurrency(balanceData.balance), icon: Wallet, glow: "shadow-lg shadow-indigo-500/50", color: "bg-gray-800", textColor: "text-indigo-400", borderColor: "border-indigo-500" }, 
            { title: "Investments", amount: formatCurrency(investmentData.investments), icon: TrendingUp, glow: "shadow-lg shadow-cyan-500/50", color: "bg-gray-800", textColor: "text-cyan-400", borderColor: "border-cyan-500" }, 
            { title: "Profits", amount: formatCurrency(investmentData.profits), icon: BarChart2, glow: "shadow-lg shadow-emerald-500/50", color: "bg-gray-800", textColor: "text-emerald-400", borderColor: "border-emerald-500" },
            { title: "Insurance", amount: formatCurrency(insuranceAmount), icon: Shield, glow: "shadow-lg shadow-violet-500/50", color: "bg-gray-800", textColor: "text-violet-400", borderColor: "border-violet-500" }, 
            { title: "Risk Level", amount: "Moderate", icon: PieChart, glow: "shadow-lg shadow-amber-500/50", color: "bg-gray-800", textColor: "text-amber-400", borderColor: "border-amber-500" }
          ].map((item, index) => (
            <Card key={index} className={`${item.color} ${item.glow} rounded-xl border-2 ${item.borderColor} hover:shadow-xl transition-all duration-300`}>
              <CardContent className="flex flex-col items-center p-4">
                <item.icon size={28} className={item.textColor} />
                <h2 className="text-sm font-medium text-gray-400 mt-2">{item.title}</h2>
                <p className={`text-lg font-bold mt-1 ${item.textColor}`}>{item.amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gray-800 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 border-2 border-indigo-500/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Investment Performance</h2>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#f3f4f6" }} />
                  <Area type="monotone" dataKey="profit" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 border-2 border-cyan-500/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Sector Allocation</h2>
              <ResponsiveContainer width="100%" height={240}>
                <RechartsPieChart>
                  <Pie
                    data={sectorAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#f3f4f6" }} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 border-2 border-violet-500/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Monthly Investments</h2>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyInvestmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#f3f4f6" }} />
                  <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 border-2 border-emerald-500/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Asset Allocation</h2>
              <div className="space-y-4">
                {Array.isArray(assetAllocationData) && assetAllocationData.length > 0 ? (
                  assetAllocationData.map((asset, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={asset.textColor}>{asset.label}</span>
                        <span className={asset.textColor}>{asset.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${asset.color} h-2 rounded-full`} 
                          style={{ width: `${asset.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No asset allocation data available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 border-2 border-amber-500/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Investment Recommendations</h2>
              <div className="space-y-4">
                {[
                  { title: "Increase Technology Exposure", description: "Tech sector is projected to outperform the market", action: "View Opportunities" },
                  { title: "Rebalance Portfolio", description: "Current allocation deviates from target by 8%", action: "Rebalance" },
                  { title: "Dividend Stocks", description: "Consider adding more dividend assets to your portfolio", action: "Explore" }
                ].map((rec, index) => (
                  <div key={index} className="flex flex-col space-y-2 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all">
                    <h3 className="font-medium text-amber-400">{rec.title}</h3>
                    <p className="text-sm text-gray-300">{rec.description}</p>
                    <Button className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 text-xs py-1">
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 border-2 border-pink-500/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Deposit Funds", color: "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border-indigo-500/50" },
                  { label: "Withdraw", color: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/50" },
                  { label: "Buy Assets", color: "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/50" },
                  { label: "Sell Assets", color: "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border-cyan-500/50" },
                  { label: "Set Goals", color: "bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 border-violet-500/50" },
                  { label: "Tax Reports", color: "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border-amber-500/50" }
                ].map((action, index) => (
                  <Button 
                    key={index} 
                    className={`${action.color} border py-6 flex items-center justify-center font-medium`}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 WealthPulse. All rights reserved.</p>
          <p className="mt-1">Investment data is simulated for demonstration purposes.</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
    <div className="flex pt-14">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-[#0a192f] text-white p-6 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-cyan-400 text-center drop-shadow-[0_0_10px_cyan]">Investment Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ title: "Account Balance", amount: "$15,240", icon: Wallet }, { title: "Total Investments", amount: "$28,700", icon: TrendingUp }, { title: "Estimated Profits", amount: "$5,320", icon: BarChart2 }].map((item, index) => (
            <Card key={index} className="bg-[#112240] p-6 rounded-2xl shadow-md transition-all hover:shadow-[0_0_15px_cyan]">
              <CardContent className="flex flex-col items-center">
                <item.icon size={40} className="text-cyan-400" />
                <h2 className="text-xl font-semibold text-cyan-300 mt-2">{item.title}</h2>
                <p className="text-2xl font-bold mt-2">{item.amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ title: "Insurance Coverage", amount: "$10,000", icon: Shield }, { title: "Asset Allocation", amount: "Stocks: 60% | Bonds: 30% | Others: 10%", icon: PieChart }].map((item, index) => (
            <Card key={index} className="bg-[#112240] p-6 rounded-2xl shadow-md transition-all hover:shadow-[0_0_15px_cyan]">
              <CardContent className="flex flex-col items-center">
                <item.icon size={40} className="text-cyan-400" />
                <h2 className="text-xl font-semibold text-cyan-300 mt-2">{item.title}</h2>
                <p className="text-2xl font-bold mt-2">{item.amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#112240] p-6 rounded-2xl shadow-md hover:shadow-[0_0_15px_cyan] transition-all">
          <h2 className="text-2xl font-semibold text-cyan-300">Investment Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c3a5c" />
              <XAxis dataKey="name" stroke="cyan" />
              <YAxis stroke="cyan" />
              <Tooltip contentStyle={{ backgroundColor: "#112240", borderColor: "cyan" }} />
              <Line type="monotone" dataKey="profit" stroke="cyan" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center">
          <Button className="bg-cyan-400 text-[#0a192f] px-6 py-3 rounded-xl shadow-md font-bold hover:bg-cyan-300 transition-all hover:shadow-[0_0_15px_cyan]">
            Buy / Sell Assets
          </Button>
        </div>
      </div>
    </div>
          </>
  );
};

export default Dashboard;

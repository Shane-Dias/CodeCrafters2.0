import React from "react";
import { Wallet, TrendingUp, BarChart2, Shield, PieChart, Home, FileText, Activity, Settings } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import React from 'react';
import { Card, CardContent } from '../Components/Card';
import { Button } from '../Components/Button';
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

const InvestmentDashboard = () => {
  // Sample data for charts
  const performanceData = [
    { name: 'Jan', profit: 2500 },
    { name: 'Feb', profit: 3000 },
    { name: 'Mar', profit: 2800 },
    { name: 'Apr', profit: 3500 },
    { name: 'May', profit: 4000 },
    { name: 'Jun', profit: 3700 },
    { name: 'Jul', profit: 4200 },
  ];
  
  const sectorAllocationData = [
    { name: 'Technology', value: 35 },
    { name: 'Healthcare', value: 20 },
    { name: 'Finance', value: 15 },
    { name: 'Consumer', value: 10 },
    { name: 'Energy', value: 10 },
    { name: 'Others', value: 10 },
  ];
  
  const monthlyInvestmentData = [
    { name: 'Jan', amount: 1200 },
    { name: 'Feb', amount: 1400 },
    { name: 'Mar', amount: 1100 },
    { name: 'Apr', amount: 1600 },
    { name: 'May', amount: 1800 },
    { name: 'Jun', amount: 1500 },
    { name: 'Jul', amount: 2000 },
  ];

  const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#10b981', '#f97316', '#f43f5e'];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 pt-20">
    <div className="w-16 lg:w-64 bg-gray-800 shadow-lg p-4 hidden md:block">
      {/* Sidebar content */}
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
            <span className="text-white font-medium">JP</span>
          </div>
        </div>
      </div>
      
      {/* Stats Cards with glowing effects */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { title: "Balance", amount: "$15,240", icon: Wallet, glow: "shadow-lg shadow-indigo-500/50", color: "bg-gray-800", textColor: "text-indigo-400", borderColor: "border-indigo-500" }, 
          { title: "Investments", amount: "$28,700", icon: TrendingUp, glow: "shadow-lg shadow-cyan-500/50", color: "bg-gray-800", textColor: "text-cyan-400", borderColor: "border-cyan-500" }, 
          { title: "Profits", amount: "$5,320", icon: BarChart2, glow: "shadow-lg shadow-emerald-500/50", color: "bg-gray-800", textColor: "text-emerald-400", borderColor: "border-emerald-500" },
          { title: "Insurance", amount: "$10,000", icon: Shield, glow: "shadow-lg shadow-violet-500/50", color: "bg-gray-800", textColor: "text-violet-400", borderColor: "border-violet-500" }, 
          { title: "Risk Level", amount: "Moderate", icon: PieChart, glow: "shadow-lg shadow-amber-500/50", color: "bg-gray-800", textColor: "text-amber-400", borderColor: "border-amber-500" }
        ].map((item, index) => (
          <Card key={index} className={`${item.color} ${item.glow} rounded-xl border-2 ${item.borderColor} hover:shadow-xl hover:shadow-${item.textColor}/50 transition-all duration-300`}>
            <CardContent className="flex flex-col items-center p-4">
              <item.icon size={28} className={item.textColor} />
              <h2 className={`text-sm font-medium text-gray-400 mt-2`}>{item.title}</h2>
              <p className={`text-lg font-bold mt-1 ${item.textColor}`}>{item.amount}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Charts Section with glowing effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Performance Chart */}
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
        
        {/* Sector Allocation Chart with glowing effect */}
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
      
      {/* Additional Charts with glowing effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Monthly Investment Chart */}
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
        
        {/* Asset Allocation Breakdown with glowing effect */}
        <Card className="bg-gray-800 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 border-2 border-emerald-500/50">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Asset Allocation</h2>
            <div className="space-y-4">
              {[
                { label: "Stocks", value: 60, color: "bg-indigo-500", textColor: "text-indigo-300" },
                { label: "Bonds", value: 25, color: "bg-cyan-500", textColor: "text-cyan-300" },
                { label: "Cash", value: 10, color: "bg-violet-500", textColor: "text-violet-300" },
                { label: "Alternatives", value: 5, color: "bg-emerald-500", textColor: "text-emerald-300" }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className={`${item.textColor} font-medium`}>{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className={`${item.color} h-2.5 rounded-full shadow-lg shadow-${item.color}/50`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Action Buttons with glowing effects */}
      <div className="flex justify-center gap-4">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all">
          Buy Assets
        </Button>
        <Button className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-gray-200 px-6 py-2 rounded-lg shadow-lg shadow-gray-700/50 hover:shadow-gray-700/70 transition-all">
          Sell Assets
        </Button>
      </div>
    </div>
  </div>
  );
};

export default InvestmentDashboard;
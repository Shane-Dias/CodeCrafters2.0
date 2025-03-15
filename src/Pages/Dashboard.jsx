import React from "react";
import { Wallet, TrendingUp, BarChart2, Shield, PieChart, Home, FileText, Activity, Settings } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";

const data = [
  { name: "Jan", profit: 4000 },
  { name: "Feb", profit: 3000 },
  { name: "Mar", profit: 5000 },
  { name: "Apr", profit: 7000 },
  { name: "May", profit: 6000 },
];

const Sidebar = () => {
  return (
    <div className="bg-[#0a192f] w-64 min-h-screen p-6 flex flex-col shadow-lg border-r border-cyan-400">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Investment Hub</h2>
      <nav className="space-y-4">
        {[{ name: "Dashboard", icon: Home }, { name: "Portfolio", icon: Wallet }, { name: "Transactions", icon: FileText }, { name: "Insights", icon: Activity }, { name: "Settings", icon: Settings }].map((item, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 text-white hover:bg-cyan-400 hover:text-[#0a192f] rounded-lg cursor-pointer transition-all">
            <item.icon size={24} />
            <span className="text-lg font-medium">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex">
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
  );
};

export default Dashboard;

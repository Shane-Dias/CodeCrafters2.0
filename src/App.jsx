import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";

import SignUp from "./Components/SignUp";
import Login from "./Components/Login"

import News from "./Components/News";

import StockComparison from "./Components/StockComparison";

import Chatbot from "./Components/chartbotTrial";

import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Market from "./Pages/Market";
import StockChart from "./Components/StockChart";

function App() {
  return (
    
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/stockchart" element={<StockChart />} />
        <Route path="/news" element={<News />} /> {/* Add the news route */}
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/compare-stocks" element={<StockComparison />} />
        
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

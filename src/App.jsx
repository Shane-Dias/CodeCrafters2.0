import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import InvestmentForm from "./Pages/InvestmentForm";
// import { RegistrationForm } from "./components/RegistrationForm";
// import { SignUp } from "./components/SignUp";
// import Home from "./pages/Home";
// import About from "./pages/About";

import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import News from "./Components/News";

import StockComparison from "./Components/StockComparison";

import Chatbot from "./Components/chartbotTrial";
import ChatbotWidget from "./Components/Chatbot_Widget";

import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Market from "./Pages/Market";
import Investhub from "./Pages/Investhub";
import View from "./Pages/View";
import Crypto from "./Pages/Crypto";
import Trade from "./Pages/Trade";
import StockChart from "./Components/StockChart";
import Exchange from "./Pages/Exchange";
import Transaction from "./Pages/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ChatbotWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/" element={<RegistrationForm />}></Route> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/investhub" element={<Investhub />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/stockchart" element={<StockChart />} />
        <Route path="/news" element={<News />} /> {/* Add the news route */}
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/investmentsuggestions" element={<InvestmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

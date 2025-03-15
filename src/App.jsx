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

import News from "./components/News";

import Chatbot from "./Components/chartbotTrial";

import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Market from "./Pages/Market";
import Investhub from "./Pages/Investhub";
import View from "./Pages/View";
import Crypto from "./Pages/Crypto";
import StockChart from "./Components/StockChart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/" element={<RegistrationForm />}></Route> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/invest_sugg" element={<InvestmentForm />} />
        <Route path="/investhub" element={<Investhub />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/stockchart" element={<StockChart />} />
        <Route path="/news" element={<News />} /> {/* Add the news route */}
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

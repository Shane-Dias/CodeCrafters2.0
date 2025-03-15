import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import InvestmentForm from "./Pages/InvestmentForm";
// import { RegistrationForm } from "./components/RegistrationForm";
// import { SignUp } from "./components/SignUp";
// import Home from "./pages/Home";
// import About from "./pages/About";

import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Market from "./Pages/Market";
import Investhub from "./Pages/Investhub";
import View from "./Pages/View";

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
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

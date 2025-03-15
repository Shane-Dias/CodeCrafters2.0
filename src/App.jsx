import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SignUp from "./Components/SignUp";  // ✅ Corrected Import
import Login from "./Components/Login";  // ✅ Corrected Import
import StockChart from "./Components/StockChart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />  {/* ✅ Changed path to "/signup" */}
        <Route path="/login" element={<Login />} />  {/* ✅ Changed path to "/login" */}
        <Route path="/stockchart" element={<StockChart />} />  {/* ✅ Changed path to "/login" */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

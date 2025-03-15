import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";


import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Market from "./Pages/Market";
import Investhub from "./Pages/Investhub";
import View from "./Pages/View";
import Crypto from "./Pages/Crypto";

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/investhub" element={<Investhub />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/crypto" element={<Crypto />} />
        
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

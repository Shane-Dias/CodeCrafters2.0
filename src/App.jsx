import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SignUp from "./Components/SignUp";  // ✅ Corrected Import
import Login from "./Components/Login";  // ✅ Corrected Import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />  {/* ✅ Changed path to "/signup" */}
        <Route path="/login" element={<Login />} />  {/* ✅ Changed path to "/signup" */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
// import { RegistrationForm } from "./components/RegistrationForm";
// import { SignUp } from "./components/SignUp";
// import Home from "./pages/Home";
// import About from "./pages/About";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/" element={<RegistrationForm />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

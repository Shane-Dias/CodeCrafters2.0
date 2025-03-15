import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
=======
import {RegistrationForm} from "./components/RegistrationForm"
import {SignUp} from "./components/SignUp"
// import Home from "./pages/Home";
// import About from "./pages/About";
>>>>>>> Stashed changes

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        {/* <Route path="/about" element={<About />} /> */}
=======
       <Route path="/" element={<RegistrationForm />} ></Route>
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

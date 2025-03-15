import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream

import Home from "./Pages/Home";
=======
import {RegistrationForm} from "./components/RegistrationForm"
import {SignUp} from "./components/SignUp"
// import Home from "./pages/Home";
// import About from "./pages/About";
>>>>>>> Stashed changes
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
=======
       <Route path="/" element={<RegistrationForm />} ></Route>
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Navbar from "./components/NavBar";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import FullMenu from "./components/FullMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <LandingPage />
          <About />
          <Menu />
          <Contact />
        </>} />
        <Route path="/FullMenu" element={<FullMenu />} />
      </Routes>
    </Router>
  );
}



export default App;


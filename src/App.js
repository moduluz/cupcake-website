import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Navbar from "./components/NavBar";
import Menu from "./components/Menu";
import { AuthProvider } from "./contexts/AuthContext";
import Contact from "./components/Contact";
import FullMenu from "./components/FullMenu";
import Login from "./components/Login";
import Register from './components/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
       {/* Move Navbar outside Routes to appear on all pages */}
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <LandingPage />
          <About />
          <Menu />
          <Contact />
        </>} />
        <Route path="/fullmenu" element={<FullMenu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    
      </AuthProvider>

    </Router>
  );
}

export default App;

// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Navbar from "./components/NavBar";
import Menu from "./components/Menu";
import { AuthProvider } from "./contexts/AuthContext";
import Contact from "./components/Contact";
import FullMenu from "./components/FullMenu";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import ProfileOverview from './components/profile/ProfileOverview';
import OrderHistory from './components/profile/OrderHistory';
import Settings from './components/profile/Settings';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';


const menuCategories = {
  cheesecakes: {
    title: "Signature Cheesecakes",
    items: [
      {
        id: 1,
        title: "Classic New York",
        description: "Rich and creamy traditional cheesecake with graham cracker crust",
        price: "₹299",
        image: "https://source.unsplash.com/300x300/?cheesecake"
      },
      // ... (rest of the cheesecakes)
    ]
  },
  // ... (other menu categories)
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ConditionalNavbar />

        <Routes>
          <Route path="/" element={<>
            <LandingPage />
            <About />
            <Menu />
            <Contact />
          </>} />
          <Route path="/checkout" element={<Checkout menuCategories={menuCategories} />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/fullmenu" element={<FullMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/overview" element={<ProfileOverview />} />
          <Route path="/profile/OrderHistory" element={<OrderHistory />} />
          <Route path="/profile/Settings" element={<Settings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();

  // Render Navbar only if the current route is '/'
  return location.pathname === "/" ? <Navbar /> : null;
}

export default App;


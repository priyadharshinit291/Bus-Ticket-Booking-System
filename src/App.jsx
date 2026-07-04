import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Booking from "./pages/Booking";
import Success from "./pages/Success";
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Main App component - sets up routing for the whole application
function App() {
  return (
    <BrowserRouter>
      {/* Navbar is shown on every page */}
      <Navbar />

      {/* min-vh-100 ensures the footer stays at the bottom on short pages */}
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/booking/:busId" element={<Booking />} />
          <Route path="/success" element={<Success />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Footer is shown on every page */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

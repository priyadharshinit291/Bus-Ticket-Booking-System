import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import Booking from "./Pages/Booking";
import Success from "./Pages/Success";
import MyBookings from "./Pages/MyBookings";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

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

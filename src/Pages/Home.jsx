import React from "react";
import SearchForm from "../components/SearchForm";

// Landing page: hero banner + search form
function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <h1>Travel Smart, Book Fast 🚌</h1>
          <p className="lead">
            Find and book bus tickets to your favorite destinations at the best prices.
          </p>
        </div>
      </section>

      {/* Search form overlaps the bottom of the hero section */}
      <div className="container">
        <SearchForm />
      </div>

      {/* Simple highlights section */}
      <div className="container my-5">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h3>🎫</h3>
              <h5>Easy Booking</h5>
              <p className="text-muted small">Book your ticket in just a few clicks, anytime, anywhere.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h3>💺</h3>
              <h5>Choose Your Seat</h5>
              <p className="text-muted small">Pick your favorite seat with our interactive seat map.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h3>🔒</h3>
              <h5>Secure & Reliable</h5>
              <p className="text-muted small">Your booking details are safely stored and easy to manage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

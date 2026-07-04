import React, { useState } from "react";
import "./Footer.css";

// Footer shown on every page: stats strip, brand blurb, quick links,
// contact info, and newsletter signup.
function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="app-footer">
      {/* Decorative wave divider at the top edge of the footer */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,30 C300,70 900,-10 1200,30 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Stats highlight strip */}
      <div className="footer-stats">
        <div className="container">
          <div className="row text-center gy-3">
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-black"><i className="bi bi-people-fill me-1"></i>2M+</div>
              <div className="small">Happy Travelers</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-black"><i className="bi bi-bus-front-fill me-1"></i>5,000+</div>
              <div className="small">Buses Listed</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-black"><i className="bi bi-signpost-split-fill me-1"></i>800+</div>
              <div className="small">Routes Covered</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-black"><i className="bi bi-star-fill me-1"></i>4.6/5</div>
              <div className="small">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gy-4 pt-2">
          {/* Brand + about */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white d-flex align-items-center gap-2">
              <span className="fs-4">🚌</span>QuickRide
            </h5>
            <p className="small mb-3">
              Book your bus tickets online quickly and safely. Travel comfortably with our trusted bus partners
              across the country.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled small footer-links">
              <li><a href="/"><i className="bi bi-chevron-right small me-1"></i>Home</a></li>
              <li><a href="/search-results"><i className="bi bi-chevron-right small me-1"></i>Search Buses</a></li>
              <li><a href="/my-bookings"><i className="bi bi-chevron-right small me-1"></i>My Bookings</a></li>
              <li><a href="/contact"><i className="bi bi-chevron-right small me-1"></i>Contact</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white mb-3">Get In Touch</h6>
            <ul className="list-unstyled small footer-links">
              <li className="d-flex align-items-start mb-3">
                <span className="footer-icon-badge"><i className="bi bi-geo-alt-fill"></i></span>
                <span>123 MG Road, Chennai, India</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <span className="footer-icon-badge"><i className="bi bi-telephone-fill"></i></span>
                <span>+91 98765 43210</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <span className="footer-icon-badge"><i className="bi bi-envelope-fill"></i></span>
                <span>support@QuickRide.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white mb-3">Stay Updated</h6>
            <p className="small mb-2">Subscribe for the best offers and travel deals.</p>
            <form onSubmit={handleSubscribe} className="newsletter-group">
              <i className="bi bi-envelope newsletter-icon"></i>
              <input
                type="email"
                className="form-control form-control-sm newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm ms-2 fw-semibold">
                Subscribe
              </button>
            </form>
            {subscribed && (
              <div className="small text-success mt-2">
                <i className="bi bi-check-circle-fill me-1"></i>Subscribed successfully!
              </div>
            )}
          </div>
        </div>

        <hr className="border-secondary mt-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start small mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} BusGo. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end small">
            <a href="/contact" className="me-3">Privacy Policy</a>
            <a href="/contact" className="me-3">Terms of Service</a>
            <a href="/contact">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

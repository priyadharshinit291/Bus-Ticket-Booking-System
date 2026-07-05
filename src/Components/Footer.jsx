import { FaBusAlt, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="wf-footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-6 col-md-3">
            <div className="wf-brand mb-2" style={{ fontSize: '1.3rem' }}>
              <FaBusAlt className="text-amber" /> Wayfare<span className="dot">.</span>
            </div>
            <p style={{ fontSize: '0.85rem', maxWidth: 220 }}>
              Comparing and booking intercity bus tickets across the country, one seat at a time.
            </p>
          </div>
          <div className="col-6 col-md-3">
            <h6>Company</h6>
            <a href="#about">About Us</a>
            <a href="#careers">Careers</a>
            <a href="#press">Press</a>
          </div>
          <div className="col-6 col-md-3">
            <h6>Support</h6>
            <a href="#help">Help Center</a>
            <a href="#cancel">Cancellations</a>
            <a href="#contact">Contact Us</a>
          </div>
          <div className="col-6 col-md-3">
            <h6>Follow</h6>
            <div className="d-flex gap-3 fs-5">
              <a href="#instagram"><FaInstagram /></a>
              <a href="#twitter"><FaTwitter /></a>
              <a href="#facebook"><FaFacebookF /></a>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '2rem 0 1rem' }} />
        <p style={{ fontSize: '0.78rem', textAlign: 'center', margin: 0 }}>
          © {new Date().getFullYear()} Wayfare. All routes lead somewhere. (Demo project — no real bookings.)
        </p>
      </div>
    </footer>
  );
}

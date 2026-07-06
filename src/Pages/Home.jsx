import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaMapMarkerAlt, FaRegCalendarAlt, FaShieldAlt, FaTicketAlt, FaHeadset } from 'react-icons/fa';
import { cities, popularRoutes } from '../Data/Buses';
import { useBooking } from '../Context/BookingContext';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export default function Home() {
  const navigate = useNavigate();
  const { search, setSearch } = useBooking();
  const [local, setLocal] = useState({
    from: search.from || 'Chennai',
    to: search.to || 'Bengaluru',
    date: search.date || todayISO(),
  });
  const [error, setError] = useState('');

  function swap() {
    setLocal((s) => ({ ...s, from: s.to, to: s.from }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (local.from === local.to) {
      setError('Origin and destination cannot be the same.');
      return;
    }
    setError('');
    setSearch(local);
    navigate('/search');
  }

  function selectRoute(route) {
    const updated = { ...local, from: route.from, to: route.to };
    setLocal(updated);
    setSearch(updated);
    navigate('/search');
  }

  return (
    <>
      <section className="wf-hero">
        <div className="headlight" style={{ width: 380, height: 380, top: -120, left: -80 }} />
        <div className="headlight" style={{ width: 300, height: 300, top: 40, right: -60, opacity: 0.2 }} />
        <div className="container position-relative">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 mb-5 mb-lg-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="eyebrow" style={{ color: '#ffb08c' }}>city to city, on schedule</span>
              <h1 className="wf-hero-title mt-2 mb-3">
                Catch your bus<br />before it <span className="accent">catches dust.</span>
              </h1>
              <p className="wf-hero-sub">
                Compare operators, pick your favourite seat, and hold a confirmed ticket
                in under two minutes — no counters, no queues.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="container position-relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="search-card">
            <form onSubmit={handleSubmit}>
              <div className="row g-3 align-items-end">
                <div className="col-12 col-md-3 search-field">
                  <label><FaMapMarkerAlt className="me-1" />From</label>
                  <select
                    className="form-select"
                    value={local.from}
                    onChange={(e) => setLocal({ ...local, from: e.target.value })}
                  >
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="col-auto d-flex justify-content-center order-md-0">
                  <button type="button" className="swap-btn" onClick={swap} aria-label="Swap origin and destination">
                    <FaExchangeAlt />
                  </button>
                </div>

                <div className="col-12 col-md-3 search-field">
                  <label><FaMapMarkerAlt className="me-1" />To</label>
                  <select
                    className="form-select"
                    value={local.to}
                    onChange={(e) => setLocal({ ...local, to: e.target.value })}
                  >
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="col-12 col-md-3 search-field">
                  <label><FaRegCalendarAlt className="me-1" />Date of Journey</label>
                  <input
                    type="date"
                    className="form-control"
                    min={todayISO()}
                    value={local.date}
                    onChange={(e) => setLocal({ ...local, date: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-3">
                  <button type="submit" className="btn btn-amber w-100">Search Buses</button>
                </div>
              </div>
              {error && <div className="text-danger mt-2 small fw-semibold">{error}</div>}
            </form>
          </div>
        </motion.div>
        <div className="road-line" />
      </section>

      <section className="container py-5">
        <span className="eyebrow">frequent routes</span>
        <h3 className="mt-2 mb-4">Popular Journeys</h3>
        <div className="d-flex flex-wrap gap-2">
          {popularRoutes.map((r, i) => (
            <button
              key={i}
              className="route-chip border-0"
              onClick={() => selectRoute(r)}
            >
              {r.from} → {r.to}
            </button>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Verified Operators"
            text="Every operator on Wayfare is vetted for safety records and on-time performance."
          />
          <FeatureCard
            icon={<FaTicketAlt />}
            title="Instant E-Tickets"
            text="Your ticket and PNR are generated the moment payment succeeds — no waiting."
          />
          <FeatureCard
            icon={<FaHeadset />}
            title="24×7 Support"
            text="Delayed bus? Wrong seat? Our support team is one tap away, around the clock."
          />
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="col-md-4">
      <motion.div
        className="ticket-card p-4 h-100"
        whileHover={{ y: -4 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
      >
        <div className="fs-3 text-amber mb-3">{icon}</div>
        <h5 className="display-font" style={{ fontSize: '1.1rem' }}>{title}</h5>
        <p className="text-secondary mb-0" style={{ fontSize: '0.92rem' }}>{text}</p>
      </motion.div>
    </div>
  );
}

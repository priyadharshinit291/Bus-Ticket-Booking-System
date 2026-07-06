import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar, FaWifi, FaBolt, FaTint, FaTv, FaSuitcaseRolling, FaFilter, FaArrowLeft,
} from 'react-icons/fa';
import { GiRolledCloth } from 'react-icons/gi';
import { generateBuses } from '../Data/Buses';
import { useBooking } from '../context/BookingContext';
import TicketDivider from '../Components/TicketDivider';
import StepTrack from '../Components/StepTrack';

const amenityIcons = {
  wifi: <FaWifi title="WiFi" />,
  charging: <FaBolt title="Charging point" />,
  water: <FaTint title="Water bottle" />,
  blanket: <GiRolledCloth title="Blanket" />,
  tv: <FaTv title="Entertainment" />,
};

const busTypeFilters = ['AC', 'Non-AC', 'Sleeper', 'Seater'];

export default function SearchResults() {
  const { search, setSelectedBus } = useBooking();
  const navigate = useNavigate();
  const allBuses = useMemo(
    () => generateBuses(search.from, search.to, search.date),
    [search.from, search.to, search.date]
  );

  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('departure');

  if (!search.from || !search.to) {
    navigate('/');
    return null;
  }

  function toggleFilter(f) {
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  let buses = allBuses.filter((b) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some((f) => b.type.includes(f));
  });

  buses = [...buses].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'seats') return b.seatsLeft - a.seatsLeft;
    return a.departure.localeCompare(b.departure);
  });

  function handleSelect(bus) {
    setSelectedBus(bus);
    navigate('/seats');
  }

  return (
    <div className="container py-4">
      <button className="btn btn-sm btn-outline-line mb-3" onClick={() => navigate('/')}>
        <FaArrowLeft className="me-2" />Modify Search
      </button>

      <StepTrack current={1} />

      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
        <div>
          <span className="eyebrow">{search.date}</span>
          <h3 className="mt-1 mb-0">{search.from} <span className="text-amber">→</span> {search.to}</h3>
          <p className="text-secondary mb-0">{buses.length} buses found</p>
        </div>
        <div className="search-field mt-3 mt-md-0" style={{ minWidth: 200 }}>
          <label>Sort by</label>
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="departure">Departure Time</option>
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating</option>
            <option value="seats">Seats Available</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="filter-panel">
            <h6><FaFilter className="me-2" />Bus Type</h6>
            {busTypeFilters.map((f) => (
              <div className="form-check mb-2" key={f}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={f}
                  checked={activeFilters.includes(f)}
                  onChange={() => toggleFilter(f)}
                />
                <label className="form-check-label" htmlFor={f} style={{ fontSize: '0.9rem' }}>
                  {f}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-9">
          <AnimatePresence>
            {buses.map((bus, idx) => (
              <motion.div
                key={bus.id}
                className="ticket-card mb-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <div className="d-flex flex-column flex-md-row">
                  <div className="ticket-main flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <div className="bus-operator">{bus.operator}</div>
                        <div className="bus-type">{bus.type}</div>
                      </div>
                      <span className="rating-pill"><FaStar />{bus.rating}</span>
                    </div>

                    <div className="timeline">
                      <div>
                        <div className="time">{bus.departure}</div>
                        <div className="place">{bus.from}</div>
                      </div>
                      <div className="duration-line">
                        <span>{bus.duration}</span>
                      </div>
                      <div className="text-end">
                        <div className="time">{bus.arrival}</div>
                        <div className="place">{bus.to}</div>
                      </div>
                    </div>

                    <div className="d-flex gap-3 mt-2">
                      {bus.amenities.map((a) => (
                        <span className="amenity-icon" key={a}>{amenityIcons[a]}</span>
                      ))}
                      <FaSuitcaseRolling className="amenity-icon" title="Luggage allowed" />
                    </div>
                  </div>

                  <div className="d-none d-md-block" style={{ width: 1 }}>
                    <div style={{ height: '100%', borderLeft: '2px dashed #eee' }} />
                  </div>

                  <div className="ticket-side">
                    <div className="price-tag">₹{bus.price}<small className="ms-1">onwards</small></div>
                    <span className={`seats-left ${bus.seatsLeft <= 5 ? 'low' : 'ok'}`}>
                      {bus.seatsLeft} seats left
                    </span>
                    <button className="btn btn-amber btn-sm mt-2" onClick={() => handleSelect(bus)}>
                      Select Seats
                    </button>
                  </div>
                </div>
                <TicketDivider notchColor="#f7f3e9" />
              </motion.div>
            ))}
          </AnimatePresence>

          {buses.length === 0 && (
            <div className="text-center py-5 text-secondary">
              No buses match your filters. Try clearing them.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

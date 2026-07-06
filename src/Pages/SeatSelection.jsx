import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { generateSeatMap, boardingPoints, droppingPoints } from '../data/Buses';
import { useBooking } from '../context/BookingContext';
import StepTrack from '../Components/StepTrack';

export default function SeatSelection() {
  const { selectedBus, selectedSeats, setSelectedSeats, boarding, setBoarding, dropping, setDropping } = useBooking();
  const navigate = useNavigate();
  const seats = useMemo(
    () => (selectedBus ? generateSeatMap(selectedBus.seatsLeft) : []),
    [selectedBus]
  );

  const [localBoarding, setLocalBoarding] = useState(boarding || boardingPoints[0].name);
  const [localDropping, setLocalDropping] = useState(dropping || droppingPoints[0].name);

  if (!selectedBus) {
    navigate('/search');
    return null;
  }

  function toggleSeat(seat) {
    if (seat.status === 'booked') return;
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.number === seat.number);
      if (exists) return prev.filter((s) => s.number !== seat.number);
      if (prev.length >= 6) return prev;
      return [...prev, seat];
    });
  }

  function isSelected(seat) {
    return selectedSeats.some((s) => s.number === seat.number);
  }

  function continueToDetails() {
    setBoarding(localBoarding);
    setDropping(localDropping);
    navigate('/details');
  }

  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  const total = selectedSeats.length * selectedBus.price;

  return (
    <div className="container py-4">
      <button className="btn btn-sm btn-outline-line mb-3" onClick={() => navigate('/search')}>
        <FaArrowLeft className="me-2" />Change Bus
      </button>

      <StepTrack current={2} />

      <div className="row mb-4">
        <div className="col-12">
          <div className="ticket-card ticket-main d-flex flex-wrap justify-content-between align-items-center">
            <div>
              <div className="bus-operator">{selectedBus.operator}</div>
              <div className="bus-type">{selectedBus.type} · {selectedBus.from} → {selectedBus.to}</div>
            </div>
            <div className="text-md-end mt-2 mt-md-0">
              <div className="time" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {selectedBus.departure} — {selectedBus.arrival}
              </div>
              <div className="bus-type">{selectedBus.duration}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <motion.div
            className="bus-shell"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="steering" />
            <div className="seat-grid">
              {rows.map((row, ridx) => (
                <RowSeats key={ridx} row={row} toggleSeat={toggleSeat} isSelected={isSelected} />
              ))}
            </div>

            <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
              <Legend color="#e7f7f5" border="#b7e6df" label="Available" />
              <Legend color="var(--teal)" label="Selected" />
              <Legend color="#eceef4" label="Booked" />
              <Legend color="#fff0f4" border="#ffb3c6" label="Women" />
            </div>
          </motion.div>
        </div>

        <div className="col-lg-7">
          <div className="ticket-card p-4 mb-3">
            <h6 className="display-font mb-3" style={{ fontSize: '0.95rem' }}>
              <FaMapMarkerAlt className="text-amber me-2" />Boarding &amp; Dropping Points
            </h6>
            <div className="row g-3">
              <div className="col-md-6 search-field">
                <label>Boarding Point</label>
                <select className="form-select" value={localBoarding} onChange={(e) => setLocalBoarding(e.target.value)}>
                  {boardingPoints.map((p) => (
                    <option key={p.name} value={p.name}>{p.name} — {p.time}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 search-field">
                <label>Dropping Point</label>
                <select className="form-select" value={localDropping} onChange={(e) => setLocalDropping(e.target.value)}>
                  {droppingPoints.map((p) => (
                    <option key={p.name} value={p.name}>{p.name} — {p.time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="ticket-card p-4">
            <h6 className="display-font mb-3" style={{ fontSize: '0.95rem' }}>Fare Summary</h6>
            {selectedSeats.length === 0 ? (
              <p className="text-secondary mb-0">Select at least one seat to continue.</p>
            ) : (
              <>
                <div className="d-flex justify-content-between mb-2">
                  <span>Seats ({selectedSeats.map((s) => s.number).join(', ')})</span>
                  <span>₹{selectedBus.price} × {selectedSeats.length}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span className="text-amber">₹{total}</span>
                </div>
              </>
            )}
            <button
              className="btn btn-amber w-100 mt-3"
              disabled={selectedSeats.length === 0}
              onClick={continueToDetails}
            >
              Continue to Passenger Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowSeats({ row, toggleSeat, isSelected }) {
  // row has up to 4 seats; render as [seat, seat, aisle, seat, seat] to match the 5-column grid
  const left = row.slice(0, 2);
  const right = row.slice(2, 4);
  return (
    <>
      {left.map((seat) => (
        <SeatCell key={seat.number} seat={seat} toggleSeat={toggleSeat} isSelected={isSelected} />
      ))}
      <div className="seat-aisle" />
      {right.map((seat) => (
        <SeatCell key={seat.number} seat={seat} toggleSeat={toggleSeat} isSelected={isSelected} />
      ))}
    </>
  );
}

function SeatCell({ seat, toggleSeat, isSelected }) {
  const selected = isSelected(seat);
  const cls = seat.status === 'booked' ? 'booked' : selected ? 'selected' : seat.status === 'female' ? 'female' : 'available';
  return (
    <button
      type="button"
      className={`seat ${cls}`}
      onClick={() => toggleSeat(seat)}
      disabled={seat.status === 'booked'}
      title={seat.number}
    >
      {seat.number.replace('S', '')}
    </button>
  );
}

function Legend({ color, border, label }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <span className="legend-dot" style={{ background: color, boxShadow: border ? `inset 0 0 0 1.5px ${border}` : 'none' }} />
      <span style={{ fontSize: '0.8rem' }}>{label}</span>
    </div>
  );
}

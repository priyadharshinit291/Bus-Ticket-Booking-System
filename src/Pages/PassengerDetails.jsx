import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUser, FaCreditCard } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import StepTrack from '../components/StepTrack';

function generatePNR() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 3; i++) code += letters[Math.floor(Math.random() * letters.length)];
  code += Math.floor(1000 + Math.random() * 9000);
  return code;
}

export default function PassengerDetails() {
  const { selectedBus, selectedSeats, passenger, setPassenger, pnr, setPnr } = useBooking();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  if (!selectedBus || selectedSeats.length === 0) {
    navigate('/search');
    return null;
  }

  function validate() {
    const e = {};
    if (!passenger.name.trim()) e.name = 'Name is required';
    if (!passenger.age || passenger.age < 1 || passenger.age > 110) e.age = 'Enter a valid age';
    if (!/^[0-9]{10}$/.test(passenger.phone)) e.phone = '10-digit phone number required';
    if (!/^\S+@\S+\.\S+$/.test(passenger.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setProcessing(true);
    setTimeout(() => {
      setPnr(generatePNR());
      setProcessing(false);
      navigate('/confirmation');
    }, 1100);
  }

  const total = selectedSeats.length * selectedBus.price;

  return (
    <div className="container py-4">
      <button className="btn btn-sm btn-outline-line mb-3" onClick={() => navigate('/seats')}>
        <FaArrowLeft className="me-2" />Back to Seats
      </button>

      <StepTrack current={3} />

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="ticket-card p-4">
            <h6 className="display-font mb-3"><FaUser className="text-amber me-2" />Passenger Details</h6>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-8 search-field">
                  <label>Full Name</label>
                  <input
                    className="form-control"
                    value={passenger.name}
                    onChange={(e) => setPassenger({ ...passenger, name: e.target.value })}
                    placeholder="As per ID proof"
                  />
                  {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                </div>
                <div className="col-md-4 search-field">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={passenger.age}
                    onChange={(e) => setPassenger({ ...passenger, age: e.target.value })}
                  />
                  {errors.age && <div className="text-danger small mt-1">{errors.age}</div>}
                </div>

                <div className="col-md-6 search-field">
                  <label>Gender</label>
                  <select
                    className="form-select"
                    value={passenger.gender}
                    onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-md-6 search-field">
                  <label>Phone Number</label>
                  <input
                    className="form-control"
                    value={passenger.phone}
                    onChange={(e) => setPassenger({ ...passenger, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}
                </div>

                <div className="col-12 search-field">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={passenger.email}
                    onChange={(e) => setPassenger({ ...passenger, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>
              </div>

              <hr className="my-4" />

              <h6 className="display-font mb-3"><FaCreditCard className="text-amber me-2" />Payment</h6>
              <p className="text-secondary small">
                This is a demo checkout — no real payment gateway is called. Click below to simulate payment and generate your ticket.
              </p>

              <button className="btn btn-amber w-100 mt-2" type="submit" disabled={processing}>
                {processing ? (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    Processing Payment…
                  </motion.span>
                ) : (
                  `Pay ₹${total} & Confirm`
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="ticket-card p-4">
            <h6 className="display-font mb-3">Trip Summary</h6>
            <div className="d-flex justify-content-between mb-1">
              <span className="text-secondary">Route</span>
              <span className="fw-semibold">{selectedBus.from} → {selectedBus.to}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="text-secondary">Date</span>
              <span className="fw-semibold">{selectedBus.date}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="text-secondary">Operator</span>
              <span className="fw-semibold">{selectedBus.operator}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="text-secondary">Seats</span>
              <span className="fw-semibold">{selectedSeats.map((s) => s.number).join(', ')}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Total</span>
              <span className="text-amber">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

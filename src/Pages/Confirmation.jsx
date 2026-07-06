import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBusAlt, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';
import { useBooking } from '../Context/BookingContext';
import StepTrack from '../Components/StepTrack';
import TicketDivider from '../Components/TicketDivider';

export default function Confirmation() {
  const { selectedBus, selectedSeats, passenger, boarding, dropping, pnr } = useBooking();
  const navigate = useNavigate();

  if (!pnr || !selectedBus) {
    navigate('/');
    return null;
  }

  const total = selectedSeats.length * selectedBus.price;

  return (
    <div className="container py-4">
      <StepTrack current={4} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="text-center mb-4"
      >
        <FaCheckCircle className="text-amber" style={{ fontSize: '3rem' }} />
        <h3 className="mt-3 mb-1">Booking Confirmed!</h3>
        <p className="text-secondary">A copy of your e-ticket has been sent to {passenger.email || 'your email'}.</p>
      </motion.div>

      <motion.div
        className="eticket"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="eticket-head">
          <div className="headlight" style={{ width: 200, height: 200, top: -80, right: -60 }} />
          <div className="d-flex justify-content-between align-items-start position-relative">
            <div>
              <div className="wf-brand" style={{ fontSize: '1.2rem' }}>
                <FaBusAlt className="text-amber" /> Wayfare<span className="dot">.</span>
              </div>
              <div className="mt-2" style={{ fontSize: '0.8rem', color: 'var(--muted-on-dark)' }}>E-TICKET</div>
            </div>
            <div className="text-end">
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-on-dark)' }}>PNR</div>
              <div className="mono fw-bold" style={{ fontSize: '1.1rem' }}>{pnr}</div>
            </div>
          </div>
        </div>

        <div className="eticket-body">
          <div className="timeline">
            <div>
              <div className="time">{selectedBus.departure}</div>
              <div className="place">{selectedBus.from}</div>
            </div>
            <div className="duration-line"><span>{selectedBus.duration}</span></div>
            <div className="text-end">
              <div className="time">{selectedBus.arrival}</div>
              <div className="place">{selectedBus.to}</div>
            </div>
          </div>

          <div className="row g-3 mt-1 mb-3">
            <InfoBlock label="Date" value={selectedBus.date} />
            <InfoBlock label="Operator" value={selectedBus.operator} />
            <InfoBlock label="Bus Type" value={selectedBus.type} />
            <InfoBlock label="Seats" value={selectedSeats.map((s) => s.number).join(', ')} />
            <InfoBlock label="Passenger" value={`${passenger.name} (${passenger.age}, ${passenger.gender})`} />
            <InfoBlock label="Contact" value={passenger.phone} />
          </div>

          <TicketDivider notchColor="#f7f3e9" />

          <div className="row g-3 my-3">
            <div className="col-md-6">
              <div className="d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="text-amber mt-1" />
                <div>
                  <div style={{ fontSize: '0.75rem' }} className="text-secondary">Boarding Point</div>
                  <div className="fw-semibold">{boarding}</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="text-amber mt-1" />
                <div>
                  <div style={{ fontSize: '0.75rem' }} className="text-secondary">Dropping Point</div>
                  <div className="fw-semibold">{dropping}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center pnr-box mb-3">
            <div className="text-start">
              <div style={{ fontSize: '0.72rem' }} className="text-secondary">TOTAL PAID</div>
              <div className="fw-bold fs-5">₹{total}</div>
            </div>
            <div className="pnr-code">{pnr}</div>
          </div>

          <div className="barcode mb-2" />
          <div className="text-center" style={{ fontSize: '0.7rem', color: 'var(--muted-on-paper)' }}>
            Show this e-ticket (digital or printed) along with a valid photo ID at boarding.
          </div>
        </div>
      </motion.div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-amber" onClick={() => window.print()}>
          <FaDownload className="me-2" />Download / Print
        </button>
        <button className="btn btn-outline-line" onClick={() => navigate('/')}>
          Book Another Trip
        </button>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="col-6 col-md-4">
      <div style={{ fontSize: '0.72rem' }} className="text-secondary text-uppercase">{label}</div>
      <div className="fw-semibold" style={{ fontSize: '0.92rem' }}>{value}</div>
    </div>
  );
}

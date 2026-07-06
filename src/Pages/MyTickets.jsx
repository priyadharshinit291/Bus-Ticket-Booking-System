import { useNavigate } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';
import { useBooking } from './context/BookingContext';
import TicketDivider from './Components/TicketDivider';

export default function MyTickets() {
  const { pnr, selectedBus, selectedSeats } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h3 className="mb-4"><FaTicketAlt className="text-amber me-2" />My Tickets</h3>

      {pnr && selectedBus ? (
        <div className="ticket-card" style={{ maxWidth: 520 }}>
          <div className="ticket-main">
            <div className="d-flex justify-content-between">
              <div>
                <div className="bus-operator">{selectedBus.operator}</div>
                <div className="bus-type">{selectedBus.from} → {selectedBus.to} · {selectedBus.date}</div>
              </div>
              <span className="mono fw-bold">{pnr}</span>
            </div>
            <div className="mt-2 text-secondary" style={{ fontSize: '0.85rem' }}>
              Seats: {selectedSeats.map((s) => s.number).join(', ')}
            </div>
          </div>
          <TicketDivider notchColor="#f7f3e9" />
          <div className="ticket-main pt-3">
            <button className="btn btn-outline-line btn-sm" onClick={() => navigate('/confirmation')}>
              View E-Ticket
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-secondary py-5">
          <p>You haven't booked any trips yet in this session.</p>
          <button className="btn btn-amber" onClick={() => navigate('/')}>Search Buses</button>
        </div>
      )}
    </div>
  );
}

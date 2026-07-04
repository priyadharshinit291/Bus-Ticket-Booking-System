import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

// Shown after a booking is confirmed. Reads booking details from navigation state.
function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  // If user lands here directly without a booking, redirect to home
  if (!booking) {
    return <Navigate to="/" replace />;
  }

  // Generate a simple downloadable text "ticket" using a Blob (no backend needed)
  const handleDownloadTicket = () => {
    const ticketText = `
===== BusGo E-Ticket =====
Booking ID: ${booking.bookingId}
Bus: ${booking.busName} (${booking.busType})
Route: ${booking.from} -> ${booking.to}
Date: ${booking.date}
Seats: ${booking.seats.join(", ")}
Passengers: ${booking.passengers.length}
Total Amount: Rs.${booking.totalAmount}
Booked On: ${booking.bookedOn}
===========================
    `.trim();

    const blob = new Blob([ticketText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${booking.bookingId}_ticket.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container my-5">
      <div className="card mx-auto p-4 text-center" style={{ maxWidth: "600px" }}>
        <div className="success-icon mb-2">✅</div>
        <h3 className="text-success">Booking Confirmed!</h3>
        <p className="text-muted">Your bus ticket has been booked successfully.</p>

        <table className="table table-borderless text-start mt-3">
          <tbody>
            <tr><td className="text-muted">Booking ID</td><td className="fw-bold text-end">{booking.bookingId}</td></tr>
            <tr><td className="text-muted">Bus Name</td><td className="fw-bold text-end">{booking.busName}</td></tr>
            <tr><td className="text-muted">Route</td><td className="fw-bold text-end">{booking.from} → {booking.to}</td></tr>
            <tr><td className="text-muted">Date</td><td className="fw-bold text-end">{booking.date}</td></tr>
            <tr><td className="text-muted">Seats</td><td className="fw-bold text-end">{booking.seats.join(", ")}</td></tr>
            <tr><td className="text-muted">Total Amount</td><td className="fw-bold text-end">₹{booking.totalAmount}</td></tr>
          </tbody>
        </table>

        <div className="d-flex gap-2 justify-content-center mt-3">
          <button className="btn btn-primary" onClick={handleDownloadTicket}>
            Download Ticket
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;

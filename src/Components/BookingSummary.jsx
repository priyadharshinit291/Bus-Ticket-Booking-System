import React from "react";

// Displays a summary of the booking before final confirmation
function BookingSummary({ bus, date, selectedSeats, totalAmount, onConfirm }) {
  return (
    <div className="card summary-card p-3 p-md-4">
      <h5 className="mb-3">Booking Summary</h5>

      <table className="table table-borderless mb-3">
        <tbody>
          <tr>
            <td className="text-muted">Bus Name</td>
            <td className="fw-semibold text-end">{bus.name}</td>
          </tr>
          <tr>
            <td className="text-muted">Route</td>
            <td className="fw-semibold text-end">{bus.from} → {bus.to}</td>
          </tr>
          <tr>
            <td className="text-muted">Date</td>
            <td className="fw-semibold text-end">{date || "Not specified"}</td>
          </tr>
          <tr>
            <td className="text-muted">Selected Seats</td>
            <td className="fw-semibold text-end">{selectedSeats.join(", ") || "-"}</td>
          </tr>
          <tr>
            <td className="text-muted">Number of Passengers</td>
            <td className="fw-semibold text-end">{selectedSeats.length}</td>
          </tr>
          <tr>
            <td className="text-muted">Ticket Price (per seat)</td>
            <td className="fw-semibold text-end">₹{bus.price}</td>
          </tr>
          <tr className="border-top">
            <td className="fw-bold fs-5">Total Amount</td>
            <td className="fw-bold fs-5 text-end text-primary">₹{totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <button
        className="btn btn-primary w-100 fw-semibold"
        onClick={onConfirm}
        disabled={selectedSeats.length === 0}
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingSummary;

import React, { useState, useEffect } from "react";

// Reads bookings from Local Storage and displays them, with a delete option
function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // Load bookings from Local Storage when the page mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  // Remove a booking by its bookingId and update Local Storage
  const handleDelete = (bookingId) => {
    const updated = bookings.filter((b) => b.bookingId !== bookingId);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">My Bookings</h3>

      {bookings.length === 0 ? (
        <div className="alert alert-info">You have no bookings yet. Go search for a bus!</div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div className="col-md-6" key={booking.bookingId}>
              <div className="card summary-card p-3 h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <h6 className="mb-2">{booking.busName} <span className="badge bg-info">{booking.busType}</span></h6>
                  <span className="badge bg-secondary">{booking.bookingId}</span>
                </div>

                <p className="mb-1"><strong>Route:</strong> {booking.from} → {booking.to}</p>
                <p className="mb-1"><strong>Date:</strong> {booking.date}</p>
                <p className="mb-1"><strong>Seats:</strong> {booking.seats.join(", ")}</p>
                <p className="mb-1"><strong>Passengers:</strong> {booking.passengers.length}</p>
                <p className="mb-2"><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>

                <button
                  className="btn btn-outline-danger btn-sm mt-auto"
                  onClick={() => handleDelete(booking.bookingId)}
                >
                  Delete Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;

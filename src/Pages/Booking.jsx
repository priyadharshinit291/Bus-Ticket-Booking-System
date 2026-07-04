import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import PassengerForm from "../components/PassengerForm";
import BookingSummary from "../components/BookingSummary";
import buses from "../data/buses";

// Multi-step booking page: Seat Selection -> Passenger Details -> Summary
function Booking() {
  const { busId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Use bus data passed via navigation state if available, otherwise look it up by id
  const bus = location.state?.bus || buses.find((b) => b.id === Number(busId));

  const [step, setStep] = useState(1); // 1 = seats, 2 = passenger details, 3 = summary
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [journeyDate, setJourneyDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [passengers, setPassengers] = useState([]);

  // Whenever selected seats change, keep the passengers array in sync (one entry per seat)
  useEffect(() => {
    setPassengers((prev) =>
      selectedSeats.map((seat) => {
        const existing = prev.find((p) => p.seat === seat);
        return existing || { seat, name: "", age: "", gender: "", mobile: "", email: "" };
      })
    );
  }, [selectedSeats]);

  if (!bus) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Bus not found. Please go back and search again.</div>
      </div>
    );
  }

  const totalAmount = selectedSeats.length * bus.price;

  // Update a single field for a single passenger
  const handlePassengerChange = (index, field, value) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Validate passenger form before moving to summary
  const handleProceedToSummary = (e) => {
    e.preventDefault();
    setStep(3);
  };

  // Save the booking to Local Storage and navigate to the success page
  const handleConfirmBooking = () => {
    const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
      bookingId,
      busName: bus.name,
      busType: bus.type,
      from: bus.from,
      to: bus.to,
      date: journeyDate,
      seats: selectedSeats,
      passengers,
      pricePerSeat: bus.price,
      totalAmount,
      bookedOn: new Date().toLocaleString(),
    };

    // Read existing bookings, append the new one, and save back to Local Storage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    // Pass the booking to the success page via navigation state
    navigate("/success", { state: { booking: newBooking } });
  };

  return (
    <div className="container my-5">
      {/* Bus details summary header */}
      <div className="card mb-4 p-3 bus-card">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="mb-1">{bus.name}</h5>
            <span className="badge bg-info">{bus.type}</span>
          </div>
          <div className="col-md-6 text-md-end mt-2 mt-md-0">
            <strong>{bus.from} → {bus.to}</strong> | {bus.departure} - {bus.arrival} | ₹{bus.price}/seat
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <ul className="nav nav-pills mb-4 justify-content-center">
        <li className="nav-item">
          <span className={`nav-link ${step === 1 ? "active" : ""}`}>1. Select Seats</span>
        </li>
        <li className="nav-item">
          <span className={`nav-link ${step === 2 ? "active" : ""}`}>2. Passenger Details</span>
        </li>
        <li className="nav-item">
          <span className={`nav-link ${step === 3 ? "active" : ""}`}>3. Summary</span>
        </li>
      </ul>

      {/* Step 1: Seat Selection */}
      {step === 1 && (
        <div className="card p-3 p-md-4">
          <div className="mb-3" style={{ maxWidth: "260px" }}>
            <label className="form-label fw-semibold">Journey Date</label>
            <input
              type="date"
              className="form-control"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
            />
          </div>

          <SeatSelection bus={bus} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />

          <button
            className="btn btn-primary mt-4 align-self-end"
            disabled={selectedSeats.length === 0}
            onClick={() => setStep(2)}
          >
            Continue to Passenger Details
          </button>
        </div>
      )}

      {/* Step 2: Passenger Details */}
      {step === 2 && (
        <form className="card p-3 p-md-4" onSubmit={handleProceedToSummary}>
          <PassengerForm passengers={passengers} onChange={handlePassengerChange} />

          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Continue to Summary
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Booking Summary */}
      {step === 3 && (
        <div className="row justify-content-center">
          <div className="col-md-7">
            <BookingSummary
              bus={bus}
              date={journeyDate}
              selectedSeats={selectedSeats}
              totalAmount={totalAmount}
              onConfirm={handleConfirmBooking}
            />
            <button className="btn btn-outline-secondary mt-3" onClick={() => setStep(2)}>
              Back to Passenger Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;

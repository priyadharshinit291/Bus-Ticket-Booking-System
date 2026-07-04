import React from "react";
import { useNavigate } from "react-router-dom";

// Displays a single bus's details as a Bootstrap card
function BusCard({ bus }) {
  const navigate = useNavigate();

  const isAC = bus.type.toLowerCase().includes("ac") && !bus.type.toLowerCase().includes("non");

  // Navigate to the booking page for this bus, carrying the journey date along
  const handleBookNow = () => {
    navigate(`/booking/${bus.id}`, { state: { bus } });
  };

  return (
    <div className="card bus-card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Bus name & type */}
          <div className="col-md-3">
            <h5 className="mb-1">{bus.name}</h5>
            <span className={`badge bus-type-badge ${isAC ? "bg-info" : "bg-secondary"}`}>
              {bus.type}
            </span>
            <div className="small text-warning mt-1">⭐ {bus.rating}</div>
          </div>

          {/* Timings */}
          <div className="col-md-4">
            <div className="d-flex justify-content-between">
              <div>
                <div className="fw-bold">{bus.departure}</div>
                <div className="small text-muted">{bus.from}</div>
              </div>
              <div className="text-center text-muted small px-2">
                <div>{bus.duration}</div>
                <div>──────➤</div>
              </div>
              <div>
                <div className="fw-bold">{bus.arrival}</div>
                <div className="small text-muted">{bus.to}</div>
              </div>
            </div>
          </div>

          {/* Seats */}
          <div className="col-md-2 text-md-center mt-3 mt-md-0">
            <div className="small text-muted">Available Seats</div>
            <div className="fw-bold">{bus.availableSeats}</div>
          </div>

          {/* Price & Book button */}
          <div className="col-md-3 text-md-end mt-3 mt-md-0">
            <div className="fs-5 fw-bold text-primary">₹{bus.price}</div>
            <button className="btn btn-success btn-sm mt-1" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusCard;

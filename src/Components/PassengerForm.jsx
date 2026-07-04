import React from "react";

// Form to collect passenger details for each selected seat.
// passengers: array of passenger objects, one per selected seat
// onChange: callback to update a specific passenger's field
function PassengerForm({ passengers, onChange }) {
  return (
    <div>
      {passengers.map((passenger, index) => (
        <div key={passenger.seat} className="border rounded p-3 mb-3">
          <h6 className="mb-3">
            Passenger {index + 1} <span className="text-muted">(Seat {passenger.seat})</span>
          </h6>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={passenger.name}
                onChange={(e) => onChange(index, "name", e.target.value)}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Age</label>
              <input
                type="number"
                min="1"
                max="120"
                className="form-control"
                value={passenger.age}
                onChange={(e) => onChange(index, "age", e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={passenger.gender}
                onChange={(e) => onChange(index, "gender", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="form-control"
                placeholder="10-digit mobile number"
                value={passenger.mobile}
                onChange={(e) => onChange(index, "mobile", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={passenger.email}
                onChange={(e) => onChange(index, "email", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PassengerForm;

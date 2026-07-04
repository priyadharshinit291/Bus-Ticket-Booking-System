import React, { useMemo } from "react";

// Generates a deterministic set of "already booked" seats for a given bus,
// so the same bus always shows the same booked seats (no backend available).
function getBookedSeats(busId, totalSeats) {
  const booked = [];
  // Simple seeded pseudo-random generator based on busId
  let seed = busId * 9301 + 49297;
  for (let i = 1; i <= totalSeats; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    if (rnd < 0.25) {
      booked.push(i);
    }
  }
  return booked;
}

// Interactive seat map: 40 seats, 4 per row.
// Booked seats = red, Selected seats = green, Available = white.
function SeatSelection({ bus, selectedSeats, setSelectedSeats }) {
  const totalSeats = bus.totalSeats || 40;

  // Recompute booked seats only when the bus changes
  const bookedSeats = useMemo(() => getBookedSeats(bus.id, totalSeats), [bus.id, totalSeats]);

  // Toggle seat selection on click (ignored for already-booked seats)
  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const seatNumbers = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div>
      {/* Legend explaining seat colors */}
      <div className="mb-3 small">
        <span className="legend-box bg-white border"></span> Available &nbsp;
        <span className="legend-box bg-danger"></span> Booked &nbsp;
        <span className="legend-box bg-success"></span> Selected
      </div>

      <div className="seat-map">
        {seatNumbers.map((seatNum) => {
          const isBooked = bookedSeats.includes(seatNum);
          const isSelected = selectedSeats.includes(seatNum);

          // Insert an aisle gap every 2 seats (2 + aisle + 2 layout)
          const showGap = seatNum % 4 === 2;

          return (
            <React.Fragment key={seatNum}>
              <button
                type="button"
                className={
                  "seat-btn " +
                  (isBooked ? "booked" : isSelected ? "selected" : "available")
                }
                disabled={isBooked}
                onClick={() => toggleSeat(seatNum)}
                title={isBooked ? "Already booked" : `Seat ${seatNum}`}
              >
                {seatNum}
              </button>
              {showGap && <div className="seat-gap"></div>}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-3">
        <strong>Selected Seats: </strong>
        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
      </div>
    </div>
  );
}

export default SeatSelection;

import React from "react";
import BusCard from "./BusCard";

// Renders a list of BusCard components, or a message if none are found
function BusList({ buses }) {
  if (!buses || buses.length === 0) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        No buses found for the selected route. Try a different search.
      </div>
    );
  }

  return (
    <div>
      {buses.map((bus) => (
        <BusCard key={bus.id} bus={bus} />
      ))}
    </div>
  );
}

export default BusList;

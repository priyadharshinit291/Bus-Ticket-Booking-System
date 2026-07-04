import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import BusList from "../Components/BusList";
import buses from "../Data/Buses";

// Reads ?from=&to=&date= from the URL and filters the dummy bus list
function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const from = queryParams.get("from") || "";
  const to = queryParams.get("to") || "";
  const date = queryParams.get("date") || "";

  // Filter buses by from/to (case-insensitive). If no search was performed, show all buses.
  const filteredBuses = useMemo(() => {
    if (!from && !to) return buses;

    return buses.filter((bus) => {
      const matchFrom = from ? bus.from.toLowerCase().includes(from.toLowerCase()) : true;
      const matchTo = to ? bus.to.toLowerCase().includes(to.toLowerCase()) : true;
      return matchFrom && matchTo;
    });
  }, [from, to]);

  return (
    <div className="container my-5">
      <h3 className="mb-1">Available Buses</h3>
      <p className="text-muted">
        {from && to ? `${from} → ${to}` : "Showing all routes"}
        {date && ` | Journey Date: ${date}`}
      </p>

      <BusList buses={filteredBuses} />
    </div>
  );
}

export default SearchResults;

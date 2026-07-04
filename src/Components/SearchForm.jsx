import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Search form used on the Home page to search for buses
// Captures From, To and Journey Date, then navigates to /search-results
function SearchForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });

  // Update form state whenever an input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // On submit, pass search criteria via the URL query string
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(formData).toString();
    navigate(`/search-results?${params}`);
  };

  return (
    <div className="card search-form-card mx-auto p-3 p-md-4" style={{ maxWidth: "950px" }}>
      <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label fw-semibold">From</label>
          <input
            type="text"
            className="form-control"
            name="from"
            placeholder="e.g. Chennai"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label fw-semibold">To</label>
          <input
            type="text"
            className="form-control"
            name="to"
            placeholder="e.g. Bengaluru"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label fw-semibold">Journey Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Search Buses
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Login page - validates against users stored in Local Storage (dummy auth, no backend).
// On success, stores the logged-in user under "currentUser" in Local Storage.
function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Read registered users from Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
    );

    if (!matchedUser) {
      setError("Invalid email or password. Please try again or register first.");
      return;
    }

    // Save the logged-in user (without password) to Local Storage
    const { password, ...safeUser } = matchedUser;
    localStorage.setItem("currentUser", JSON.stringify(safeUser));

    // Redirect back to the page the user came from, or to Home
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 p-md-5 summary-card">
            <h3 className="text-center mb-4">Login to BusGo</h3>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                Login
              </button>
            </form>

            <p className="text-center small mt-3 mb-0">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

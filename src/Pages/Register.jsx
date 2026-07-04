import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Registration page - creates a new dummy user and saves it to Local Storage
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate accounts with the same email
    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (alreadyExists) {
      setError("An account with this email already exists. Please login instead.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess(true);

    // Redirect to login after a short delay
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 p-md-5 summary-card">
            <h3 className="text-center mb-4">Create an Account</h3>

            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && (
              <div className="alert alert-success py-2">
                Account created successfully! Redirecting to login...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                  minLength={4}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={4}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                Register
              </button>
            </form>

            <p className="text-center small mt-3 mb-0">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

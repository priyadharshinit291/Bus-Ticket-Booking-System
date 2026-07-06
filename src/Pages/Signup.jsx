import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBusAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = '10-digit phone number required';
    if (form.password.length < 6) e.password = 'At least 6 characters';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      signup(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="wf-hero" style={{ paddingBottom: '5rem' }}>
      <div className="headlight" style={{ width: 340, height: 340, top: -100, left: -80 }} />
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="search-card"
            >
              <div className="text-center mb-4">
                <div className="wf-brand justify-content-center" style={{ color: 'var(--ink)', fontSize: '1.4rem' }}>
                  <FaBusAlt className="text-amber" /> Wayfare<span className="dot">.</span>
                </div>
                <h4 className="mt-3 mb-1"><FaUserPlus className="text-amber me-2" />Create Your Account</h4>
                <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
                  Sign up to book faster and manage your tickets in one place.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12 search-field">
                    <label>Full Name</label>
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Priya Sharma"
                    />
                    {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                  </div>

                  <div className="col-md-6 search-field">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                    />
                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                  </div>

                  <div className="col-md-6 search-field">
                    <label>Phone Number</label>
                    <input
                      className="form-control"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6 search-field">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="At least 6 characters"
                    />
                    {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                  </div>

                  <div className="col-md-6 search-field">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={form.confirm}
                      onChange={(e) => update('confirm', e.target.value)}
                      placeholder="Re-enter password"
                    />
                    {errors.confirm && <div className="text-danger small mt-1">{errors.confirm}</div>}
                  </div>
                </div>

                {formError && <div className="text-danger mt-3 small fw-semibold">{formError}</div>}

                <button className="btn btn-amber w-100 mt-4" type="submit" disabled={submitting}>
                  {submitting ? 'Creating Account…' : 'Sign Up'}
                </button>
              </form>

              <p className="text-center mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
                Already have an account?{' '}
                <Link to="/login" state={{ from: redirectTo }} className="text-amber fw-semibold">
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="road-line" />
    </section>
  );
}

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBusAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from './context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="wf-hero" style={{ paddingBottom: '5rem' }}>
      <div className="headlight" style={{ width: 320, height: 320, top: -100, right: -80 }} />
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
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
                <h4 className="mt-3 mb-1"><FaSignInAlt className="text-amber me-2" />Welcome Back</h4>
                <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
                  Sign in to continue booking your trip.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12 search-field">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      autoFocus
                    />
                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                  </div>

                  <div className="col-12 search-field">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="Your password"
                    />
                    {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                  </div>
                </div>

                {formError && <div className="text-danger mt-3 small fw-semibold">{formError}</div>}

                <button className="btn btn-amber w-100 mt-4" type="submit" disabled={submitting}>
                  {submitting ? 'Signing In…' : 'Sign In'}
                </button>
              </form>

              <p className="text-center mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
                New to Wayfare?{' '}
                <Link to="/signup" state={{ from: redirectTo }} className="text-amber fw-semibold">
                  Create an Account
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

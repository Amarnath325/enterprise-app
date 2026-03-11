import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../Admin/components/layout/PublicLayout';




import './LoginPage.css';

const SignupPage = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/register', {
        name,
        email,
        password
      });

      if (onSignUp) {
        onSignUp(res.data.token);
      }

      navigate('/businesses/setup');

    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }

    setLoading(false);
  };

  return (
    <PublicLayout>
      <div className="signup-page">
        <form className="login-form" onSubmit={submit}>
          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            required
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setError('');
            }}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default SignupPage;
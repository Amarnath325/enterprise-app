import React, { useState } from 'react';
import axios from 'axios';
import PublicLayout from '../Admin/components/layout/PublicLayout';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/login', {
        email,
        password
      });

      if (onLogin) {
        onLogin(res.data.token);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <PublicLayout>
      <div className="login-page">
        <form className="login-form" onSubmit={submit}>
          <h2>Login</h2>

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

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
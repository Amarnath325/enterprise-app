import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../Admin/components/layout/PublicLayout';



const HomePage = () => {
  return (
    <PublicLayout>
      <div className="home-page bg-black">
        <h1>Welcome to BusinessPro</h1>
        <p>Set up your account and start managing your business.</p>
        <div className="home-actions">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>
    </PublicLayout>
  );
};

export default HomePage;
import React from 'react';
import Header from './Header';
import './Layout.css';

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-content">{children}</div>
    </>
  );
};

export default PublicLayout;

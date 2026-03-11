import React from 'react';

const Footer = ({ version }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer d-flex">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
            <b>
              Copyright © {year} | All Rights Reserved | Designed by{' '}
              <a href="https://fixingdots.com/">
                <img
                  id="fd-logo"
                  src="https://fixhr.app/assets/logo/fd_logo_black.webp"
                  style={{ width: '5rem' }}
                  alt="Fixing Dots logo"
                />
              </a>{' '}
              | <strong>Version:</strong> {version || 'v1.0.0'}
            </b>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
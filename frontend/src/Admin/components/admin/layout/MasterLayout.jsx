import React from 'react';
import Head from './Head';

import Sidebar from './Sidebar';
import Footer from './Footer';
import Scripts from './Scripts';
import Header from '../../layout/Header';

const MasterLayout = ({ children, title, version }) => {
  return (
    <>
      <Head title={title} />
      <div className="app">
        <Header />
        <div className="app-main">
          <Sidebar />
          <main className="app-content">{children}</main>
        </div>
        <Footer version={version} />
      </div>
      <Scripts />
    </>
  );
};

export default MasterLayout;

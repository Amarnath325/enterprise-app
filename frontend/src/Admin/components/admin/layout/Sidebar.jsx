import React from 'react';

const Sidebar = () => {
  return (
    <aside className="app-sidebar3">
      <ul className="side-menu">
        <li className="slide">
          <a className="side-menu__item" href="/admin/dashboard">
            <i className="side-menu__icon fe fe-home"></i>
            <span className="side-menu__label">Dashboard</span>
          </a>
        </li>
        {/* additional admin links here */}
      </ul>
    </aside>
  );
};

export default Sidebar;
import React from 'react';
import Nav from './Nav/Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Nav />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
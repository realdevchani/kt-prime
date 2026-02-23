import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { GlobalStyles } from 'pages/Home/style';

const HeaderAndFooterLayout = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HeaderAndFooterLayout;

import { useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

function layout({ children, token, setToken }) {
  return (
    <>
      <Header token={token} setToken={setToken} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default layout;

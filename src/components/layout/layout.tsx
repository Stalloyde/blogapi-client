import { useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

function layout({ children, token }) {
  return (
    <>
      <Header token={token} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default layout;

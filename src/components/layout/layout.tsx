import { useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

function layout(props) {
  return (
    <>
        <Header />
        {props.children }
        <Footer />
    </>
  );
}

export default layout;

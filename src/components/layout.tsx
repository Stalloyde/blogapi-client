import { useState } from 'react';
import './home.css';
import Header from './header';
import Footer from './footer';

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

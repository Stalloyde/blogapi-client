import { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <>
    <header>
      <h1>
        Stalloyde's Blog
      </h1>
    <Link to='/login'>
      <button>Login</button>
    </Link>
    <Link to='/signup'>
      <button>Sign Up</button>
    </Link>
    </header>
    </>
  );
}

export default Header;

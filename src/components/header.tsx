import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import homeLogo from '../assets/icons8-home-50.png';
import loginLogo from '../assets/icons8-login-50.png';
import logoutLogo from '../assets/icons8-logout-50.png';
import signupLogo from '../assets/icons8-sign-up-50.png';

function Header() {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.navbtn}>
        <img src={homeLogo} alt='home-logo'></img>
        Home
      </Link>
      <h1>
        Stalloyde's Blog
      </h1>
      <div className={styles.nav}>
        <Link to='/login' className={styles.navbtn}>
          <img src={loginLogo} alt='login-logo'></img>
          Login
        </Link>
        <Link to='/signup'className={styles.navbtn}>
          <img src={signupLogo} alt='signup-logo'></img>
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;

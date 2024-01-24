import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './header.module.css';
import homeLogo from '../../assets/icons8-home-50.png';
import loginLogo from '../../assets/icons8-login-50.png';
import logoutLogo from '../../assets/icons8-logout-50.png';
import signupLogo from '../../assets/icons8-sign-up-50.png';

function Header({ token }) {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.navbtn}>
        <img src={homeLogo} alt='home-logo'></img>
        Home
      </Link>
      <h1>Stalloyde's Blog</h1>
      <div className={styles.nav}>
        {!token ? (
          <>
            <Link to='/login' className={styles.navbtn}>
              <img src={loginLogo} alt='login-logo'></img>
              Login
            </Link>
            <Link to='/signup' className={styles.navbtn}>
              <img src={signupLogo} alt='signup-logo'></img>
              Sign Up
            </Link>
          </>
        ) : (
          <Link to='/logout' className={styles.navbtn}>
            <img src={logoutLogo} alt='logout-logo'></img>
            Log Out
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

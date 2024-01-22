import { useEffect, useState } from 'react';
import { json } from 'react-router-dom/dist/index';
import Layout from '../layout/layout';
import styles from './login.module.css';
import usernameIcon from '../../assets/icons8-username-64.png';
import passwordIcon from '../../assets/icons8-password-50.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const responseData = await response.json();
      if (!responseData.user && !responseData.Bearer) {
        setErrorMessage(responseData);
      } else {
        setErrorMessage('');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <>
        <div className={styles.mainHeader}>
          <h2>LOGIN</h2>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              {errorMessage.usernameError && (
                <p className={styles.errorMessage}>
                  {errorMessage.usernameError}
                </p>
              )}
              <img src={usernameIcon} alt='username' />
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Username'
                // required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              {errorMessage.passwordError && (
                <p className={styles.errorMessage}>
                  {errorMessage.passwordError}
                </p>
              )}
              <img src={passwordIcon} alt='password' />
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                // required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              <button value='Log In'> Log In</button>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
}

export default Login;

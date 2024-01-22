import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/layout';
import styles from './signup.module.css';
import usernameIcon from '../../assets/icons8-username-64.png';
import passwordIcon from '../../assets/icons8-password-50.png';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
        }),
      });

      const responseData = await response.json();
      if (
        responseData.usernameError ||
        responseData.passwordError ||
        responseData.confirmPasswordError
      ) {
        setErrorMessage(responseData);
      } else {
        console.log(responseData);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setSignupSuccess(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <>
        <div className={styles.mainHeader}>
          <h2>SIGN UP</h2>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} action='/login' className={styles.form}>
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
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
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
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              {errorMessage.confirmPasswordError && (
                <p className={styles.errorMessage}>
                  {errorMessage.confirmPasswordError}
                </p>
              )}
              <img src={passwordIcon} alt='password' />
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Confirm Password'
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              <button value='Log In'> Sign Up </button>
            </div>
          </form>
        </div>
        {/* {signupSuccess && (
          <>
            <div className={styles.modalSignupSuccessContainer}></div>
            <>
              Your account has been successfully created!
              <Link to='/login'> Continue </Link>
            </>
          </>
        )} */}
      </>
    </Layout>
  );
}

export default Signup;

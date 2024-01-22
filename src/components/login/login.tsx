import { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import styles from './login.module.css';
import usernameIcon from '../../assets/icons8-username-64.png';
import passwordIcon from '../../assets/icons8-password-50.png';

function Login() {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const a = async () => {
  //     const response = await fetch('http://localhost:3000/login', { mode: 'cors' });
  //     const responseData = await response.json();
  //     setData(responseData);
  //   };
  //   a();
  // }, []);

  return (
    <Layout>
      <>
        <div className={styles.mainHeader}>
          <h2>LOGIN</h2>
        </div>

        <div className={styles.content}>
          <form
            method='post'
            action='http://localhost:5173/posts'
            className={styles.form}>
            <div>
              <img src={usernameIcon} alt='username' />
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Username'
              />
            </div>

            <div>
              <img src={passwordIcon} alt='password' />
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Password'
              />
            </div>

            <div>
              <button type='submit'>Log In</button>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
}

export default Login;

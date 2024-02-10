import { useEffect, useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../layout/layout';
import styles from './signup.module.css';
import Modal from './modal';
import usernameIcon from '../../assets/icons8-username-64.png';
import passwordIcon from '../../assets/icons8-password-50.png';

type PropsType = {
  setSignUpUrl: React.Dispatch<React.SetStateAction<string>>;
};

type ErrorMessageType = {
  usernameError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
};

function Signup({ setSignUpUrl }: PropsType) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType | null>(
    null,
  );
  const [signupSuccess, setSignupSuccess] = useState(false);
  const urlPath: string = useLocation().pathname;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://blog-api-stalloyde/signup', {
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
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage(null);
        setSignupSuccess(true);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setSignUpUrl(urlPath);
  }, []);

  return (
    <Layout>
      <>
        <div className={styles.mainHeader}>
          <h2>SIGN UP</h2>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} action='/login' className={styles.form}>
            {signupSuccess ? (
              <Modal />
            ) : (
              <>
                <div>
                  {errorMessage && errorMessage.usernameError && (
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
                  {errorMessage && errorMessage.passwordError && (
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
                  {errorMessage && errorMessage.confirmPasswordError && (
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
              </>
            )}
          </form>
        </div>
      </>
    </Layout>
  );
}

export default Signup;

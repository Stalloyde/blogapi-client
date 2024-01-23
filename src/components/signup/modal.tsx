import { Link } from 'react-router-dom';
import styles from './modal.module.css';

function Modal() {
  return (
    <>
      <div className={styles.modalSignupSuccess}>
        <h2>Your account has been successfully created!</h2>
        <Link to='/login'>
          <em>Continue</em>
        </Link>
      </div>
    </>
  );
}

export default Modal;

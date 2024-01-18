import { useState, useEffect } from 'react';
import Layout from '../layout/layout';
// import './home.css';

function Signup() {
  const [data, setData] = useState();

  useEffect(() => {
    const a = async () => {
      const response = await fetch('http://localhost:3000/signup', { mode: 'cors' });
      const responseData = await response.json();
      setData(responseData);
    };
    a();
  }, []);

  return (
  <Layout>
    {data}
  </Layout>
  );
}

export default Signup;

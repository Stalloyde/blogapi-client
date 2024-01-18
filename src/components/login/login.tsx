import { useEffect, useState } from 'react';
import Layout from '../layout/layout';

function Login() {
  const [data, setData] = useState();

  useEffect(() => {
    const a = async () => {
      const response = await fetch('http://localhost:3000/login', { mode: 'cors' });
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

export default Login;

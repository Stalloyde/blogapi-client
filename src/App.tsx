import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import TargetPost from './components/targetPost/targetPost';
import './index.css';
import Cookies from 'js-cookie';

const App = () => {
  const jwtToken = Cookies.get('token');
  const [token, setToken] = useState(jwtToken);
  const [signUpUrl, setSignUpUrl] = useState();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/posts' />,
    },
    {
      path: '/posts',
      element: (
        <Home token={token} setToken={setToken} setSignUpUrl={setSignUpUrl} />
      ),
    },
    {
      path: '/posts/:id',
      element: (
        <TargetPost
          token={token}
          setToken={setToken}
          setSignUpUrl={setSignUpUrl}
        />
      ),
    },
    {
      path: '/login',
      element: <Login setToken={setToken} signUpUrl={signUpUrl} />,
    },
    {
      path: '/signup',
      element: <Signup signUpUrl={signUpUrl} setSignUpUrl={setSignUpUrl} />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;

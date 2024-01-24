import React, { useState, useEffect } from 'react';
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

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/posts' />,
    },
    {
      path: '/posts',
      element: <Home token={token} />,
    },
    {
      path: '/posts/:id',
      element: <TargetPost token={token} setToken={setToken} />,
    },
    {
      path: '/login',
      element: <Login setToken={setToken} />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;

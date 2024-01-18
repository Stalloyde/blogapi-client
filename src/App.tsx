import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import TargetPost from './components/targetPost/targetPost';
import './index.css';

const App = () => {
  const [targetPost, setTargetPost] = useState([]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/posts'/>,
    },
    {
      path: '/posts',
      element: <Home targetPost={targetPost} setTargetPost={setTargetPost}/>,
    },
    {
      path: '/posts/:id',
      element: <TargetPost targetPost={targetPost} setTargetPost={setTargetPost}/>,
    },
    {
      path: '/login',
      element: <Login />,
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import TargetPost from './components/targetPost/targetPost';
import './index.css';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/:id',
      element: <TargetPost/>,
    },
  ]);

  return (
  <React.StrictMode>
      <RouterProvider router={router } />
  </React.StrictMode>
  );
};

export default App;

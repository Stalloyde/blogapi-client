import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Posts from './components/posts';
import TargetPost from './components/targetPost';
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

import React from 'react'
import Home from 'components/pages/Home'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from 'App'
import MainLayout from 'components/layout/MainLayout'
import AuthLayout from 'components/layout/AuthLayout'
import Signin from 'components/pages/Signin'
import Signup from 'components/pages/Signup'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="data" replace />,
          },
          {
            path: 'data',
            element: <Home />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        path: 'auth',
        children: [
          {
            index: true,
            element: <Navigate to="signin" />,
          },
          {
            path: 'signin',
            element: <Signin />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
        ],
      },
    ],
  },
])

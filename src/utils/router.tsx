import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import Home from 'components/pages/Home'
import App from 'App'
import MainLayout from 'components/layout/MainLayout'
import Signin from 'components/pages/Signin'
import Signup from 'components/pages/Signup'
import ProtectedRoute from 'components/hoc/ProtectedRoute'
import NotFound from 'components/pages/NotFound'

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
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
          {
            path: 'signin',
            element: <Signin />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
])

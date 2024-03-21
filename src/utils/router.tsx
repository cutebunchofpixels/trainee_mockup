import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import Home from 'src/components/pages/Home'
import App from 'src/App'
import MainLayout from 'src/components/layout/MainLayout'
import Signin from 'src/components/pages/Signin'
import Signup from 'src/components/pages/Signup'
import ProtectedRoute from 'src/components/hoc/ProtectedRoute'

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
            element: <Navigate to="currency" replace />,
          },
          {
            path: 'currency',
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
        ],
      },
    ],
  },
])

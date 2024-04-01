import React, { lazy } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import App from 'src/App'
import MainLayout from 'src/components/layout/MainLayout'
import Signin from 'src/components/pages/Signin'
import Signup from 'src/components/pages/Signup'
import ProtectedRoute from 'src/components/hoc/ProtectedRoute'
import NotFound from 'src/components/pages/NotFound'

const Currency = lazy(() => import('src/components/pages/Currency'))
const Users = lazy(() => import('src/components/pages/Users'))
const EditUser = lazy(() => import('src/components/pages/EditUser'))

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
                <Currency />
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
            path: 'users',
            element: (
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            ),
            children: [
              {
                index: true,
                element: <Users />,
              },
              {
                path: ':userId',
                element: <EditUser />,
              },
            ],
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

import React, { lazy } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import App from 'src/App'
import MainLayout from 'src/components/layout/MainLayout'
import Signin from 'src/components/pages/Signin'
import Signup from 'src/components/pages/Signup'
import ProtectedRoute from 'src/components/hoc/ProtectedRoute'
import NotFound from 'src/components/pages/NotFound'
import FocusFirst from 'src/components/hoc/FocusFirst'

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
                <FocusFirst>
                  <Currency />
                </FocusFirst>
              </ProtectedRoute>
            ),
          },
          {
            path: 'signin',
            element: (
              <FocusFirst>
                <Signin />
              </FocusFirst>
            ),
          },
          {
            path: 'signup',
            element: (
              <FocusFirst>
                <Signup />
              </FocusFirst>
            ),
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
                element: (
                  <FocusFirst>
                    <Users />
                  </FocusFirst>
                ),
              },
              {
                path: ':userId',
                element: (
                  <FocusFirst>
                    <EditUser />
                  </FocusFirst>
                ),
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

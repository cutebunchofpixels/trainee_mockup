import React from 'react'
import Home from 'components/pages/Home'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from 'App'
import MainLayout from 'components/layout/MainLayout'

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
    ],
  },
])

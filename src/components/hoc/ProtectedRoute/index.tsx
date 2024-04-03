import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import Loader from 'src/components/ui/Loader'
import { mockUser } from 'src/utils/mockUser'

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element | null
}) {
  const user = mockUser
  const isAuthReady = true
  const location = useLocation()

  if (!isAuthReady) {
    return <Loader size="large" />
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

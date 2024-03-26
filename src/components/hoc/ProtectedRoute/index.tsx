import React from 'react'
import { useAppSelector } from 'redux/app/hooks'
import { Navigate } from 'react-router-dom'

import Loader from 'components/ui/Loader'

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element | null
}) {
  const user = useAppSelector(state => state.auth.user)
  const isAuthReady = useAppSelector(state => state.auth.isReady)

  if (!isAuthReady) {
    return <Loader size="large" />
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return children
}

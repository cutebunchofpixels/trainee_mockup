import React from 'react'
import { useAppSelector } from 'redux/app/hooks'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element | null
}) {
  const user = useAppSelector(state => state.auth.user)

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return children
}

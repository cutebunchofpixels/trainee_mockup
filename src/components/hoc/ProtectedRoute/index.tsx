import { observer } from 'mobx-react-lite'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import Loader from 'src/components/ui/Loader'
import { authStore } from 'src/mobx/auth'

function ProtectedRoute({ children }: { children: JSX.Element | null }) {
  const location = useLocation()

  if (!authStore.isReady) {
    return <Loader size="large" />
  }

  if (!authStore.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

export default observer(ProtectedRoute)

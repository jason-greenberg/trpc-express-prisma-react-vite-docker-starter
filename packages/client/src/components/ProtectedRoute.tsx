import { Navigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { trpc } from 'lib/trpc'
import React from 'react'
import { Spinner } from 'evergreen-ui'

interface ProtectedRouteProps {
  element: React.ComponentType
  [key: string]: any
}

const ProtectedRoute = ({
  element: Component,
  ...rest
}: ProtectedRouteProps) => {
  const queryClient = useQueryClient()
  const {
    data: user,
    isLoading,
    isError,
    refetch
  } = trpc.auth.getUser.useQuery(undefined, {
    retry: false,
    onError: () => {
      queryClient.setQueryData(['auth', 'user'], null)
    }
  })

  console.log('user', user)

  if (isLoading || user === undefined) {
    return <Spinner>Loading...</Spinner>
  }

  if (isError || user === null) {
    return <Navigate to="/login" replace />
  }

  return <Component {...rest} />
}

export default ProtectedRoute

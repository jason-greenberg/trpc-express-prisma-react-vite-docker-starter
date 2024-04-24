import { Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { trpc } from 'lib/trpc';
import React from 'react';
import { Spinner } from 'evergreen-ui';

interface ProtectedRouteProps {
  element: React.ComponentType;
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, ...rest }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = trpc.auth.getUser.useQuery(undefined, {
    retry: false,
    onError: () => {
      queryClient.setQueryData(['auth', 'user'], null);
    },
  });

  if (isLoading) {
    return <Spinner>Loading...</Spinner>;
  }

  return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

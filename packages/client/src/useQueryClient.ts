import superjson from 'superjson';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from 'lib/trpc';

export const useQueryTrpcClient = () => {
  const APP_URL = import.meta.env.VITE_APP_API_URL;
  if (!APP_URL) throw new Error('No app url env variable found');

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: APP_URL,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
      transformer: superjson,
    })
  );

  return { queryClient, trpcClient };
};

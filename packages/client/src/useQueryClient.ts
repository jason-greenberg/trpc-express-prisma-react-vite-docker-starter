import superjson from 'superjson';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from 'lib/trpc';

export const useQueryTrpcClient = () => {
  const APP_URL = import.meta.env.VITE_APP_URL;
  if (!APP_URL) throw new Error('No app url env variable found');

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: APP_URL,
          headers() {
            const userJson = localStorage.getItem('user');
            if (userJson) {
              const user = JSON.parse(userJson);
              if (user?.accessToken) {
                return { authorization: `Bearer ${user?.accessToken}` };
              }
            }
            return {};
          },
        }),
      ],
      transformer: superjson,
    })
  );

  return { queryClient, trpcClient };
};

import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { decodeAndVerifyJwtToken } from './auth';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  async function getUser() {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      const user = await decodeAndVerifyJwtToken(accessToken);
      return user;
    }
    return null;
  }

  const user = await getUser();
  return { req, res, user };
};

export type Context = inferAsyncReturnType<typeof createContext>;

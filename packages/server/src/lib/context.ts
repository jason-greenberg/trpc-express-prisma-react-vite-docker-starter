import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { decodeAndVerifyJwtToken } from 'lib/auth';
import jwt from 'jsonwebtoken';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  async function getUser() {
    const accessToken = req.cookies.accessToken;
    // Do not check for user if the request is for signing in or signing up
    if (accessToken && !['/auth.signIn', '/auth.signUp'].includes(req.path)) {
      console.log('path', req.path)
      try {
        const user = await decodeAndVerifyJwtToken(accessToken);
        return user;
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          res.clearCookie('accessToken');
        }
      }
    }
    return null;
  }

  const user = await getUser();
  return { req, res, user };
};

export type Context = inferAsyncReturnType<typeof createContext>;

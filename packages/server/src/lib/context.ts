import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { decodeAndVerifyJwtToken } from './auth'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  async function getUser() {
    if (req.headers.authorization) {
      const user = await decodeAndVerifyJwtToken(req.headers.authorization)
      console.log('Decoded user:', user);
      return user
    }
    return null
  }
  try {
    const user = await getUser()

    return {
      req,
      res,
      user
    }
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'UNAUTHORIZED'
    })
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

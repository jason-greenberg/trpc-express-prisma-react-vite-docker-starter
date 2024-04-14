import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { decodeAndVerifyJwtToken } from './auth'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  async function getUser() {
    if (req.headers.authorization) {
      return await decodeAndVerifyJwtToken(req.headers.authorization)
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

import { Context } from 'lib/context'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error, ctx }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Internal Server Error:', error)
      return { ...shape, message: 'Internal Server Error' }
    }
    return shape
  }
})

const isAuthenticated = trpc.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: { user: ctx.user }
  })
})

export default trpc
export const router = trpc.router
export const procedure = trpc.procedure.use(isAuthenticated)
export const noAuthProcedure = trpc.procedure

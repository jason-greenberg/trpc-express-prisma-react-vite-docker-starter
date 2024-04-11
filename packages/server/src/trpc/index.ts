import { Context } from '../lib/context'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { protectedProcedure } from '../lib/auth'
import * as z from 'zod'

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
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: { user: ctx.user },
  });
});

trpc.router({
  hello: trpc.procedure
    .input(z.string().nullish())
    .query((opts) => `hello ${opts.input ?? opts.ctx.user?.name ?? 'world'}`),
  admin: trpc.router({
    secret: protectedProcedure.query((opts) => {
      return {
        secret: 'sauce'
      }
    })
  })
})

export default trpc
export const procedure = trpc.procedure.use(isAuthenticated);
export const noAuthProcedure = trpc.procedure;

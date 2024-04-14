import trpc from 'trpc'
import { todoRouter } from './todoRouter'
import { authRouter } from './auth.router'

export const appRouter = trpc.router({
  auth: authRouter,
  todo: todoRouter
})

export type AppRouter = typeof appRouter

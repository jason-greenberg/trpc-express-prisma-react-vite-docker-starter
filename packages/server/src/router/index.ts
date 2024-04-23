import trpc from 'trpc'
import { todoRouter } from 'router/todoRouter'
import { authRouter } from 'router/auth.router'

export const appRouter = trpc.router({
  auth: authRouter,
  todo: todoRouter
})

export type AppRouter = typeof appRouter

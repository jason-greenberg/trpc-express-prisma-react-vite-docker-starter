import 'module-alias/register'

import express, { Application, NextFunction, Request, Response } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from 'router/index'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createContext } from 'lib/context'

const VITE_APP_URL = process.env.VITE_APP_URL
const PORT: number = Number(process.env.SERVER_PORT) || 3001

const app: Application = express()
app.use(cors({ origin: `${VITE_APP_URL}`, credentials: true }))
app.use(cookieParser())

app.get('/healthcheck', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'OK' })
})

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`)
})

import express, { Application, NextFunction, Request, Response } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from 'router/index'
import cors from 'cors'
import { createContext } from 'lib/context'

const app: Application = express()
app.use(cors())

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

const PORT: number = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`)
})

import { TRPCError } from '@trpc/server'
import jwt from 'jsonwebtoken'
import env from 'env-var'
import trpc from 'trpc'

import { User } from '@prisma/client'
import userModel from 'trpc/models/user.model'

export const authConfig = {
  secretKey: env.get('SECRET_KEY').required().asString(),
  jwtExpiresIn: env.get('JWT_EXPIRES_IN').required().asString()
}

export async function decodeAndVerifyJwtToken(token: string): Promise<User> {
  const parsedToken = token.split(' ')[1]
  const decoded = jwt.verify(parsedToken, authConfig.secretKey)
  if (userModel.isUser(decoded)) return decoded
  else throw new TRPCError({ code: 'UNAUTHORIZED' })
}

export const protectedProcedure = trpc.procedure.use(async function isAuthed(
  opts
) {
  const { ctx } = opts
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return opts.next({
    ctx: {
      user: ctx.user
    }
  })
})

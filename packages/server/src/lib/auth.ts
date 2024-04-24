import { TRPCError } from '@trpc/server'
import jwt from 'jsonwebtoken'
import env from 'env-var'

import { User } from '@prisma/client'
import userModel from 'trpc/models/user.model'

export const authConfig = {
  secretKey: env.get('SECRET_KEY').required().asString(),
  jwtExpiresIn: env.get('JWT_EXPIRES_IN').required().asString()
}

export const generateJwtToken = (user: User) =>
  jwt.sign(
    { id: user.id, email: user.email, name: user.name }, // token body
    authConfig.secretKey,
    {
      expiresIn: authConfig.jwtExpiresIn
    }
  )

export async function decodeAndVerifyJwtToken(token: string): Promise<User> {
  const decoded = jwt.verify(token, authConfig.secretKey)
  if (userModel.isUser(decoded)) return decoded
  else throw new TRPCError({ code: 'UNAUTHORIZED' })
}

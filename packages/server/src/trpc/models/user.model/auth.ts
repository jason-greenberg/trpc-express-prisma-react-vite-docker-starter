import prisma from 'sdks/prisma'
import bcrypt from 'bcryptjs'
import { TRPCError } from '@trpc/server'
import { generateJwtToken } from 'lib/auth'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { User } from '@prisma/client'

const signIn = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const authError = new TRPCError({
    code: 'UNAUTHORIZED',
    message: 'Invalid username or password'
  })
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
    include: { password: true }
  })
  if (!user || !user.password) throw authError

  const isValid = await bcrypt.compare(password, user.password.hash)
  if (!isValid) throw authError

  const accessToken = generateJwtToken(user)

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    accessToken
  }
}

const signUp = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const hash = await bcrypt.hash(password, 10)
  let user: User | null = null
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: { create: { hash } }
      }
    })
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      Array.isArray(error.meta?.target) &&
      error.meta?.target?.includes('email')
    ) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email already in use'
      })
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong'
    })
  }
  const accessToken = generateJwtToken(user)
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    accessToken
  }
}

const updatePassword = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const hash = await bcrypt.hash(password, 10)
  return prisma.user.update({
    where: {
      email
    },
    data: {
      password: {
        update: {
          hash
        }
      }
    }
  })
}

export default { signIn, signUp, updatePassword }

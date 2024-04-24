import prisma from 'sdks/prisma'
import bcrypt from 'bcryptjs'
import { TRPCError } from '@trpc/server'
import { generateJwtToken } from 'lib/auth'

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
  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash
        }
      }
    }
  })
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

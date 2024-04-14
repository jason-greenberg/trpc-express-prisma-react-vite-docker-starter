import prisma from 'sdks/prisma'
import bcrypt from 'bcryptjs'

const signIn = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const INVALID_CREDENTIALS = 'Invalid username or password'
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email
    },
    include: {
      password: true
    }
  })
  if (!user.password) throw new Error(INVALID_CREDENTIALS)

  const isValid = await bcrypt.compare(password, user.password.hash)

  if (!isValid) throw new Error(INVALID_CREDENTIALS)

  return user
}

const signUp = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const hash = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash
        }
      }
    }
  })
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

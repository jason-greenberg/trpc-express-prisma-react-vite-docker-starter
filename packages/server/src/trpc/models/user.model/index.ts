import { User } from '@prisma/client'
import { UserSchema } from 'generated/zod'
import auth from 'trpc/models/user.model/auth'

const isUser = (data: unknown): data is User => {
  try {
    UserSchema.parse(data)
    return true
  } catch {
    return false
  }
}

export default { auth, isUser }

import { User } from '@prisma/client'
import { UserSchema } from 'generated/zod'

const isUser = (data: unknown): data is User => {
  try {
    UserSchema.parse(data)
    return true
  } catch {
    return false
  }
}

export default { isUser }

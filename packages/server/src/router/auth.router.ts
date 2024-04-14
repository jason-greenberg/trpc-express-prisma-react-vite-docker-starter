import { noAuthProcedure, router } from 'trpc'
import { userCredentialsSchema } from 'types/auth.dtos'
import userModel from 'trpc/models/user.model'

export const authRouter = router({
  signUp: noAuthProcedure
    .input(userCredentialsSchema)
    .mutation(async ({ input }) =>
      userModel.auth.signUp({ email: input.email, password: input.password })
    ),

  signIn: noAuthProcedure
    .input(userCredentialsSchema)
    .mutation(async ({ input }) =>
      userModel.auth.signIn({ email: input.email, password: input.password })
    )
})

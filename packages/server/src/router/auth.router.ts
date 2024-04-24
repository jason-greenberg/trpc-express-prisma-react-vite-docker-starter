import { publicProcedure, router } from 'trpc'
import { userCredentialsSchema } from 'types/auth.dtos'
import userModel from 'trpc/models/user.model'

export const authRouter = router({
  signUp: publicProcedure
    .input(userCredentialsSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await userModel.auth.signUp({
        email: input.email,
        password: input.password
      })
      ctx.res.cookie('accessToken', user.accessToken, { httpOnly: true })
      ctx.user = user
    }),

  signIn: publicProcedure
    .input(userCredentialsSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await userModel.auth.signIn({
        email: input.email,
        password: input.password
      })
      ctx.res.cookie('accessToken', user.accessToken, { httpOnly: true })
      ctx.user = user
    })
})

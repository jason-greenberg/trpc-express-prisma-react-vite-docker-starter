import prisma from 'sdks/prisma'
import trpc from 'trpc'
import { protectedProcedure } from 'trpc'
import { z } from 'zod'

export const todoRouter = trpc.router({
  list: protectedProcedure.query(({ ctx }) => {
    // const todos = await prisma.todo.findMany()
    // return todos
    return prisma.todo.findMany()
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const title = input.title
      return prisma.todo.create({
        data: {
          title: title,
          isCompleted: false
        }
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.todo.delete({
        where: {
          id: input.id
        }
      })
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return prisma.todo.update({
        where: {
          id: input.id
        },
        data: {
          isCompleted: input.isCompleted
        }
      })
    })
})

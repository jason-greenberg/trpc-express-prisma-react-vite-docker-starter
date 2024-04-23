import prisma from 'sdks/prisma'

const test = await prisma.user.findMany()
console.log('test', test)

import * as client from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: client.PrismaClient }

export const prisma = globalForPrisma.prisma || new client.PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

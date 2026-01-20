import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL || 'file:./dev.db'
  const adapter = new PrismaLibSql({ url })
  return new PrismaClient({ adapter })
}

const prisma = prismaClientSingleton()

async function main() {
  const username = 'admin111@gmail.com'
  const password = 'password123'
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password_hash: passwordHash,
    },
  })

  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

'use server'

import { prisma } from '@/lib/prisma'
import { createSession, deleteSession, getSession } from '@/lib/session'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function signup(_prevState: unknown, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  if (username.length < 3) {
    return { error: 'Username must be at least 3 characters' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })

  if (existingUser) {
    return { error: 'Username already exists' }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.prisma.user.create({
    data: {
      username,
      password_hash: hashedPassword,
    },
  })

  // Create session
  await createSession(user.id, user.username)

  redirect('/')
}

export async function login(prevState: unknown, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  // Find user
  const user = await prisma.prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return { error: 'Invalid username or password' }
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password_hash)

  if (!validPassword) {
    return { error: 'Invalid username or password' }
  }

  // Create session
  await createSession(user.id, user.username)

  redirect('/')
}
//
export async function logout() {
  await deleteSession()
  redirect('/login')
}

export async function checkAuth() {
  const session = await getSession()
  return !!session
}

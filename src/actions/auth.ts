'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createSession, deleteSession, getSession } from '@/lib/session'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

// Simple validation schema manually or use Zod if available?
// I will just use manual validation for now to avoid installing more deps if not requested,
// but usually Zod is standard. Let's see if I can just use basic checks.
// Actually, I'll install zod because it makes validation much safer and easier.
// But first, let's try without it to follow "nothing more, nothing less" strictly, 
// OR I can just do manual checks. Manual checks are fine for this scope.

export async function signup(prevState: any, formData: FormData) {
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
  const user = await prisma.user.create({
    data: {
      username,
      password_hash: hashedPassword,
    },
  })

  // Create session
  await createSession(user.id, user.username)

  redirect('/')
}

export async function login(prevState: any, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  // Find user
  const user = await prisma.user.findUnique({
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

export async function logout() {
  await deleteSession()
  redirect('/login')
}

export async function checkAuth() {
  const session = await getSession()
  return !!session
}

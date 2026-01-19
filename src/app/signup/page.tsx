'use client'

import { useActionState } from 'react'
import { signup } from '@/actions/auth'
import Link from 'next/link'
import { UserPlus, User, Lock } from 'lucide-react'

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 text-white">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-indigo-100 mt-2">Join us and start your health journey</p>
        </div>

        <div className="p-8">
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={20} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Choose a username"
                />
              </div>
              <p className="text-xs text-slate-500">At least 3 characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Choose a password"
                />
              </div>
              <p className="text-xs text-slate-500">At least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-slate-600 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

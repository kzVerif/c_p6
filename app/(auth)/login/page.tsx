import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col items-center min-h-screen container space-y-6 py-10'>
      <p className='text-4xl font-semibold text-center'>เข้าสู่ระบบ</p>
      <hr className="border-gray-300 w-full max-w-lg" />
      <LoginForm />
      <Link href='/register' className='text-sm font-semibold text-center'>
        ยังไม่มีบัญชีใช่ไหม? <span className='text-blue-500 underline text-'>สมัครเลย!</span>
      </Link>
    </div>
  )
}

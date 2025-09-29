import RegisterForm from '@/components/ui/RegisterForm'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col items-center min-h-screen container space-y-6 py-10'>
        <p className='text-4xl font-semibold text-center'>สมัครสมาชิก</p>
        <hr className="border-gray-300 w-full max-w-lg" />
        <RegisterForm/>
        <Link href='/login' className='text-sm font-semibold text-center'>
        มีบัญชีอยู่แล้วใช่ไหม? <span className='text-blue-500 underline text-'>เข้าสู่ระบบเลย!</span>
      </Link>
    </div>
  )
}

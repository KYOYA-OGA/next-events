import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'

import Layout from '@/components/Layout'

import AuthContext from '@/context/AuthContext'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useContext(AuthContext)

  useEffect(() => error && toast.error('入力内容をご確認ください'), [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    login({ email, password })
  }
  return (
    <Layout title="ログイン">
      <div className="w-full shadow-xl bg-white md:w-[500px] mx-auto p-5 py-8 md:p-8">
        <h1 className="flex items-center text-2xl font-bold ">
          <FaUser className="mr-1" /> ログイン
        </h1>
        <ToastContainer position="top-center" />
        <form onSubmit={handleSubmit} className="mt-7">
          <div>
            <label htmlFor="email" className="text-sm">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 leading-tight border-2 rounded appearance-none focus:outline-none focus:shadow-outline focus:border-gray-800"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 leading-tight border-2 rounded appearance-none focus:outline-none focus:shadow-outline focus:border-gray-800"
            />
          </div>
          <input
            type="submit"
            value="ログイン"
            className="w-full mt-7 btn-red"
          />
        </form>

        <p className="mt-5 text-sm">
          アカウント登録がまだですか？→{' '}
          <Link href="/account/register">
            <a className="font-bold text-blue-700">登録</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export default LoginPage

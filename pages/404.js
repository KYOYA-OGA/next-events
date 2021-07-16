import Layout from '@/components/Layout'
import Link from 'next/link'

import { FaExclamationTriangle } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found">
      <section className="text-center">
        <div className="flex items-center justify-center text-4xl font-bold">
          <FaExclamationTriangle className="mr-2" />
          <h1 className="">404</h1>
        </div>

        <p className="mt-2">お探しのページは見つかりませんでした…</p>
        <Link href="/">
          <a className="block mt-2 text-blue-700">トップページに戻る</a>
        </Link>
      </section>
    </Layout>
  )
}

export default NotFoundPage

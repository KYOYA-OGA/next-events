import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'

const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className="max-w-5xl mx-auto my-8 px-7 md:my-14">{children}</div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'イベント作成サイト',
  description: 'イベントを作ったり見つけたりするサイト',
  keywords: 'イベント,Next.js,React',
}

export default Layout

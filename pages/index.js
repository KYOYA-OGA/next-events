import Link from 'next/link'

import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1 className="text-2xl text-center">開催予定の最新イベント</h1>
      <div className="mt-5">
        {events.length === 0 && <h3>まだイベントがありません</h3>}
      </div>

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <div className="mt-5 text-center md:mt-9">
        {events.length > 0 && (
          <Link href="/events">
            <a className="btn-black">すべてのイベントを見る</a>
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}

export default HomePage

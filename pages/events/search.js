import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

const SearchPage = ({ events }) => {
  const router = useRouter()

  return (
    <Layout title="検索結果">
      <Link href="/events">
        <a className="text-sm text-blue-700">イベント一覧に戻る</a>
      </Link>
      <h1 className="text-2xl text-center">
        「{router.query.term}」の検索結果
      </h1>
      <div className="mt-5">
        {events.length === 0 && <h3>イベントが見つかりませんでした</h3>}
      </div>

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { organizer_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  })
  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()

  return {
    props: {
      events,
    },
  }
}

export default SearchPage

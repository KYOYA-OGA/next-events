import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'

const EventsPage = ({ events, total, page }) => {
  return (
    <Layout>
      <h1 className="text-2xl text-center">開催予定のイベント一覧</h1>
      <div className="mt-5">
        {events.length === 0 && <h3>まだイベントがありません</h3>}
      </div>

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <div className="mt-5">
        <Pagination page={page} total={total} />
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  // calculate start page
  const start = +page === 1 ? 0 : (page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetches events from server
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await res.json()

  return {
    props: {
      events,
      page: +page,
      total,
    },
  }
}

export default EventsPage

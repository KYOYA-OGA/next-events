import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'

import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'

const dashboard = ({ events, token }) => {
  const username = events[0].user.username
  const router = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('本当に削除しますか？')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error('エラーが発生しました。')
      } else {
        router.push('/account/dashboard')
      }
    }
  }
  return (
    <Layout title="ダッシュボード">
      <div className="">
        <h1 className="mt-3 text-3xl font-bold">
          <span className="text-red-700">{username}</span>さんの
          <br className="md:hidden" />
          ダッシュボード
        </h1>
        {/* <h3 className="mt-5 text-lg font-bold text-red-700 md:mt-7">
          私のイベント
        </h3> */}
        <div className="mt-5 space-y-4 md:mt-7">
          {events.map((evt) => {
            return (
              <DashboardEvent
                key={evt.id}
                evt={evt}
                handleDelete={deleteEvent}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: { events, token },
  }
}

export default dashboard

import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'

import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'

const AddEventPage = ({ token }) => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    organizer: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const regex = /[a-z0-9\-]+$/

    // console.log(regex.test(values.slug))

    // Validation
    if (
      !values.name ||
      !regex.test(values.slug) ||
      !values.organizer ||
      !values.venue ||
      !values.address ||
      !values.date ||
      !values.time ||
      !values.description
    ) {
      toast.error('入力内容を確認してください。')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('権限がありません。')
        return
      }
      toast.error('エラーが発生しました。')
    } else {
      const evt = await res.json()
      toast.success('イベントを追加しました！')
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Layout title="イベント追加ページ">
      <Link href="/events">
        <a className="text-sm text-blue-700">イベント一覧に戻る</a>
      </Link>
      <h1 className="mt-5 text-2xl">イベントを追加する</h1>
      <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-4">
          <div>
            <label htmlFor="name" className="text-sm text-gray-800">
              イベント名
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className="add-event-input"
            />
          </div>
          <div>
            <label htmlFor="slug" className="text-sm text-gray-800">
              スラッグ（英字＆ハイフン＆数字のみ）
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={values.slug}
              onChange={handleInputChange}
              className="add-event-input"
            />
          </div>
          <div>
            <label htmlFor="organizer" className="text-sm text-gray-800">
              企画者
            </label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              value={values.organizer}
              onChange={handleInputChange}
              className="add-event-input"
            />
          </div>
          <div>
            <label htmlFor="venue" className="text-sm text-gray-800">
              開催場所
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
              className="add-event-input"
            />
          </div>
          <div className="md:col-span-2 ">
            <label htmlFor="address" className="text-sm text-gray-800">
              住所
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              className="add-event-input"
            />
          </div>
          <div>
            <label htmlFor="date" className="text-sm text-gray-800">
              開催日時
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
              className="add-event-input"
            />
          </div>
          <div>
            <label htmlFor="time" className="text-sm text-gray-800">
              開催時刻
            </label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
              className="add-event-input"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="text-sm text-gray-800">
            イベント詳細
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
            className="h-32 add-event-input"
          />
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="イベントを追加する"
            className="w-full btn-red"
          />
        </div>
      </form>
    </Layout>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req)

  return {
    props: {
      token,
    },
  }
}

export default AddEventPage

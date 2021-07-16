import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'

const EditEventPage = ({ evt, token }) => {
  const [values, setValues] = useState({
    name: evt.name,
    slug: evt.slug,
    organizer: evt.organizer,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  )
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const regex = /[a-z0-9\-]+$/

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

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('権限がありません')
        return
      }
      toast.error('エラーが発生しました。')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title="イベント追加ページ">
      <Link href="/events">
        <a className="text-sm text-blue-700">イベント一覧に戻る</a>
      </Link>
      <h1 className="mt-5 text-2xl">イベントを編集する</h1>
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
              value={moment(values.date).format('YYYY-MM-DD')}
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
            value="イベントを編集する"
            className="w-full btn-red"
          />
        </div>
      </form>

      <h2 className="mt-4 text-xl font-bold">イベント画像</h2>

      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>画像がありません</p>
        </div>
      )}
      <div className="ml-4">
        <button
          className="flex items-center btn-black"
          onClick={() => setShowModal(true)}
        >
          <FaImage className="mr-1" /> 画像を設定する
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  )
}

export const getServerSideProps = async ({ params: { id }, req }) => {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()
  return {
    props: {
      evt,
      token,
    },
  }
}

export default EditEventPage

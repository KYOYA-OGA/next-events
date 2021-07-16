import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactMarkdown from 'react-markdown'

import { FaPencilAlt, FaTimes } from 'react-icons/fa'

import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import { API_URL } from '@/config/index'
import { useRouter } from 'next/router'

const EventPage = ({ evt }) => {
  const router = useRouter()

  // const deleteEvent = async () => {
  //   if (confirm('本当に削除しますか？')) {
  //     const res = await fetch(`${API_URL}/events/${evt.id}`, {
  //       method: 'DELETE',
  //     })

  //     const data = await res.json()

  //     if (!res.ok) {
  //       toast.error('エラーが発生しました。')
  //     } else {
  //       router.push('/events')
  //     }
  //   }
  // }

  return (
    <Layout>
      {/* <div className="flex items-center justify-end space-x-4">
        <Link href={`/events/edit/${evt.id}`}>
          <a className="flex items-center text-blue-700">
            <FaPencilAlt className="mr-0.5" /> 編集する
          </a>
        </Link>
        <a
          href="#"
          className="flex items-center text-red-700"
          onClick={deleteEvent}
        >
          <FaTimes className="mr-0.5" />
          削除する
        </a>
      </div> */}
      <p className="mt-3 text-sm md:mt-0">
        {new Date(evt.date).toLocaleDateString()} {evt.time}
      </p>
      <h1 className="mt-3 text-3xl font-bold">{evt.name}</h1>
      <ToastContainer position="top-center" />
      {evt.image && (
        <div className="mt-3 text-center">
          <Image src={evt.image.formats.medium.url} width={960} height={580} />
        </div>
      )}

      <h3 className="mt-4 text-xl font-bold">企画者:</h3>
      <p>{evt.organizer}</p>
      <h3 className="mt-3 text-xl font-bold">内容:</h3>

      <p className="prose max-w-none">
        <ReactMarkdown children={evt.description} />
      </p>
      <h3 className="mt-3 text-xl font-bold">開催地</h3>
      <p>{evt.address}</p>

      <EventMap evt={evt} />

      <Link href="/events">
        <a className="block mt-3 text-blue-700 hover:text-blue-900">
          {'<'} 戻る
        </a>
      </Link>
    </Layout>
  )
}

// export const getStaticPaths = async () => {
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }))

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export const getStaticProps = async ({ params: { slug } }) => {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`)
//   const events = await res.json()
//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 60,
//   }
// }

export const getServerSideProps = async ({ query: { slug } }) => {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()
  return {
    props: {
      evt: events[0],
    },
  }
}

export default EventPage

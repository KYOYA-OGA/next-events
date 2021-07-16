import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

const DashboardEvent = ({ evt, handleDelete }) => {
  return (
    <article className="flex flex-col items-center justify-between px-3 py-5 bg-white rounded-md shadow-sm md:flex-row md:px-5">
      <h4 className="text-blue-700">
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <div className="flex items-center mt-3 space-x-5 md:mt-0 md:space-x-7">
        <Link href={`/events/edit/${evt.id}`}>
          <a className="flex items-center text-blue-700">
            <FaPencilAlt className="mr-1" />{' '}
            <span className="text-sm">編集する</span>
          </a>
        </Link>
        <button
          className="flex items-center text-red-700"
          onClick={() => handleDelete(evt.id)}
        >
          <FaTimes className="mr-0.5" />{' '}
          <span className="text-sm">削除する</span>
        </button>
      </div>
    </article>
  )
}

export default DashboardEvent

import Link from 'next/link'
import { PER_PAGE } from '@/config/index'

const Pagination = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE)
  return (
    <div className="flex items-center space-x-5 text-sm">
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-black">前へ</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-black">次へ</a>
        </Link>
      )}
    </div>
  )
}

export default Pagination

import Link from 'next/link'
import Image from 'next/image'

const EventItem = ({ evt }) => {
  return (
    <article className="flex flex-col items-center p-5 mt-6 text-center bg-white rounded-md shadow-lg md:flex-row md:text-left">
      <div>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : '/images/event-default.jpg'
          }
          width={170}
          height={100}
          alt={evt.name}
          className="flex-1"
        />
      </div>
      <div className="mt-3 md:mt-0 md:ml-10 ">
        <span className="text-sm">
          {new Date(evt.date).toLocaleDateString()} {evt.time}
        </span>
        <h3 className="text-lg font-bold">{evt.name}</h3>
      </div>
      <div className="mt-5 md:mt-0 md:ml-auto">
        <Link href={`/events/${evt.slug}`}>
          <a className="btn-red">詳細へ</a>
        </Link>
      </div>
    </article>
  )
}

export default EventItem

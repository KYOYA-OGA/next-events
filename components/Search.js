import { useState } from 'react'
import { useRouter } from 'next/router'

const Search = () => {
  const [term, setTerm] = useState('')

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    setTerm('')
  }
  return (
    <div className="mt-3 md:mt-0">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border-2 rounded shadow appearance-none md:w-96 focus:outline-none focus:shadow-outline"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="イベントを探す"
        />
      </form>
    </div>
  )
}

export default Search

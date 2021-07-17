import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="py-3 text-sm text-center">
      <p>Copyright &copy; THE EVENTS {new Date().getFullYear()}</p>
      <p className="mt-2 text-blue-700">
        <Link href="/about">このサイトについて</Link>
      </p>
    </footer>
  )
}

export default Footer

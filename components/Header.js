import { useContext, useState } from 'react'
import Link from 'next/link'
import Search from './Search'
import AuthContext from '@/context/AuthContext'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { MdClose, MdMenu } from 'react-icons/md'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="text-gray-800 bg-white shadow-md ">
      <div className="flex flex-wrap items-center justify-between px-8 py-4 mx-auto max-w-7xl lg:flex-nowrap ">
        <Link href="/">
          <a className="font-mono text-lg font-bold text-red-400">e-VENTs</a>
        </Link>
        <button className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? (
            <MdClose className="text-3xl font-bold" />
          ) : (
            <MdMenu className="text-3xl font-bold" />
          )}
        </button>

        <div
          className={`${
            showMenu
              ? 'w-full flex flex-col items-center'
              : 'hidden lg:items-center lg:flex'
          }`}
        >
          <div className="md:mr-12 xl:mr-24">
            <Search />
          </div>
          <nav className="mt-5 lg:mt-0">
            <ul className="flex flex-col items-center space-y-5 md:flex-row md:space-y-0 md:space-x-7 lg:space-x-5">
              <li>
                <Link href="/events">
                  <a>イベント一覧</a>
                </Link>
              </li>
              {user ? (
                // logged in
                <>
                  <li>
                    <Link href="/events/add">
                      <a>イベントを追加する</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/dashboard">
                      <a>ダッシュボード</a>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className="flex items-center btn-black"
                    >
                      <FaSignOutAlt className="mr-2" />
                      ログアウト
                    </button>
                  </li>
                </>
              ) : (
                // not logged in
                <>
                  <li>
                    <Link href="/account/login">
                      <a className="flex items-center btn-black">
                        <FaSignInAlt className="mr-2" />
                        ログイン
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

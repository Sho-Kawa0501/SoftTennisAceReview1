import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/auth'

import {
  HomeIcon,
  LogoutIcon,
  LoginIcon,
  PlusCircleIcon,
  UserAddIcon,
  UserIcon,
} from '@heroicons/react/outline'

const Navigation = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const logoutHandler = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(logout())
    }
  }

  return (
  <div className="sticky top-0 bg-white z-10">
      <div className="border-b py-3">
        <div className="max-w-5xl mx-auto flex justify-between px-4">
          <div className="text-lg font-extrabold">
            <Link href="/" legacyBehavior>
              <a>FullStackChannel</a>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" legacyBehavior>
              <a>
                <HomeIcon className="h-7 w-7" />
              </a>
            </Link>

            {isAuthenticated ? (
              <div className="flex space-x-4">
                <Link href="/post/new" legacyBehavior>
                  <a>
                    <PlusCircleIcon className="h-7 w-7" />
                  </a>
                </Link>
                <Link href="/profile" legacyBehavior>
                  <a>
                    <UserIcon className="h-7 w-7" />
                  </a>
                </Link>
                <div onClick={logoutHandler} className="cursor-pointer">
                  <LogoutIcon className="h-7 w-7" />
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" legacyBehavior>
                  <a>
                    <LoginIcon className="h-7 w-7" />
                  </a>
                </Link>
                <Link href="/register" legacyBehavior>
                  <a>
                    <UserAddIcon className="h-7 w-7" />
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Navigation
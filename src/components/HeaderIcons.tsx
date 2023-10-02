import React ,{useCallback} from 'react'
import { HomeIcon, LogoutIcon, LoginIcon, UserAddIcon, UserIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { AppDispatch, RootState } from 'app/store'
import { fetchAsyncLogout } from 'features/account/accountSlice/actions'
import { useDispatch } from 'react-redux' 
import { useRouter } from 'next/router'
import { setIsLoading,resetIsLoading } from 'features/app/appSlice'

export const HomeIconComponent = () => (
  <Link href="/" legacyBehavior>
    <HomeIcon className="h-7 w-7" />
  </Link>
)

export const LogoutIconComponent = () => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const logoutHandler = useCallback(async () => {
    try {
      dispatch(setIsLoading())
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        await dispatch(fetchAsyncLogout())
        router.push("/")
      }
    } finally {
      setTimeout(() => {
        dispatch(resetIsLoading())
      }, 500)
    }
  },[dispatch,router])
  return (
  <div onClick={logoutHandler} className="cursor-pointer">
    <LogoutIcon className="h-7 w-7" />
  </div>
  )
}

export const LoginIconComponent = () => (
  <Link href="/login" legacyBehavior>
    <a>
      <LoginIcon className="h-7 w-7" />
    </a>
  </Link>
)

export const RegisterIconComponent = () => (
  <Link href="/register" legacyBehavior>
    <a>
      <UserAddIcon className="h-7 w-7" />
    </a>
  </Link>
)

export const UserIconComponent = () => (
  <Link href="/account/mypage" legacyBehavior>
    <a>
      <UserIcon className="h-7 w-7" />
    </a>
  </Link>
)

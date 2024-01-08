import React ,{useCallback} from 'react'
import { HomeIcon, LogoutIcon, LoginIcon, UserAddIcon, UserIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { AppDispatch, RootState } from 'app/store'
import { fetchAsyncLogout } from 'features/account/accountSlice/actions'
import { useDispatch } from 'react-redux' 
import { setIsLogout } from 'features/account/accountSlice'
import useNavigation from 'hooks/utils/useNavigation'

export const HomeIconComponent = () => (
  <div className="text-lg font-extrabold">
  <Link href="/" legacyBehavior>
    <HomeIcon className="md:h-7 md:w-7 h-10 w-10" />
  </Link>
  </div>
)

export const LogoutIconComponent = () => {
  const dispatch:AppDispatch = useDispatch()
  const { handleHome } = useNavigation()
  const logoutHandler = useCallback(async () => {
    try {
      const result = await dispatch(fetchAsyncLogout())
      if (fetchAsyncLogout.fulfilled.match(result)) {
        dispatch(setIsLogout())
        handleHome()
      }
    } catch(error) {
      console.error(error)
    }
  },[dispatch,])
  return (
  <div onClick={logoutHandler} className="cursor-pointer">
    <LogoutIcon className="md:h-7 md:w-7 h-10 w-10" />
  </div>
  )
}

export const LoginIconComponent = () => (
  <Link href="/login" legacyBehavior>
    <a>
      <LoginIcon className="md:h-7 md:w-7 h-10 w-10" />
    </a>
  </Link>
)

export const RegisterIconComponent = () => (
  <Link href="/register" legacyBehavior>
    <a>
      <UserAddIcon className="md:h-7 md:w-7 h-10 w-10" />
    </a>
  </Link>
)

export const UserIconComponent = () => (
  <Link href="/account/mypage" legacyBehavior>
    <a>
      <UserIcon className="md:h-7 md:w-7 h-10 w-10" />
    </a>
  </Link>
)

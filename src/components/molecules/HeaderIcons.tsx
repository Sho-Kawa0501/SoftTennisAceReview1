import React ,{useCallback} from 'react'
import { HomeIcon, LogoutIcon, LoginIcon, UserAddIcon, UserIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { AppDispatch, RootState } from 'app/store'
import { fetchAsyncLogout } from 'features/account/accountSlice/actions'
import { useDispatch } from 'react-redux' 
import { setIsLoading,resetIsLoading } from 'features/app/appSlice'
import { setIsLogout } from 'features/account/accountSlice'
import useNavigation from 'hooks/utils/useNavigation'

export const HomeIconComponent = () => (
  <div className="text-lg sm:text-sm font-extrabold">
  <Link href="/" legacyBehavior>
    <HomeIcon className="md:h-7 md:w-7 h-5 w-5" />
  </Link>
  </div>
)


export const LogoutIconComponent = () => {
  const dispatch:AppDispatch = useDispatch()
  const { handleHome } = useNavigation()
  const logoutHandler = useCallback(async () => {
    try {
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        await dispatch(fetchAsyncLogout())
        dispatch(setIsLogout())
        handleHome()
      }
    } finally {
     
    }
  },[dispatch,])
  return (
  <div onClick={logoutHandler} className="cursor-pointer">
    <LogoutIcon className="md:h-7 md:w-7 h-5 w-5" />
  </div>
  )
}

export const LoginIconComponent = () => (
  <Link href="/login" legacyBehavior>
    <a>
      <LoginIcon className="md:h-7 md:w-7 h-5 w-5" />
    </a>
  </Link>
)

export const RegisterIconComponent = () => (
  <Link href="/register" legacyBehavior>
    <a>
      <UserAddIcon className="md:h-7 md:w-7 h-5 w-5" />
    </a>
  </Link>
)

export const UserIconComponent = () => (
  <Link href="/account/mypage" legacyBehavior>
    <a>
      <UserIcon className="md:h-7 md:w-7 h-5 w-5" />
    </a>
  </Link>
)

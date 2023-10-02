import React,{ ReactNode,useEffect,useMemo } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { NextPage } from 'next'
import { 
  // fetchAsyncVerify,
  fetchAsyncGetRefreshToken,
  fetchAsyncCheckAuth,
  fetchAsyncNewToken
} from 'features/account/accountSlice/'
import { setIsLoading,resetIsLoading, selectIsLoading } from 'features/app/appSlice'
import { resetIsNewReview } from 'features/review/slice/reducers'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { AppDispatch,RootState } from 'app/store'
import { useRouter } from 'next/router'
import LoadingSpinner from './LoadingSpinner'

interface LayoutProps {
  children: ReactNode
}

const Layout:NextPage<LayoutProps> = ({children}) => {
  const loginUser = useSelector((state:RootState) => state.account.loginUser)
  const isLoading = useSelector((state:RootState) => state.app.isLoading)
  const router = useRouter()

  // if (isLoading) {
  //   return <></>
  // }

  return (
    <>
      <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className="max-w-7xl mx-auto px-8 py-6">{children}</div>
      <Footer />
      </div>
    </>
  )
}


export default Layout
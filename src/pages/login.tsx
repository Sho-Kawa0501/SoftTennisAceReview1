import React,{useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
//ログイン関数
import { AppDispatch } from 'app/store'
import { Credential } from 'types/accountTypes'
import { 
  fetchAsyncLogin,
  fetchAsyncCheckAuth,
  selectIsAuthenticated,
} from 'features/account/accountSlice/'
import { fetchAsyncMyReview } from 'features/review/slice'
import Head from 'next/head'
import AccountSinginForm from 'components/organisms/AccountSigninForm'
import { setIsLogin } from 'features/account/accountSlice/'
import useNavigation from 'hooks/utils/useNavigation'


const Login = () => {
  const dispatch:AppDispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  console.log("ログインisA"+isAuthenticated)
  const { handleHome } = useNavigation()
  const onSubmit = async (credential: Credential) => {
    if(!credential) {
      return
    } 
    try {
    const result = await dispatch(fetchAsyncLogin(credential))
      if (fetchAsyncLogin.fulfilled.match(result)) {
        await dispatch(fetchAsyncCheckAuth())
        await dispatch(fetchAsyncMyReview())
        dispatch(setIsLogin())
        handleHome()
      }
    } catch(error){
      console.error("Login:"+error)
    }
  }

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <AccountSinginForm onSubmit={onSubmit} />
    </>
  )
}

export default Login
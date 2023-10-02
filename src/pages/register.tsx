import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { 
  fetchAsyncRegister,
  fetchAsyncLogin,
  setIsAuthenticated,
  fetchAsyncCheckAuth,
  } from 'features/account/accountSlice/'
import Head from 'next/head'
import { AppDispatch, RootState } from 'app/store'
import { NextPage } from 'next'
import { setIsLoading,resetIsLoading } from 'features/app/appSlice'
import { Credential } from 'features/account/AccountTypes'
import AccountSinginForm from 'components/AccountSigninForm'

const Register = () => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const isAuthenticated = useSelector((state:RootState) => state.account.isAuthenticated)
  const authError = useSelector((state: RootState) => state.account.authError)

  const onSubmit = async (credential: Credential) => {
    try {
      dispatch(setIsLoading())
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        await dispatch(fetchAsyncRegister(credential))
      }
        const result = await dispatch(fetchAsyncLogin(credential))
        if (fetchAsyncLogin.fulfilled.match(result)) {
          await dispatch(setIsAuthenticated())
          // await dispatch(fetchAsyncCheckAuth())
        }
      
    } finally {
        setTimeout(() => {
          dispatch(resetIsLoading())
        }, 200)
    }
  }

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>AceRacketRealm | アカウント登録</title>
      </Head>

      <div className="text-center text-2xl mb-5">アカウント登録</div>
      <AccountSinginForm onSubmit={onSubmit} authError={authError} />
    </>
  )
}

export default Register
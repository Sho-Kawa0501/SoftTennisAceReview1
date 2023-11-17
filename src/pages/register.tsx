import React,{ useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  fetchAsyncRegister,
  fetchAsyncLogin,
  setIsAuthenticated,
  fetchAsyncCheckAuth,
  } from 'features/account/accountSlice/'
import Head from 'next/head'
import { AppDispatch, RootState } from 'app/store'
import { setIsLoading,resetIsLoading } from 'features/app/appSlice'
import { Credential } from 'types/accountTypes'
import AccountSinginForm from 'components/organisms/AccountSigninForm'
import { setIsRegister } from 'features/account/accountSlice/'
import useNavigation from 'hooks/utils/useNavigation'
import { AlertMessage } from 'components/Atoms/AlertMessage'
import { useAlertReviewMessage } from 'hooks/review/useAlertReviewMessage'



const Register = () => {
  const dispatch:AppDispatch = useDispatch()
  const { handleHome } = useNavigation()
  const { showMessage } = useAlertReviewMessage()
  const onSubmit = async (credential: Credential) => {
    if (!credential) {
      return 
    }
    try {
      const result = await dispatch(fetchAsyncRegister(credential))
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(credential))
        await dispatch(fetchAsyncCheckAuth())
        dispatch(setIsRegister())
        handleHome()
      }  
    } catch(error) {
      console.error("Register:"+error)
    }
  }

  return (
    <>
      <Head>
        <title>アカウント登録</title>
      </Head>
      <div className="text-center text-2xl mb-5">アカウント登録</div>
      {showMessage.show && (
        <AlertMessage message={showMessage.message} color={showMessage.color} />
      )}
      <AccountSinginForm onSubmit={onSubmit} />
    </>
  )
}

export default Register
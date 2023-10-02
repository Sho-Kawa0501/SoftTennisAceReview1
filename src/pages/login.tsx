import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
//ログイン関数
import { AppDispatch } from 'app/store'
import { Credential } from 'features/account/AccountTypes'
import { 
  fetchAsyncLogin,
  setIsAuthenticated,
  fetchAsyncCheckAuth
} from 'features/account/accountSlice/'
import Head from 'next/head'
import { RootState } from 'app/store'
import { setIsLoading,resetIsLoading } from 'features/app/appSlice'
import AccountSinginForm from 'components/AccountSigninForm'
import AppBackButton from 'components/AppBackButton'


const Login = () => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  //state.accountはstore.tsのreducerの中のaccountを指している
  const isAuthenticated = useSelector((state:RootState) => state.account.isAuthenticated)
  const authError = useSelector((state: RootState) => state.account.authError)
  // const isLoading = useSelector((state:RootState) => state.app.isLoading)

  const onSubmit = async (credential: Credential) => {
    try {
    dispatch(setIsLoading())
    // if (dispatch && dispatch !==null && dispatch !== undefined) {
    //   await dispatch(fetchAsyncLogin(credential))
    // }

    const result = await dispatch(fetchAsyncLogin(credential))
      if (fetchAsyncLogin.fulfilled.match(result)) {
        await dispatch(fetchAsyncCheckAuth())
        await dispatch(setIsAuthenticated())
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
        <title>ログイン</title>
      </Head>
      <AccountSinginForm onSubmit={onSubmit} authError={authError} />
      {/* <AppBackButton /> */}
    </>
  )
}

export default Login
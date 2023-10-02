import { Provider,useSelector } from 'react-redux'
import { store } from '../app/store';
import Layout from '../components/Layout'
import { Auth } from 'components/Auth';
import { AppRoot } from 'components/AppRoot';
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { AppDispatch,RootState } from 'app/store'
import { useDispatch } from 'react-redux';
import LoadingSpinner from 'components/LoadingSpinner'


const MyApp = ({ Component, pageProps }:AppProps) => {
  

  //const store = useStore(pageProps.initialReduxState)
  //全てのコンポーネントでstoreの情報を扱えるようにするためにProviderを使用する
  //reactでいうuseContextのようなもの
  return (
    <Provider store={store}>
      <AppRoot>
      <LoadingSpinner />
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </AppRoot>
    </Provider>
  )
}

export default MyApp
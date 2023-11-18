import React,{ ReactNode,useEffect,useMemo } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Head from 'next/head'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import { selectActiveModal } from 'features/app/appSlice'
import { AppDispatch,RootState } from 'app/store'

type LayoutProps = {
  children: ReactNode
}

const Layout:React.FC<LayoutProps> = ({children}) => {
  const isActiveModal = useSelector(selectActiveModal)
  useEffect(() => {
    console.log("Layout Component Mounted")
  }, [])

  useEffect(() => {
    if (isActiveModal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isActiveModal])
  
  return (
    <>
      <div className="min-h-screen">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className="max-w-7xl mx-auto px-8 py-6 mb-auto">
        {children}
      </div>  
      <Footer />
      </div>
    </>
  )
}

export default React.memo(Layout)
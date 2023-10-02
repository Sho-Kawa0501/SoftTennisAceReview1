import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import HeaderContent from './HeaderContent'
import { RootState } from 'app/store'

const Header = () => {

  const isAuthenticated = useSelector((state:RootState) => state.account.isAuthenticated)
  return (
    <div>
      <HeaderContent isAuthenticated={isAuthenticated}/>
    </div>
  )
}


export default React.memo(Header)
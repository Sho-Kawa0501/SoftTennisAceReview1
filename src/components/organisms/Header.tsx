import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import HeaderContent from './HeaderContent'
import { RootState } from 'app/store'
import { selectIsAuthenticated } from 'features/account/accountSlice'

const Header = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated)
  return (
    <div>
      <HeaderContent />
    </div>
  )
}


export default React.memo(Header)
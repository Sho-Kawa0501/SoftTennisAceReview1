import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HeaderContent from './HeaderContent'
import { selectIsAuthenticated } from 'features/account/accountSlice'

const Header = () => {

  return (
    <div>
      <HeaderContent />
    </div>
  )
}


export default React.memo(Header)
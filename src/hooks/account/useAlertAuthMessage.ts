import React,{useEffect,useState} from 'react'
import { AppDispatch } from 'app/store'
import { useDispatch,useSelector } from 'react-redux'
import { 
  selectIsDeleteUser,
  selectIsRegister,
  selectIsLogin,
  selectIsLogout,
  selectIsEditProfile,
} from 'features/account/accountSlice'
import { 
  resetIsDeleteUser,
  resetIsLogin,
  resetIsRegister,
  resetIsLogout,
  resetIsEditProfile
} from 'features/account/accountSlice'

export const useAlertAuthMessage = () => {
  const dispatch:AppDispatch = useDispatch()
  const isLogin = useSelector(selectIsLogin)
  const isLogout = useSelector(selectIsLogout)
  const isRegister = useSelector(selectIsRegister)
  const isDeleteUser = useSelector(selectIsDeleteUser)
  const isEditProfile = useSelector(selectIsEditProfile)
  
  const [showMessage, setShowMessage] = useState({ 
    message: "",
    show: false,
    color: "",
  })

  const handleShowMessage = () => {
    setTimeout(() => {
      setShowMessage(prevState => ({ ...prevState, show: false }))
    }, 2000)
  }
  
  useEffect(() => {
    if (isLogin) {
      setShowMessage({ message: "ログインが完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsLogin())
    }
  }, [isLogin])

  useEffect(() => {
    if (isLogout) {
      setShowMessage({ message: "ログアウトが完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsLogout())
    }
  }, [isLogout])

  useEffect(() => {
    if (isRegister) {
      setShowMessage({ message: "新規登録が完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsRegister())
    }
  }, [isRegister])

  useEffect(() => {
    if (isDeleteUser) {
      setShowMessage({ message: "退会処理が完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsDeleteUser())
    }
  }, [isDeleteUser])
  useEffect(() => {
    if (isEditProfile) {
      setShowMessage({ message: "プロフィール編集が完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsEditProfile())
    }
  }, [isEditProfile])
 
  return {
    showMessage
  }
}

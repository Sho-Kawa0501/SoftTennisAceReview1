import React,{useEffect,useState} from 'react'
import { AppDispatch } from 'app/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { 
  selectIsEditReview,
  selectIsNewReview,
  selectIsDeleteReview,
} from 'features/review/slice'
import { 
  resetIsEditReview,
  resetIsNewReview,
  resetIsDeleteReview
} from 'features/review/slice'

export const useAlertReviewMessage = () => {
  const dispatch:AppDispatch = useDispatch()
  const isNewReview = useSelector(selectIsNewReview)
  const isEditReview = useSelector(selectIsEditReview)
  const isDeleteReview = useSelector(selectIsDeleteReview)
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
    if (isNewReview) {
      setShowMessage({ message: "レビュー投稿が完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsNewReview())
    }
  }, [isNewReview])

  useEffect(() => {
    if (isEditReview) {
      setShowMessage({ message: "レビュー編集が完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsEditReview())
    }
  }, [isEditReview])

  useEffect(() => {
    if (isDeleteReview) {
      setShowMessage({ message: "レビュー削除が完了しました", show: true,color:"blue", })
      handleShowMessage()
      dispatch(resetIsDeleteReview())
    }
  }, [isDeleteReview])
  return {
    showMessage
  }
}

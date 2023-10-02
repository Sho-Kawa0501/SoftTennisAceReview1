import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AppDispatch,RootState } from 'app/store'
import { resetIsDeleteReview,} from 'features/review/slice/reducers'
import { fetchAsyncDeleteReview } from 'features/review/slice/actions'
import { setActiveModal, selectActiveModal } from 'features/app/appSlice'
import { NextPage } from 'next'

interface ReviewDeleteModalProps {
  reviewId: string;
}

const ReviewDeleteModal:NextPage<ReviewDeleteModalProps> = ({ reviewId }:ReviewDeleteModalProps) => {
  const dispatch: AppDispatch = useDispatch()
  const activeModal = useSelector(selectActiveModal)
  const isDeleteReview = useSelector((state: RootState) => state.review.isDeleteReview)
  const router = useRouter()
  const modalIsOpen = activeModal === 'ReviewDeleteModal'

  const openModal = () => {
    dispatch(setActiveModal('ReviewDeleteModal'))
  }

  const closeModal = () => {
    dispatch(setActiveModal(null))
  }

  const deleteReview = async (reviewId: string) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(fetchAsyncDeleteReview(reviewId))
    }
  }

  const handleClick = () => {
    deleteReview(reviewId)
  }

  //削除成功
  if (isDeleteReview) {
    router.reload()
    dispatch(resetIsDeleteReview())
    closeModal()
  }

  return (
    <div>
      <button onClick={openModal}>Delete</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
      >
        <h2>Are you sure you want to delete this review?</h2>
        <button onClick={handleClick}>Yes, delete it</button>
        <button onClick={closeModal}>No, keep it</button>
      </Modal>
    </div>
  )
}

export default ReviewDeleteModal

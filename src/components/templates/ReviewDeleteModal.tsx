import { useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch, } from 'react-redux'
import { AppDispatch,RootState } from 'app/store'
import { setIsDeleteReview } from 'features/review/slice/reducers'
import { resetIsDeleteReview,} from 'features/review/slice/reducers'
import { fetchAsyncDeleteReview } from 'features/review/slice/actions'
import { setActiveModal, selectActiveModal } from 'features/app/appSlice'
import AppButton from 'components/Atoms/AppButton'


interface ReviewDeleteModalProps {
  reviewId: string;
}
const ReviewDeleteModal = ({ reviewId }: ReviewDeleteModalProps) => {
  const dispatch: AppDispatch = useDispatch()
  const activeModal = useSelector(selectActiveModal)
  const modalIsOpen = activeModal === 'ReviewDeleteModal'

  const openModal = () => {
    dispatch(setActiveModal('ReviewDeleteModal'))
  }

  const closeModal = () => {
    dispatch(setActiveModal(null))
  }

  const deleteReview = async () => {
    dispatch(fetchAsyncDeleteReview(reviewId))
    dispatch(setIsDeleteReview())
    closeModal()
  }

  const handleClick = () => {
    deleteReview()
  }

  return (
    <div>
      <button onClick={openModal}>Delete</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="w-1/2 mt-10 mx-auto bg-white p-6 rounded" // Adjust width and styling here
        overlayClassName="fixed inset-0 bg-black bg-opacity-50" // Add overlay styling
        shouldCloseOnOverlayClick={false}
        shouldFocusAfterRender={true}
      >
        <h2>この操作は取り消せません。本当にレビューを削除しますか？</h2>
        <div className="flex justify-center">
          <AppButton text="削除する" type={"submit"} color="red" onClick={handleClick} />
          <AppButton text="戻る" type="button" onClick={closeModal} color="blue" />
        </div>
      </Modal>
    </div>
  )
}

export default ReviewDeleteModal
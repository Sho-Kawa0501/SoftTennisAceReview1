import { useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AppDispatch,RootState } from 'app/store'
//変更
import { resetIsDeleteUser,fetchAsyncDeleteUser, } from 'features/account/accountSlice/'
import { setActiveModal, selectActiveModal } from 'features/app/appSlice'
import { NextPage } from 'next'

const DeleteUserModal:NextPage = () => {
  const dispatch: AppDispatch = useDispatch()
  //変更
  const isDeleteUser = useSelector((state: RootState) => state.review.isDeleteReview)
  const activeModal = useSelector(selectActiveModal)
  const router = useRouter()
  const modalIsOpen = activeModal === 'DeleteUserModal'

  const openModal = () => {
    dispatch(setActiveModal('DeleteUserModal'))
  }

  const closeModal = () => {
    dispatch(setActiveModal(null))
  }

  const deleteUser = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(fetchAsyncDeleteUser())
    }
    router.push('/')
  }

  const handleClick = () => {
    deleteUser()
  }

  //要変更
  if (isDeleteUser) {
    router.reload()
    dispatch(resetIsDeleteUser())
    closeModal()
  }

  return (
    <div>
      <button onClick={openModal}>アカウント削除</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
      >
        <h2>Are you sure you want to delete this User?</h2>
        <button onClick={handleClick}>Yes, delete it</button>
        <button onClick={closeModal}>No, keep it</button>
      </Modal>
    </div>
  )
}

export default DeleteUserModal
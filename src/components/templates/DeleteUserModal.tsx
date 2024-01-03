import { useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch,RootState } from 'app/store'
import { setIsDeleteUser,fetchAsyncDeleteUser, } from 'features/account/accountSlice/'
import { setActiveModal, selectActiveModal } from 'features/app/appSlice'
import AppButton from '../Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'

const DeleteUserModal = () => {
  const dispatch: AppDispatch = useDispatch()
  const activeModal = useSelector(selectActiveModal)
  const modalIsOpen = activeModal === 'DeleteUserModal'
  const openModal = () => {
    dispatch(setActiveModal('DeleteUserModal'))
  }

  const closeModal = () => {
    dispatch(setActiveModal(null))
  }

  const handleClick = () => {
    deleteUser()
  }

  const { handleHome } = useNavigation()

  const deleteUser = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(fetchAsyncDeleteUser())
    }
    dispatch(setIsDeleteUser())
    closeModal() 
    handleHome()
  }

  return (
    <div>
      <AppButton onClick={openModal} text="退会" type="submit" color="red"/>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="w-1/2 mt-20 mx-auto bg-white p-6 rounded"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        shouldCloseOnOverlayClick={false}
        shouldFocusAfterRender={true}
      >
        <h2 className="text-center">この操作は取り消せません。本当に退会しますか？</h2>
        <div className="flex justify-center">
          <AppButton text="退会する" type={"submit"} color="red" onClick={handleClick} />
          <AppButton text="戻る" type="button" onClick={closeModal} color="blue" />
        </div>
      </Modal>
    </div>
  )
}

export default DeleteUserModal
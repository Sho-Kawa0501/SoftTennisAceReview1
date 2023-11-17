import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface AppState {
  activeModal: string | null,
  isLoading:boolean,
  isModalOpen: boolean,
}

const initialState: AppState = {
  activeModal: null,
  isLoading:false,
  isModalOpen: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload
    },
    setIsLoading:(state) => {
      state.isLoading = true
    },
    resetIsLoading:(state) => {
      state.isLoading = false
    },
    setIsModalOpen:(state) => {
      state.isModalOpen = true
    },
    resetIsModalOpen:(state) => {
      state.isModalOpen = false
    }
    
  }
})

export const {
  setActiveModal,
  setIsLoading,
  resetIsLoading,
} = appSlice.actions
export const selectActiveModal = (state: RootState) => state.app.activeModal
export const selectIsLoading = (state: RootState) => state.app.isLoading
export const selectIsOpenModal = (state:RootState) => state.app.isModalOpen

export default appSlice.reducer

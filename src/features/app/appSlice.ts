import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface AppState {
  activeModal: string | null,
  isLoading:boolean,
  // isModalOpen: boolean,
  isButtonDisabled: boolean,
  
  selectedReviewId: string | null,
}

const initialState: AppState = {
  activeModal: null,
  isLoading:false,
  // isModalOpen: false,
  isButtonDisabled: false,
  selectedReviewId: null,
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
    // setIsModalOpen:(state) => {
    //   state.isModalOpen = true
    // },
    // resetIsModalOpen:(state) => {
    //   state.isModalOpen = false
    // },
    setIsButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.isButtonDisabled = action.payload;
    },
    setSelectedReviewId: (state, action: PayloadAction<string | null>) => {
      state.selectedReviewId = action.payload
    },
  }
})

export const {
  setActiveModal,
  setIsLoading,
  resetIsLoading,
  setIsButtonDisabled,
  setSelectedReviewId,
} = appSlice.actions

export const selectActiveModal = (state: RootState) => state.app.activeModal
export const selectIsLoading = (state: RootState) => state.app.isLoading
export const selectIsButtonDisabled = (state: RootState) => state.app.isButtonDisabled
export const selectSelectedReviewId = (state: RootState) => state.app.selectedReviewId

export default appSlice.reducer

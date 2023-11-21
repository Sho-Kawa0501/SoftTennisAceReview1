import * as actions from './actions'
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Review, } from 'types/types'
import { handleActionError } from 'lib/utils/handleActionError'

type InitialState = {
  reviews: Review[],
  myReview: Review[],
  isNewReview: boolean,
  isEditReview:boolean,
  reviewError:string | null,
  isDeleteReview: boolean,
  
}

const initialState:InitialState = {
  reviews: [],
  myReview:[],
  isNewReview: false,
  isEditReview:false,
  reviewError:'',
  isDeleteReview: false,
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    fetchReviewStart(state) {
  
    },
    fetchReviewEnd(state) {
      
    },
    setIsNewReview(state) {
      state.isNewReview = true
    },
    resetIsNewReview(state) {
      state.isNewReview = false
    },
    setIsEditReview(state) {
      state.isEditReview = true
    },
    resetIsEditReview(state) {
      state.isEditReview = false
    },
    resetIsReviewErrorMessage(state) {
      state.reviewError = ""
    },
    setIsDeleteReview(state) {
      state.isDeleteReview = true
    },
    resetIsDeleteReview(state) {
      state.isDeleteReview = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actions.fetchAsyncMyReview.fulfilled,
      (state,action:PayloadAction<Review[]>) => {
        return {
          ...state,
          myReview: action.payload
        }
      }
    )
    builder.addCase(actions.fetchAsyncMyReview.rejected, 
      (state,action) => {
        handleActionError(state, action, 'マイレビュー取得に失敗しました。','reviewError')
    })

    builder.addCase(actions.fetchAsyncNewReview.fulfilled,
      (state, action: PayloadAction<Review>) => {
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
        }
      })
      builder.addCase(actions.fetchAsyncNewReview.rejected, 
        (state,action) => {
          handleActionError(state, action, 'レビュー作成に失敗しました。','reviewError')
      })
    builder.addCase(actions.fetchAsyncEditReview.fulfilled,
      (state, action:PayloadAction<Review>) => {
        const index = state.reviews.findIndex(review => review.id === action.payload.id)
        if (index !== -1) {
          state.reviews[index] = action.payload
        }
      })
      builder.addCase(actions.fetchAsyncEditReview.rejected, 
        (state,action) => {
          handleActionError(state, action, 'レビュー編集に失敗しました','reviewError')
      })
      builder.addCase(actions.fetchAsyncDeleteReview.fulfilled,
        (state, action) => {
          const reviewId = action.meta.arg  // 削除されたレビューのIDを取得
          state.myReview = state.myReview.filter(review => review.id !== reviewId)  // ステートから削除
      })
   },
})


export const {
  fetchReviewStart,
  fetchReviewEnd,
  setIsNewReview,
  resetIsNewReview,
  setIsEditReview,
  resetIsEditReview,
  setIsDeleteReview,
  resetIsDeleteReview,
} =
  reviewSlice.actions

export default reviewSlice.reducer
import * as actions from './actions';

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface Review {
  id: string
  user: {
    name: string;
    image: string;
    id: string;
  };
  productId: number;
  title: string;
  content: string;
  image: string;
  favorites_count: number;
}

interface ReviewState {
  reviews: Review[],
  myReview: Review[],
  isNewReview: boolean,
  isReviewLoading: boolean,
  isDeleteReview: boolean,
}

const initialState:ReviewState = {
  reviews: [],
  myReview:[],
  isNewReview: false,
  isReviewLoading: false,
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
      state.isReviewLoading = true
    },
    resetIsEditReview(state) {
      state.isReviewLoading = false
    },
    setIsDeleteReview(state) {
      state.isDeleteReview = true
    },
    resetIsDeleteReview(state) {
      state.isDeleteReview = false
    }
  },
  //各非同期関数の処理が終了した後の処理。
  extraReducers: (builder) => {
    builder.addCase(actions.fetchAsyncGetMyReview.fulfilled,
      (state,action:PayloadAction<Review[]>) => {
        return {
          ...state,
          myReview: action.payload
        }
      }
    )
    builder.addCase(actions.fetchAsyncNewReview.pending,
      (state) => {
        
      })
    builder.addCase(actions.fetchAsyncNewReview.fulfilled,
      (state, action: PayloadAction<Review>) => {
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
          isNewReview: true,
          isloading:false,
        };
      })
      builder.addCase(actions.fetchAsyncEditReview.pending,
        (state) => {
          
        })
    builder.addCase(actions.fetchAsyncEditReview.fulfilled,
      (state, action:PayloadAction<Review>) => {
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
          
        }
      })
    builder.addCase(actions.fetchAsyncDeleteReview.pending,
      (state) => {
        
      })
    builder.addCase(actions.fetchAsyncDeleteReview.fulfilled,
      (state, action) => {
        return {
          ...state,
          isDeleteReview: true,
          
        }
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
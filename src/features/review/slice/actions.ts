import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { AppDispatch } from 'app/store'
import { NewReviewSubmitData,EditReviewSubmitData } from 'types/reviewTypes'// import { handleAsyncThunkAxiosError } from 'lib/utils/HandleAsyncThunkAxiosError'
import { Review } from 'types/types'
axios.defaults.withCredentials = true


interface EditReview {
  reviewId: string
  title: string
  content: string
  image: File | null
}


type AsyncThunkConfig = {
  state?: unknown
  dispatch?: AppDispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
}

type ToggleFavoriteParams = {
  reviewId: string
  isFavorite: boolean
}
//型...
//戻り値
//関数に使用する引数
//thunk

export const fetchAsyncMyReview = createAsyncThunk<
  Review[],//返り値の型
  void,//引数の型
  AsyncThunkConfig
>(
  'review/MyReview',
  async (_,{ rejectWithValue }) => {
    try {
    const response = await axios.get<Review[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_PATHE_PATH}/api/myreview_list/`,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch(error) {
    return rejectWithValue(error)
  }
}
)

export const fetchAsyncNewReview = createAsyncThunk<
  Review,
  NewReviewSubmitData,
  AsyncThunkConfig
>(
  'review/NewReview',
  async (newReview: NewReviewSubmitData,{ rejectWithValue }) => {
    const uploadData = new FormData()
    uploadData.append("title", newReview.title)
    uploadData.append("content", newReview.content)
    newReview.image && uploadData.append("image", newReview.image, newReview.image.name)

    try {
      const response = await axios.post<Review>(
        `${process.env.NEXT_PUBLIC_API_BASE_PATHE_PATHE_PATH}/api/review/create/${newReview.itemId}/`,
        uploadData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      return response.data
    } catch (error:unknown) {
      return rejectWithValue(error)
    }
  }
)

export const fetchAsyncEditReview = createAsyncThunk<
  Review,
  EditReviewSubmitData,
  AsyncThunkConfig
>(
  'review/EditReview',
  async (editReview: EditReviewSubmitData,{ rejectWithValue }) => {
    const uploadData = new FormData()
    uploadData.append("title", editReview.title)
    uploadData.append("content", editReview.content)
    editReview.image && uploadData.append("image", editReview.image)
    
    try {
      const response = await axios.patch<Review>(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/reviews/${editReview.reviewId}/`,
        uploadData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      return response.data
    } catch (error:unknown) {
      console.log("handleAsyncThunkAxiosError")
      return rejectWithValue(error)
    }
  }
)

export const fetchAsyncDeleteReview = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
>(
  'review/DeleteReview',
  async (reviewId: string,{ rejectWithValue }) => {
    try{
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/reviews/${reviewId}/`, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
  } catch(error:unknown) {
    return rejectWithValue(error)
  }}
)

export const fetchAsyncToggleFavorite = createAsyncThunk<
  boolean,
  ToggleFavoriteParams,
  AsyncThunkConfig
>(
  'favorites/ToggleFavorite',
  async ({reviewId, isFavorite,},{ rejectWithValue }) => {
    try {
      const response = await axios({
        url: isFavorite ?  
          `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review/set/${reviewId}/unfavorite/`
          : `${process.env.NEXT_PUBLIC_API_BASE_PATHE_PATHE_PATHE_PATHE_PATHE_PATH}/api/review/set/${reviewId}/favorite/`,
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (isFavorite && response.status !== 204) {
        throw new Error('Failed to delete favorite')
      } else if (!isFavorite && !response.data) {
        throw new Error('Failed to create favorite')
      }
      return true
    } catch (error:unknown) {
      return rejectWithValue(error)
    }
  },
)
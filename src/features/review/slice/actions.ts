import {
  createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { AppDispatch } from 'app/store'
import { NewReviewSubmitData,EditReviewSubmitData } from 'types/reviewTypes'
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

export const fetchAsyncMyReview = createAsyncThunk<
  Review[],
  void,
  AsyncThunkConfig
>(
  'review/MyReview',
  async (_,{ rejectWithValue }) => {
    try {
    const response = await axios.get<Review[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/myreview_list/`,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch(error:any) {
    if (error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error)
    }
  }
}
)

export const fetchAsyncSingleMyReview = createAsyncThunk<
  Review,
  void,
  AsyncThunkConfig
>(
  'review/MyReview',
  async (_,{ rejectWithValue }) => {
    try {
    const response = await axios.get<Review>(
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/myreview_list/reviewId/`,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch(error:any) {
    if (error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error)
    }
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
    newReview.image && uploadData.append("image", newReview.image)

    try {
      const response = await axios.post<Review>(
        `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review/create/${newReview.itemId}/`,
        uploadData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      return response.data
    } catch (error:any) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
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
    // editReview.image && uploadData.append("image", editReview.image)
    if (editReview.image !== null) {
      // 画像がある場合、その画像を追加
      editReview.image && uploadData.append("image", editReview.image);
    } else {
      // 画像がnullの場合、空の文字列を追加して画像を削除することを示す
      uploadData.append("image", "");
    }
    
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
      console.log("handleAsyncThunkAxios"+response.data.image)
      return response.data
    } catch (error:any) {
      console.log("handleAsyncThunkAxiosError")
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
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
  } catch(error:any) {
    if (error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error)
    }
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
          : `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review/set/${reviewId}/favorite/`,
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
    } catch (error:any) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)
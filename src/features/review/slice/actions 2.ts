import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios'
import { AppDispatch } from 'app/store';
import { id } from 'date-fns/locale';

import type { RootState } from 'app/store';
import { NewReviewSubmitData,EditReviewSubmitData } from 'types/reviewTypes';// import { handleAsyncThunkAxiosError } from 'lib/utils/HandleAsyncThunkAxiosError';
import { Review } from 'types/types';
axios.defaults.withCredentials = true


interface FavoriteReview {
  id: number;
  title: string;
  content: string;
  favorites_count: number;
}

interface FavoriteState {
  favoritedReviews: number[];
}

export interface EditReview {
  reviewId: string
  title: string
  content: string
  image: File | null
}


type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
};

type ToggleFavoriteParams = {
  reviewId: string;
  isFavorite: boolean;
};
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/myreview_list/`,
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

//CreateReviewView
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/review/create/${newReview.itemId}/`,
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

//ReviewViewSet...reviewsは全てReviewViewSet
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${editReview.reviewId}/`,
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


//ReviewViewSet review_delete
export const fetchAsyncDeleteReview = createAsyncThunk<
void,
string,
AsyncThunkConfig
>(
  'review/DeleteReview',
  async (reviewId: string,{ rejectWithValue }) => {
    try{
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${reviewId}/`, 
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
  boolean, // Return type of the payload creator
  ToggleFavoriteParams, // First argument to the payload creator
  AsyncThunkConfig
>(
  'favorites/ToggleFavorite',
  async ({reviewId, isFavorite,},{ rejectWithValue }) => {
    try {
      const response = await axios({
        //urlに対して条件分岐を行う
        url: isFavorite ?  
          `${process.env.NEXT_PUBLIC_API_URL}/api/review/set/${reviewId}/unfavorite/`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/review/set/${reviewId}/favorite/`,
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (isFavorite && response.status !== 204) {
        throw new Error('Failed to delete favorite');
      } else if (!isFavorite && !response.data) {
        throw new Error('Failed to create favorite');
      }
      return true;
    } catch (error:unknown) {
      return rejectWithValue(error)
    }
  },
);
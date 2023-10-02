import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios'
import { id } from 'date-fns/locale';

import type { RootState } from 'app/store';
import { NewReview, } from 'types';
axios.defaults.withCredentials = true

interface CREATE_FAVORITE {
  userId: string
  reviewId: string
}

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
  id: number
  title: string
  content: string
  image: File | null
}

export const fetchAsyncGetMyReview = createAsyncThunk(
  'review/MyReview',
  async (itemId:number,thunkAPI) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/myreview_list/${itemId}/`,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
    return response.data
  }
)

//CreateReviewView
export const fetchAsyncNewReview = createAsyncThunk(
  'review/NewReview',
  async (newReview: NewReview) => {
    const uploadData = new FormData()
    uploadData.append("title", newReview.title)
    uploadData.append("content", newReview.content)
    newReview.image && uploadData.append("image", newReview.image, newReview.image.name)

    try {
      const response2 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/create/${newReview.itemId}/`,
        uploadData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      return response2.data
    } catch (error) {
      throw error
    }
  }
)

//ReviewViewSet...reviewsは全てReviewViewSet
export const fetchAsyncEditReview = createAsyncThunk(
  'review/EditReview',
  async (editReview: EditReview) => {
    const uploadData = new FormData()
    uploadData.append("title", editReview.title)
    uploadData.append("content", editReview.content)
    editReview.image && uploadData.append("image", editReview.image)
    
    try {
      const response2 = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${editReview.id}/`,
        uploadData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      return response2.data
    } catch (error) {
      throw error
    }
  }
)


//ReviewViewSet review_delete
export const fetchAsyncDeleteReview = createAsyncThunk(
  'review/DeleteReview',
  async (reviewId: string) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${reviewId}/`, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return res.data
  }
)

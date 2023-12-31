import useSWR from 'swr'
import { fetcherWithCredential } from 'lib/utils'
import axios from 'axios'
import { handleAxiosError } from 'lib/utils/HandleAxiosError'

type FavoriteReview = {
  favoriteCounts: number
  isError: any
}

type FavoriteResponse = {
  isFavorite: number
}

export const fetchFavoriteCount = async (reviewId: string): Promise<FavoriteReview> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review/favorites_count/${reviewId}/`, {
      // ここに必要に応じて認証情報などを設定します
    })
    return { 
      favoriteCounts: response.data.favorites_count,
      isError: null 
    }
  } catch (error) {
    return { 
      favoriteCounts: 0,
      isError: handleAxiosError(error)
    }
  }
}
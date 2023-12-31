import useSWR from 'swr'
import { fetcherWithCredential } from 'lib/utils'
import axios from 'axios'
import { handleAxiosError } from 'lib/utils/HandleAxiosError'

type FavoriteReview = {
  isFavorite: boolean
  isError: any
}

type FavoriteResponse = {
  isFavorite: boolean
}

export const fetchIsFavorite = async (reviewId: string): Promise<FavoriteReview> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review/${reviewId}/favorite/`, {
      // ここに必要に応じて認証情報などを設定します
    })
    return { 
      isFavorite: response.data.isFavorite,
      isError: null 
    }
  } catch (error) {
    return { 
      isFavorite: false,
      isError: handleAxiosError(error)
    }
  }
}
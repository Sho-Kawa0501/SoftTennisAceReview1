import React from 'react'
import { Review } from 'types/types'
import useSWR from 'swr'
import { fetcherWithCredential } from 'lib/utils'
import { handleAxiosError } from 'lib/utils/HandleAxiosError'

type FavoriteReview = {
  favorites_count: number | undefined
  isError: any
}

type FavoritesCount = {favorites_count: number}

const useFavoritesCount = (reviewId:string): FavoriteReview => {
  const { data, error } = useSWR<FavoritesCount>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATHE_PATH}/api/review/favorites_count/${reviewId}/`,
    (url: string) => fetcherWithCredential(url, 'get'),
    {
      revalidateOnMount: true,
    }
  )

  return { 
    favorites_count: data?.favorites_count,
    isError: error ? handleAxiosError(error) : null,
  }
}

export default useFavoritesCount
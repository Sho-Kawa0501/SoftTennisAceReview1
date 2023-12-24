import React from 'react'
import { Review } from 'types/types'
import useSWR from 'swr'
import { fetcherWithCredential } from 'lib/utils'
import { handleAxiosError } from 'lib/utils/HandleAxiosError'
import axios from 'axios'

type GetReviewProps = {
  itemId: number
  initial?: Review[]
}

type GetReview = {
  review: Review[] | undefined
  isError: any
}

const getAllReview = async (
  { itemId, initial }: GetReviewProps
): Promise<GetReview> => {
  try {
    const response = await axios.get<Review[]>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review_list/${itemId}`, {
      withCredentials: true, 
    })

    return {
      review: response.data ?? initial,
      isError: null,
    };
  } catch (error) {
    return {
      review: initial,
      isError: error,
    };
  }
};

export default getAllReview

// const getAllReview = (
//   { itemId, initial }: GetReviewProps
// ): GetReview => {
//   const { data, error } = useSWR<Review[]>(
//     `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review_list/${itemId}`,
//     (url: string) => fetcherWithCredential(url, 'get')
//   )

//   return {
//     review: data ?? initial,
//     isError: error ? handleAxiosError(error) : null,
//   }
// }

// export default getAllReview
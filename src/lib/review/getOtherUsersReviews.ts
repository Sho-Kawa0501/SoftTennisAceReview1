import React from 'react'
import { Review } from 'types/types'
import axios from 'axios'


type GetReviewProps = {
  itemId: number;
  initial?: Review[];
};

type GetReview = {
  review: Review[] | undefined;
  isError: any;
};

const getOtherUserReviews = async (
  { itemId, initial }: GetReviewProps
): Promise<GetReview> => {
  try {
    const response = await axios.get<Review[]>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/otherusers_review_list/${itemId}`, {
      withCredentials: true, // 認証が必要な場合
    });

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

export default getOtherUserReviews;
import { Params, ParamsNum } from "types"

interface ReviewId {
  params: {
    reviewId: string;
  };
}

export const getReviewIds = async (): Promise<ReviewId[]> => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review_list/`, {
    method: 'GET',
  })
  const reviews = await apiRes.json()

  return reviews.map((review: Params) => ({
    params: {
      reviewId: review.id.toString(),
    },
  }))
}
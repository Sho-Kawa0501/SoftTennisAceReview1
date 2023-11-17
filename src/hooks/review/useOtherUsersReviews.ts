import React from "react";
import { Review } from "types/types";
import useSWR,{ useSWRConfig } from "swr";
import { fetcherWithCredential } from "lib/utils";
import { handleAxiosError } from "lib/utils/HandleAxiosError";

type UseReviewProps = {
  // isAuthenticated: boolean;
  itemId: string
  initial?: Review[];
};

type UseReview = {
  review: Review[] | undefined;
  isError: any;
};

const useOtherUserReviews = (
  { itemId, initial }: UseReviewProps
  ): UseReview => {
  const { data, error } = useSWR<Review[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/otherusers_review_list/${itemId}`,
    (url: string) => fetcherWithCredential(url, 'get')
  );

  return {
    review: data ?? initial,
    isError: error ? handleAxiosError(error) : null,
  }
}

export default useOtherUserReviews
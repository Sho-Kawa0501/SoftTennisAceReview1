import React from "react";
import { Review } from "types/types";
import useSWR,{ useSWRConfig } from "swr";
import { fetcherWithCredential } from "lib/utils";
import { handleAxiosError } from "lib/utils/HandleAxiosError";
type UseReviewProps = {
  itemId:string
  initial?: Review[];
};

type UseReview = {
  review: Review[] | undefined;
  isError: any;
};

const useAllReview = (
  { itemId, initial }: UseReviewProps
): UseReview => {
  const { data, error } = useSWR<Review[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review_list/${itemId}`,
    (url: string) => fetcherWithCredential(url, 'get')
  );

  return {
    review: data ?? initial,
    isError: error ? handleAxiosError(error) : null,
  }
}

export default useAllReview
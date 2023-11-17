import useSWR, { mutate } from 'swr';
import { fetcherWithCredential } from 'lib/utils';
import { handleAxiosError } from 'lib/utils/HandleAxiosError';

type FavoriteReview = {
  isFavorite: boolean;
  isError: any;
};

type FavoriteResponse = {
  isFavorite: boolean;
};

export const useIsFavorite = (reviewId: string):FavoriteReview => {
  const { data,error } = useSWR<FavoriteResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`,
    (url:string) => fetcherWithCredential(url, 'get'),
  );

  return {
    isFavorite: data?.isFavorite,
    isError: error ? handleAxiosError(error) : null,
  }
};

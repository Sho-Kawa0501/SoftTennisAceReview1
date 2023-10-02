import { NextPage,GetServerSideProps} from 'next';
import useSWR, { mutate } from 'swr';
import { useState,useEffect } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { fetcherWithCredential } from 'lib/posts';
import axios, { AxiosError } from 'axios'
import { useDebouncedCallback } from 'use-debounce'


type Review = {
  id: string
  user: string
  item: string
  text: string
  created_at: string
  favorites_count: number
}

type Props = {
  userId: string;
  reviewId: string;
}

type FavoriteResponse = { isFavorite: boolean }
type FavoritesCount = {favorites_count: number}
type SSRProps = {favorites_count:number}
// const fetcher = (url:string) => fetch(url).then((res) => res.json())

//userIdを使わないのであればpageの方でuserIdを送らないようにする
//1つ1つのいいねのマークとカウントを表示させる
const FavoriteReview: NextPage<Props> = ({ reviewId, }) => {
  //対象のreviewidを持つレビュー情報を取得 
  //reviewのカウントだけを返す関数に変更
  //ReviewDetailView
  const {data:reviewSWR,error} = useSWR<FavoritesCount>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/favorites_count/${reviewId}/`, 
    url => fetcherWithCredential(url, 'get',),
    {
      revalidateOnMount: true,  // SWRがマウント時に再検証するようにします
      // fallbackData: { favorites_count: initialFavoritesCount }
    }
  )

  const reviewData = reviewSWR
  const [isFavorite, setIsFavorite] = useState<boolean>()

  //新コード

  //いいねがあるかないかを返却
  const {data:isFavoriteSWR,} = useSWR<FavoriteResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`, 
      url => {
      return fetcherWithCredential(url, 'get',)
    })
    
    useEffect(() => {
      if (isFavoriteSWR !== undefined) {
        setIsFavorite(isFavoriteSWR.isFavorite)
      }
    }, [isFavoriteSWR]
  )

  
  const toggleFavorite = useDebouncedCallback(async () => {
    if (isFavorite === undefined || !reviewData) {
      return
    }
    //いいねの数 フロントエンドでしか行われない処理
    //mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/favorite_count/${reviewId}/`, { ...reviewData, favorites_count: newFavoriteCount }, false)
    //いいねがあるかどうか
    //GetFavoriteReviewView
    //第１引数がisFavoriteのbool値を返してくるので、そのbool値を反転させたものがキャッシュに保存される
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`, !isFavorite, false)
    
    try {
      //関数化すること
      const response = await axios({
        //FavoriteViewSet
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/review/set/${reviewId}/`,
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (isFavorite && response.status !== 204) {
        throw new Error('Failed to delete favorite');
      } else if (!isFavorite && !response.data) {
        throw new Error('Failed to create favorite');
      }

      // Revalidate SWR cache after successful mutation
      //mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/favorite_count/${reviewId}/`)
      //reviewIdとloginUserの情報を使い、いいねがあるかないかを返却
      //GetFavoriteReviewView
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`)
      //ReviewDetailView
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/favorites_count/${reviewId}/`)
      
    } catch (error) {
      console.error('Failed to update favorite:', error);
      // If the mutation fails, revert the local data
      //エラーが出たら、値を元に戻す
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`,isFavorite, false)
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/favorites_count/${reviewId}/`,reviewData, false)
    }
    
  }, 300)
  

  return (
    <div>
      
      <button
        className="inline-flex space-x-2 items-center"
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <HiHeart className="text-pink-500" size={20} />
        ) : (
          <HiOutlineHeart className="text-gray-500" size={20} />
        )}
        <span>いいね</span>
        <span>{reviewSWR?.favorites_count}</span>
      </button>
    </div>
  );
};

export default FavoriteReview

//いいねの数をSSRで取得する
export const getServerSideProps :GetServerSideProps<SSRProps> = async (context)  => {
  const reviewId = context.params?.reviewId as string
  //これも関数にする
  const data = await fetcherWithCredential(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/favorites_count/${reviewId}/`
    ,'get'
  )
  return {
    props: {
      favorites_count: data.favorites_count
    }
  }
}
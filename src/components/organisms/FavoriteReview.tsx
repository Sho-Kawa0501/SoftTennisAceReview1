import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/store'
import useSWR, { mutate } from 'swr'
import { useState,useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import FavoriteButton from '../molecules/FavoriteButton'
import useFavoritesCount from 'hooks/review/useFavoriteCount'
import { useIsFavorite } from 'hooks/review/useFavoriteResponse'
import { fetchAsyncToggleFavorite } from '../../features/review/slice'

type Props = {
  userId: string
  reviewId: string
}

//1つ1つのいいねのマークとカウントを表示させる
const FavoriteReview: React.FC<Props> = ({ reviewId, }) => {
  const dispatch:AppDispatch = useDispatch()
  const reviewData = useFavoritesCount(reviewId)
  const [isFavorite, setIsFavorite] = useState<boolean>()

  //いいねがあるかないかを返却
  const isFavoriteSWR = useIsFavorite(reviewId)
  useEffect(() => {
    if (isFavoriteSWR !== undefined) {
      setIsFavorite(isFavoriteSWR.isFavorite)
    }
  }, [isFavoriteSWR])

  const toggleFavorite = useDebouncedCallback(async () => {
    if (isFavorite === undefined || !reviewData) {
      return
    }
    //いいねの数 フロントエンドでしか行われない処理
    //reviewIdとloginUser.idを使っていいねがあるかどうかを返す
    //GetFavoriteReviewView
    //第１引数がisFavoriteのbool値を返してくるので、そのbool値を反転させたものがキャッシュに保存される
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`, !isFavorite, false)
    
    try {
      const resultAction = await dispatch(fetchAsyncToggleFavorite({ reviewId, isFavorite }))

      if (fetchAsyncToggleFavorite.fulfilled.match(resultAction)) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`)
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/favorites_count/${reviewId}/`)
      } else {
        throw new Error('Failed to update favorite')
      }
    } catch (error) {
      console.error('Favorite:', error)
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/favorite/`, !isFavorite, false)
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/review/favorites_count/${reviewId}/`, reviewData, false)
    }
      
  }, 300)
  
  return (
    <div>
      <FavoriteButton isFavorite={!!isFavorite} onClick={toggleFavorite} count={reviewData.favorites_count} />
    </div>
  )
}

export default FavoriteReview
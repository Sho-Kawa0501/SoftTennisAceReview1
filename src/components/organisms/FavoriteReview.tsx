import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/store'
import useSWR, { mutate } from 'swr'
import { useState,useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import FavoriteButton from '../molecules/FavoriteButton'
import { fetchIsFavorite } from 'lib/review/fetchIsFavorite'
import { fetchFavoriteCount } from 'lib/review/fetchFavoriteCount'
import { fetchAsyncToggleFavorite } from '../../features/review/slice'

type Props = {
  userId: string
  reviewId: string
  // favoriteCounts: number
}

const FavoriteReview: React.FC<Props> = ({ reviewId, }) => {
  const dispatch:AppDispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState<boolean>()
  const [ favoriteCounts,setFavoriteCounts] = useState<number>() 
  useEffect(() => {
    const fetchData = async () => {
      const favoriteData = await fetchIsFavorite(reviewId)
      const favoriteCountData = await fetchFavoriteCount(reviewId)
      setIsFavorite(favoriteData.isFavorite)
      setFavoriteCounts(favoriteCountData.favoriteCounts)
    }
    fetchData()
  }, [reviewId])
  
  // const [favoriteCount, setFavoriteCount] = useState<number>(favoriteCounts)
  const [isUpdating, setIsUpdating] = useState(false)
  console.log("reviewD"+isFavorite+favoriteCounts)
  console.log("isF"+isFavorite)

  const toggleFavorite = useDebouncedCallback(async () => {
    setIsUpdating(true)
    const newFavoriteStatus = !isFavorite;
    try {
      const resultAction = await dispatch(fetchAsyncToggleFavorite({ reviewId, isFavorite }))
      if (fetchAsyncToggleFavorite.fulfilled.match(resultAction)) {
        setIsFavorite(newFavoriteStatus)
        setFavoriteCounts(newFavoriteStatus ? favoriteCounts + 1 : favoriteCounts - 1)
      } else {
        throw new Error('Failed to update favorite')
      }
    } catch (error) {
      console.error('Favorite:', error)
    } finally {
      setIsUpdating(false)
    }
  }, 100)
  
  return (
    <div>
      <FavoriteButton 
        isFavorite={isFavorite}
        onClick={toggleFavorite}
        count={favoriteCounts}
        disabled={isUpdating}
      />
    </div>
  )
}

export default FavoriteReview
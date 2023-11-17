import { useState, useEffect,useCallback,useRef } from 'react'
import { AppDispatch } from 'app/store'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import ReviewCardList from 'components/organisms/ReviewCardList'
import useFavoriteReview from 'hooks/review/useFavoriteReviews'
import { useAuthGuard } from 'hooks/auth'
import { selectIsAuthenticated } from 'features/account/accountSlice'
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'

const FavoriteReviewsPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  useAuthGuard()
  const favoriteReviewData = useFavoriteReview()
  const review = isAuthenticated ? favoriteReviewData.review : null;
  const { navigateTo } = useNavigation()
  const handleMyPage = () => navigateTo("/account/mypage/")
  

  return (
    <>
      <Head>
        <title>お気に入りレビューリスト</title>
      </Head>
      <AppButton text="マイページに戻る" type="button" onClick={handleMyPage} color="blue" />
      <ReviewCardList reviews={review} />
    </>
  )
}

export default FavoriteReviewsPage
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import ReviewCardList from 'components/organisms/ReviewCardList'
import axios from 'axios'
import useSWR from 'swr'
import useFavoriteReview from 'hooks/review/useFavoriteReviews'
import { fetcherWithCredential } from 'lib/utils'
import { useAuthGuard } from 'hooks/auth'
import { selectIsAuthenticated } from 'features/account/accountSlice'
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'

const FavoriteReviewsPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  useAuthGuard()
  const favoriteReviewData = useFavoriteReview()
  const { data: reviews = [], mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/favorite_list/`,
    (url: string) => fetcherWithCredential(url,'get'))
  const review = isAuthenticated ? favoriteReviewData.review : null
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
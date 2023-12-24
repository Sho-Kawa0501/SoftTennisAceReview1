import React,{ useState,useEffect,useMemo,useContext,useRef } from 'react'
import { useSelector, useDispatch,} from 'react-redux'
import { 
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import axios from 'axios'
import { AppDispatch,RootState } from 'app/store'
import { 
  getItemDetail,
  getItemIds
}from 'lib/item'
import { fetchAsyncMyReview } from 'features/review/slice'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { Item } from 'types/itemTypes'
import { PencilAltIcon } from '@heroicons/react/outline'
import ReviewDeleteModal from 'components/templates/ReviewDeleteModal'
import ItemDetail from 'components/molecules/ItemDetailCard'
import ReviewCard from 'components/molecules/ReviewCard'
import ReviewCardList from 'components/organisms/ReviewCardList'
import { AlertMessage } from 'components/Atoms/AlertMessage'
import { useAlertReviewMessage } from 'hooks/review/useAlertReviewMessage'
import { selectLoginUser,selectIsAuthenticated } from 'features/account/accountSlice'
import { selectMyReviews } from 'features/review/slice'
import { selectItems } from 'features/item/itemSlice'
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'
import { Review } from 'types/types'
import { fetcherWithCredential } from 'lib/utils'
import DeleteReviewButton from 'components/Atoms/DeleteReviewButton'
import { checkUserAuthentication } from 'pages/api/checkAuth'

type ReviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

//アイテム詳細をreduxで取得
//SSGでレビューを全取得する関数、APIを実行する
//以下の2つから選択
//マイレビューをUserReviewモデルからアイテムidとユーザーidを使って絞り込んで取得する関数、APIを作成する
//取得したすべてのレビューをfilterで回し、マイレビューを取得
export const ReviewListPage: NextPage<ReviewPageProps> = ({itemId,reviews}) => {
  const loginUser = useSelector(selectLoginUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const items = useSelector(selectItems)
  const itemDetail = itemId ? items.find(item => item.id === itemId) : null
  console.log("itemdetail"+itemDetail)

  const { showMessage } = useAlertReviewMessage()
  // const { data: swrReviews, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review_list/${itemId}`,
  //   (url: string) => fetcherWithCredential(url,'get'))

  const [loginUserReview, otherUserReviews] = useMemo((): [Review | undefined, Review[] | undefined] => {
    if (loginUser && isAuthenticated) {
      // ログインしている場合、reduceを使用してレビューを分類する
      return reviews.reduce(
        ([userReview, others], review) => {
          if (review.user.id === loginUser.id) {
            return [review, others]
          }
          return [userReview, [...others, review]]
        },
        [undefined, []]
      )
    } else {
      // ログインしていない場合、全レビューをその他のレビューとして扱う
      return [undefined, reviews];
    }
  }, [reviews, loginUser, isAuthenticated]);
  console.log("Login User Review:", loginUserReview);
  console.log("Other User Reviews:", otherUserReviews);


  // useEffect(() => {
  //   if (loginUser.id) {
  //     fetchAsyncMyReview()
  //   }
  // }, [loginUser.id])

  const { handleHome } = useNavigation()

  if (!isAuthenticated) {
    return (
      <>
        <Head><title>レビューリスト</title></Head>
        {showMessage.show && (
          <AlertMessage message={showMessage.message} color={showMessage.color} />
        )}
        <AppButton text="ホームに戻る" type="button" onClick={handleHome} color="blue" />
        <ItemDetail item={itemDetail} />
        <div className="col-span-2">
          <ReviewCardList reviews={otherUserReviews} />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>レビューリスト</title>  
      </Head>
      {showMessage.show && (
        <AlertMessage message={showMessage.message} color={showMessage.color} />
      )}
      <AppButton text="ホームに戻る" type="button" onClick={handleHome} color="blue" />
      <ItemDetail item={itemDetail} />
      {isAuthenticated && (
        <>
          {loginUserReview && loginUserReview.id ? (
            <>
              <p>自分のレビュー</p>
              <ReviewCard review={loginUserReview} />
              <div>
                {loginUser && loginUser.id === loginUserReview.user.id && (
                  <div className="text-sm flex space-x-4">
                    <Link href={`/review/${loginUserReview.id}/edit?itemId=${itemId}`}>
                      編集
                    </Link>
                    <DeleteReviewButton reviewId={loginUserReview.id}/>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <Link href={`/review/new?itemId=${itemId}`}>
                <div className="inline-flex items-center border rounded-md p-4 hover:bg-gray-100 hover:scale-110 transition-transform duration-300">
                  <PencilAltIcon className="h-7 w-7"/>
                  <span className="ttext-base sm:text-2xl ml-2">新規投稿</span>
                </div>
              </Link>
            </div>
          )}
          <div className="col-span-2">
            <div className="col-span-2">
              <ReviewCardList reviews={otherUserReviews}/>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ReviewListPage

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getItemIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params } :GetStaticPropsContext) => {
  if (!params) {
    throw new Error("params is undefined")
  }

  const itemId = Number(params.itemId)
  const reviewsData = await axios.get<Review[]>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review_list/${itemId}`, {
    withCredentials: true, 
  })
  console.log("reviewData"+reviewsData.data)

  // itemデータをpropsとしてページコンポーネントに渡す
  return {
    props: {
      itemId:itemId,
      reviews: reviewsData.data
    },
    revalidate: 8,
  }
}
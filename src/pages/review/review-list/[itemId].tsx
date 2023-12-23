
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
import getAllReview from 'lib/review/getAllReview'
import getOtherUserReviews from 'lib/review/getOtherUsersReviews'
import DeleteReviewButton from 'components/Atoms/DeleteReviewButton'
import { checkUserAuthentication } from 'pages/api/checkAuth'

type ServerSideProps = {
  itemId: number,
  reviews: Review[];
};

//アイテム詳細をreduxで取得
//SSGで1つの関数を実行（サーバーサイドのビュークラスでログインの有無を判定させる）
//
export const ReviewListPage: NextPage<ServerSideProps> = ({itemId,reviews}) => {
  const loginUser = useSelector(selectLoginUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const items = useSelector(selectItems)
  const itemDetail = itemId ? items.find(item => item.id === itemId) : null
  console.log("itemdetail"+itemDetail)

  const myReview:Review[] = useSelector(selectMyReviews)
  const isMyReview = loginUser.id ? myReview.find(review => review.item.id === itemId) : null
  const { showMessage } = useAlertReviewMessage()

  useEffect(() => {
    if (loginUser.id) {
      fetchAsyncMyReview()
    }
  }, [loginUser.id])

  const { handleHome } = useNavigation()

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
          {isMyReview && isMyReview.id ? (
            <>
              <p>自分のレビュー</p>
              <ReviewCard review={isMyReview} />
              <div>
                {loginUser && loginUser.id === isMyReview.user.id && (
                  <div className="text-sm flex space-x-4">
                    <Link href={`/review/${isMyReview.id}/edit?itemId=${itemId}`}>
                      編集
                    </Link>
                    <DeleteReviewButton reviewId={isMyReview.id}/>
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
                <ReviewCardList reviews={reviews}/>
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
  const reviewsData = await getAllReview({ itemId });
  // console.log("islogin"+isLogin)

  // itemデータをpropsとしてページコンポーネントに渡す
  return {
    props: {
      reviews: reviewsData.review
    },
    revalidate: 8,
  }
}

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const itemId = Number(params.itemId) // URLからitemIdを取得

//   // const reviewsData = await getAllReview({ itemId })
//   const reviewsData = await axios.get<Review[]>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review_list/${itemId}`, {
//     withCredentials: true, 
//   });
//   console.log(reviewsData)
//   const reviews = reviewsData.data ?? [];

//   return {
//     props: {
//       itemId: itemId,
//       reviews: reviews
//     }
//   }
// }
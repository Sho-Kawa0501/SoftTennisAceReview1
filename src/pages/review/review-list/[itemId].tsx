
import React,{ useState,useEffect,useMemo,useContext,useRef } from 'react'
import { useSelector, useDispatch,} from 'react-redux'
import { 
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
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
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'
import { Review } from 'types/types'
import useAllReview from 'hooks/review/useAllReview'
import useOtherUserReviews from 'hooks/review/useOtherUsersReviews'

type ReviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const ReviewListPage: NextPage<ReviewPageProps> = ({staticItem}:ReviewPageProps) => {
  const loginUser = useSelector(selectLoginUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const myReview:Review[] = useSelector(selectMyReviews) //ここがうまくいってない
  const isMyReview = loginUser.id ? myReview.find(review => review.item.id === staticItem.id) : null
  const { showMessage } = useAlertReviewMessage()
  const allReview = useAllReview({ itemId: staticItem.id })
  const otherUserReviews = useOtherUserReviews({ itemId: staticItem.id })

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
      <ItemDetail item={staticItem} />
      {!isAuthenticated && (
        <ReviewCardList reviews={allReview.review} />
      )}
  
      {isAuthenticated && (
        <>
          {isMyReview && isMyReview.id ? (
            <>
              <p>自分のレビュー</p>
              <ReviewCard review={isMyReview} />
              <div>
                {loginUser && loginUser.id === isMyReview.user.id && (
                  <div className="text-sm flex space-x-4">
                    <Link href={`/review/${isMyReview.id}/edit?itemId=${staticItem.id}`}>
                      編集
                    </Link>
                    <ReviewDeleteModal reviewId={isMyReview.id} {...isMyReview} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <Link href={`/review/new?itemId=${staticItem.id}`}>
                <div className="inline-flex items-center border rounded-md p-4 hover:bg-gray-100 hover:scale-110 transition-transform duration-300">
                  <PencilAltIcon className="h-7 w-7"/>
                  <span className="ttext-base sm:text-2xl ml-2">新規投稿</span>
                </div>
              </Link>
            </div>
          )}
          <div className="col-span-2">
            {isAuthenticated && (
              <div className="col-span-2">
                <ReviewCardList reviews={otherUserReviews.review}/>
              </div>
            )}
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

  const itemNumberId = Number(params.itemId)
  const staticItem:Item = await getItemDetail(itemNumberId)

  return {
    props: {
      staticItem,
    },
    revalidate: 64800,
  }
}

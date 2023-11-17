
import React,{ useState,useEffect,useMemo,useContext,useRef } from 'react'
import { useSelector, useDispatch,shallowEqual} from 'react-redux'
import axios from 'axios'
import { 
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { fetcherWithCredential } from 'lib/utils'
import { AppDispatch,RootState } from 'app/store'
import { 
  getItemDetail,
  getItemIds
}from 'lib/item'
import { fetchAsyncMyReview } from 'features/review/slice'
import { setIsDeleteReview,resetIsDeleteReview } from 'features/review/slice'
import useSWR,{ mutate } from 'swr'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
// import { Review } from 'types'
import { Item } from 'types/itemTypes'
import { PlusCircleIcon } from '@heroicons/react/outline'
import ReviewDeleteModal from 'components/templates/ReviewDeleteModal'
import ItemDetail from 'components/molecules/ItemDetailCard'
import ReviewCard from 'components/molecules/ReviewCard'
import ReviewCardList from 'components/organisms/ReviewCardList'
import { AlertMessage } from 'components/Atoms/AlertMessage'
import { useAlertReviewMessage } from 'hooks/review/useAlertReviewMessage'
import useReviewList from 'hooks/review/useReviewList'
import { selectLoginUser,selectIsAuthenticated } from 'features/account/accountSlice'
import { selectMyReviews } from 'features/review/slice'
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'
import { Review } from 'types/types'

// export interface Review {
//   id:string,
//   title:string,
//   content:string,
//   image: string,
//   favorites_count:number,
//   user:{
//     id:string,
//     name:string,
//     image:string,
//   },
//   item:{
//     id:number,
//   }
// }


type ReviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

//変更点...
//Itemの情報をSSGではなくてcontextから取得する
//レビューリストはSSRで取得
export const ReviewListPage: NextPage<ReviewPageProps> = ({staticItem}:ReviewPageProps) => {
  const loginUser = useSelector(selectLoginUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const myReview:Review[] = useSelector(selectMyReviews) //ここがうまくいってない
  const isMyReview = loginUser.id ? myReview.find(review => review.item.id === staticItem.id) : null
  console.log('isMyReview'+isMyReview+myReview+staticItem.id)
  const { showMessage } = useAlertReviewMessage()
  const reviews = useReviewList({itemId: staticItem.id, isAuthenticated})

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
        <ReviewCardList reviews={reviews} />
      )}
  
      {isAuthenticated && (
        <>
          {isMyReview && isMyReview.id ? (
            <>
              <p>投稿済み</p>
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
            <Link href={`/review/new?itemId=${staticItem.id}`}>
              <PlusCircleIcon className="h-7 w-7" />
            </Link>
          )}
          <div className="col-span-2">
            {reviews && <ReviewCardList reviews={reviews} />}
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
    throw new Error('params is undefined')
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

import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import { AppDispatch } from 'app/store'
import ReviewDeleteModal from 'components/templates/ReviewDeleteModal'
import { Review } from 'types/types'
import axios from 'axios'
import { 
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import MyReviewCard from 'components/organisms/MyReviewCard'
import { useAuthGuard } from 'hooks/auth'
import { selectMyReviews } from 'features/review/slice'
import { useAlertReviewMessage } from 'hooks/review/useAlertReviewMessage'
import { fetchAsyncMyReview } from 'features/review/slice'
import AlertMessage from 'components/Atoms/AlertMessage'
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'
import DeleteReviewButton from 'components/Atoms/DeleteReviewButton'

type ReviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

const MyReviewList: NextPage<ReviewPageProps> = ({reviews}) => {
  useAuthGuard()
  const dispatch: AppDispatch = useDispatch()
  // const myReview:Review[] = useSelector(selectMyReviews)
  const { showMessage } = useAlertReviewMessage()
  const { navigateTo } = useNavigation()
  const handleMyPage = () => navigateTo("/account/mypage/")
  // const myreview = reviews

  return (
    <>
      <Head>
        <title>マイレビューリスト</title>
      </Head>
      {showMessage.show && 
        <AlertMessage message={showMessage.message} color={showMessage.color} />
      }
      <AppButton text="マイページに戻る" type="button" onClick={handleMyPage} color="blue" />
      <div className="text-sm space-y-4">
        {reviews.map((review) => (
          <div key={review.id}>
            <MyReviewCard review={review} />     
            <div>
              <Link href={`/review/${review.id}/edit`}>
                編集
              </Link>
              <DeleteReviewButton reviewId={review.id} />
            </div>
          </div>
        ))}
      </div>
      <ReviewDeleteModal />
    </>
  )
}

export default MyReviewList

// export const getStaticPaths: GetStaticPaths = async () => {
//   //ログインIDを取得
//   const paths = await getItemIds()
//   return {
//     paths,
//     fallback: false,
//   }
// }

export const getStaticProps: GetStaticProps = async () => {
  //ログインIDでレビュー取得関数実行
  
  const reviewsData = await axios.get<Review[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/myreview_list/`,{
      withCredentials: true,
    }
  )
  // const reviewsData = await axios.get<Review[]>(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/review_list/${itemId}`, {
  //   withCredentials: true, 
  // })
  console.log("reviewData"+reviewsData)

  // itemデータをpropsとしてページコンポーネントに渡す
  return {
    props: {
      reviews: reviewsData.data
    },
    revalidate: 8,
  }
}
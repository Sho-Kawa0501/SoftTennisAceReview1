import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import ReviewDeleteModal from 'components/templates/ReviewDeleteModal'
import { Review } from 'types/types'
import MyReviewCard from 'components/organisms/MyReviewCard'
import { useAuthGuard } from 'hooks/auth'
import { selectMyReviews } from 'features/review/slice'
import { useAlertReviewMessage } from 'hooks/review/useAlertReviewMessage'
import AlertMessage from 'components/Atoms/AlertMessage'
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'

const MyReviewList = () => {
  const myReview:Review[] = useSelector(selectMyReviews)
  console.log(myReview)
  useAuthGuard()
  const { showMessage } = useAlertReviewMessage()
  const { navigateTo } = useNavigation()
  const handleMyPage = () => navigateTo("/account/mypage/")

  return (
    <>
      <Head>
        <title>マイレビューリスト</title>
      </Head>
      {showMessage.show && 
        <AlertMessage message={showMessage.message} color={showMessage.color} />
      }
      <AppButton text="マイページに戻る" type="button" onClick={handleMyPage} color="blue" />
      <div className="text-sm flex space-x-4 flex-wrap">
        {myReview.map((review) => (
          <div key={review.id}>
            <MyReviewCard review={review} />     
            <div>
              <Link href={`/review/${review.id}/edit`}>
                編集
              </Link>
            </div>
            <ReviewDeleteModal reviewId={review.id} {...review} />
          </div>
        ))}
      </div>
    </>
  )
}

export default MyReviewList
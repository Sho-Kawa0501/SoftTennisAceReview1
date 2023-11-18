import useOtherUserReviews from './useOtherUsersReviews'

const OtherUserReviewsComponent = ({ itemId}) => {
  const data = useOtherUserReviews({ itemId })
  return data
}

export default OtherUserReviewsComponent
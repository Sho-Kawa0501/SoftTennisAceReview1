import useAllReviews from './useAllReview'

const AllReviewsComponent = ({ itemId, }) => {
  const data = useAllReviews({ itemId })
  return data
}

export default AllReviewsComponent
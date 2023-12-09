import React from 'react'
import ReviewCard from '../molecules/ReviewCard'
import { Review } from 'types/types'

interface ReviewCardListProps {
  reviews: Review[] | undefined
}

const ReviewCardList = React.memo(({reviews}: ReviewCardListProps) => {
  if (!reviews) {
    return
  }

  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <ReviewCard review={review} />
        </div>
      ))}
    </>
  )
})

ReviewCardList.displayName = "ReviewCardList"
export default ReviewCardList

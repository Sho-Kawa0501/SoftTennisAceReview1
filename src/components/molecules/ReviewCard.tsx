import React from 'react'
import Image from 'next/image'
import { Review } from 'types/types'
import { useSelector } from 'react-redux'
import { selectLoginUser } from 'features/account/accountSlice'

type ReviewCardProps = {
  review:Review
}
import FavoriteReview from 'components/organisms/FavoriteReview'

const ReviewCard = React.memo(({review} :ReviewCardProps) => {
  const loginUser = useSelector(selectLoginUser)
  
  return (
    <>
    <div className="w-full p-4">
      <div className="mb-2 flex items-center space-x-2">
        <Image
          src={review.user.image}
          alt={review.user.name}
          className="rounded-full"
          width={40}
          height={40}
        />
        <div className="font-bold mb-1 text-xl">{review.user.name}</div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div>
          {/* <div className="text-base sm:test-sm xs:text-xs text-gray-500">{review.is_edited ? "(編集済み)" : ""}</div>
          <div className="font-bold mb-1 text-lg">{review.title}</div> */}
          <div className="flex items-center">
            <div className="font-bold mb-1 text-xl">{review.title}</div>
            <div className="text-base sm:text-sm xs:text-xs text-gray-500 ml-2">{review.is_edited ? "(編集済み)" : ""}</div>
          </div>
          <div className="text-base sm:text-sm xs:text-xs mb-2">{review.content}</div>
          {review.image && (
            <Image
              src={review.image}
              alt={review.title}
              width={200}
              height={200}
              priority
            />
          )}
        </div>
      </div>
      {loginUser.id && (
        <FavoriteReview 
          reviewId={review.id} 
          userId={loginUser.id}
        />
      )}
    </div>
  </>
)})

ReviewCard.displayName = "ReviewCard"
export default ReviewCard
                                                           
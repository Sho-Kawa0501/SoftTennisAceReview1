import React from 'react'
import Image from 'next/image'
import { Review } from 'types/types'
import { useSelector } from 'react-redux'
import { selectLoginUser } from 'features/account/accountSlice'
import FavoriteReview from 'components/organisms/FavoriteReview'

type ReviewCardProps = {
  review:Review
}

const MyReviewCard = React.memo(({review} :ReviewCardProps) => {
  const loginUser = useSelector(selectLoginUser)
  return (
    <>
    <div className="w-full p-4">
      <div className="mb-2">{review.item.item_name}</div>
        <div className="mb-2 flex items-center space-x-2">
          <Image
            src={review.user.image}
            alt={review.user.name}
            className="rounded-full"
            width={40}
            height={40}
          />
          <div>{review.user.name}</div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mb-2 md:mb-0 md:mr-4 flex-shrink-0">
            {review.image && (
              <Image                                     
                src={review.image}
                alt={review.title}
                className="object-cover rounded-lg"
                width={150} 
                height={150}
                priority
              />
            )}
          </div>
          <div>
            <div className="text-base sm:test-sm xs:text-xs">{review.is_edited ? "(編集済み)" : ""}</div>
            <div className="font-bold mb-1">{review.title}</div>
            <div className="text-base sm:test-sm xs:text-xs">{review.content}</div>
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

MyReviewCard.displayName = "MyReviewCard"
export default MyReviewCard

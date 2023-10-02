import React from 'react'
import Image from 'next/image'
import { IndexData } from 'types'
type ReviewCardProps = {
  review:IndexData
}
import FavoriteReview from 'features/review/FavoriteReview'

const ReviewCard = React.memo(({review} :ReviewCardProps) => {
  //loginUser情報を取得するuseSelector用意
  //
  
  return (
  <div key={review.id} className="w-full sm:w-1/3 p-4">
    <Image
      src={review.user.image}
      className="rounded-full"
      alt={review.user.name}
      style={{ width: 40, height:40 }}
      width={40}
      height={40}
      priority
    />
    <div>
      <div>{review.user.name}</div>
      <div>{review.title}</div>
      <div>{review.item.id}</div>
    </div>
    <div>
      <Image
        src={review.image}
        alt={review.title}
        className="w-full h-64 object-cover"
        width={100} 
        height={100}
        priority
      />
    </div>
    <div className="m-4">
      <div>{review.user.name}</div>
      <div className="truncate">{review.content}</div>
    </div>
    {/* {isAuthenticated && (
      <FavoriteReview reviewId={data.id} userId={loginUser.id} />
    )} */}

  </div>
)})

export default ReviewCard

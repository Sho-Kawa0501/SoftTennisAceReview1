import React from "react";
import ReviewCard from "./ReviewCard";
import { IndexData } from "types";

interface ReviewCardListProps {
  reviews: IndexData[] | undefined;
}

const ReviewCardList = React.memo(({reviews}: ReviewCardListProps) => {
  if (!reviews) {
    // ここにreviewsがundefinedの場合の処理や表示を記述する
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="flex">
      {reviews.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
})

export default ReviewCardList

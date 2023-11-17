import React from "react";
import ReviewCard from "../molecules/ReviewCard";
import { Review } from "types/types";


interface ReviewCardListProps {
  reviews: Review[] | undefined;
}

const ReviewCardList = React.memo(({reviews}: ReviewCardListProps) => {
  if (!reviews) {
    // ここにreviewsがundefinedの場合の処理や表示を記述する
    return <div>Loading reviews...</div>;
  }
  // const loginUser = useSelector((state:RootState) => state.account.loginUser)

  return (
    <>
      {/* <div className="flex flex-wrap -m-4"> */}
      {reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <ReviewCard review={review} />
        </div>
      ))}
    {/* </div> */}
      {/* <div className="flex">
        {reviews.map((review) => (
          <div key={review.id}>
          <ReviewCard review={review} />
            
          </div>
        ))}
      </div> */}
    </>
  );
})

ReviewCardList.displayName = "ReviewCardList"
export default ReviewCardList

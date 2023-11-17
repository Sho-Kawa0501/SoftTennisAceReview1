import React from 'react'
import Image from 'next/image'
import { Review } from 'types/types'
import { useSelector, useDispatch ,shallowEqual} from 'react-redux'
import { RootState } from 'app/store'
import { selectLoginUser } from 'features/account/accountSlice'

type ReviewCardProps = {
  review:Review
}
import FavoriteReview from 'features/review/FavoriteReview'

const MyReviewCard = React.memo(({review} :ReviewCardProps) => {
  //loginUser情報を取得するuseSelector用意
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
            <Image                                     
              src={review.image}
              alt={review.title}
              className="object-cover rounded-lg"
              width={150} // Default size
              height={150}
              priority
            />
          </div>

          <div>
            <div className="text-base sm:test-sm xs:text-xs">{review.is_edited ? "(編集済み)" : ""}</div>
            <div className="font-bold mb-1">{review.title}</div>
            <div className="text-base sm:test-sm xs:text-xs">{review.content}</div>
          </div>
        </div>

        {loginUser.id && (
          <FavoriteReview reviewId={review.id} userId={loginUser.id} />
        )}
      </div>
    
  </>
)})
//   return (
//   <div key={review.id} className="w-full sm:w-1/3 p-4">
//     <div className="mb-2 flex items-center space-x-2">
//     <Image
//       src={review.user.image}
//       className="rounded-full"
//       alt={review.user.name}
//       style={{ width: 40, height:40 }}
//       width={40}
//       height={40}
//       priority
//     />
//     <div>{review.user.name}</div>
//     </div>
//     <div>
      
//       <div>{review.title}</div>
//       <div>{review.item.id}</div>
//     </div>
//     <div>
//       <Image
//         src={review.image}
//         alt={review.title}
//         className="w-full h-64 object-cover"
//         width={100} 
//         height={100}
//         priority
//       />
//     </div>
//     <div className="m-4">
//       <div>{review.user.name}</div>
//       <div className="truncate">{review.content}</div>
//       {loginUser.id && (
//         <FavoriteReview reviewId={review.id} userId={loginUser.id} />
//       )}
//     </div>
//   </div>
// )})
MyReviewCard.displayName = "MyReviewCard"
export default MyReviewCard

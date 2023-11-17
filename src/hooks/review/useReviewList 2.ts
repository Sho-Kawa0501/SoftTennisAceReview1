import useOtherUserReviews from "./useOtherUsersReviews";
import useAllReviews from "./useAllReview";

//ログインしていたらuseOther,していないならuseAllを使用
const useReviewList = ({itemId, isAuthenticated}) => {
  if (isAuthenticated) {
    const data = useOtherUserReviews({itemId});
    return data ? data.review : null;
  } else {
    const data = useAllReviews({itemId});
    return data ? data.review : null;
  }
};

export default useReviewList
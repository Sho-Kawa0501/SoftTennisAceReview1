import type { RootState } from 'app/store'

export const selectReviews = (state: RootState) => state.review.reviews
export const selectReviewError = (state: RootState) => state.review.reviewError
export const selectMyReviews = (state: RootState) => state.review.myReview
export const selectIsNewReview = (state: RootState) => state.review.isNewReview
export const selectIsEditReview = (state: RootState) => state.review.isEditReview
export const selectIsDeleteReview = (state: RootState) => state.review.isDeleteReview
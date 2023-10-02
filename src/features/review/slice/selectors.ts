import type { RootState } from 'app/store'

export const selectIsAuthenticated = (state: RootState) => state.account.isAuthenticated
export const selectReviews = (state: RootState) => state.review.reviews
export const selectMyReviews = (state: RootState) => state.review.myReview
export const selectNewReview = (state: RootState) => state.review.isNewReview
export const selectEditReview = (state: RootState) => state.review.isReviewLoading
export const selectDeleteReview = (state: RootState) => state.review.isDeleteReview


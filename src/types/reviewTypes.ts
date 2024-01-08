export interface EditReviewSubmitData {
  reviewId:string
  title: string
  content: string
  image: File | null
}

export interface NewReviewSubmitData {
  itemId: number
  title:string
  content:string
  image:File | null
}

export interface ReviewInputData {
  title: string
  content: string
  image: string | null
}

export interface ReviewSubmitData {
  title: string
  content: string
  image: File | null
}
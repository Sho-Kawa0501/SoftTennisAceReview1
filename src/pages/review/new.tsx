import React, { useState,useCallback } from 'react'
import { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { fetchAsyncNewReview } from 'features/review/slice/actions'
import { AppDispatch, RootState } from 'app/store'
import { useForm,FormProvider,SubmitHandler } from 'react-hook-form'
import ReviewForm from 'components/ReviewForm'
import { NewReviewFormData } from 'types'
import { setIsLoading,resetIsLoading, } from 'features/app/appSlice'
import LoadingSpinner from 'components/LoadingSpinner'


const NewReview: NextPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  //新規投稿処理が完了したかどうかのbool
  //const isNewReview = useSelector((state:RootState) => state.review.isNewReview)
  // const new_review_success = useSelector((state) => state.review.new_review_success)
  const itemId = parseInt(router.query.itemId as string)
  const methods = useForm<NewReviewFormData>()
  const isLoading = useSelector((state:RootState) => state.app.isLoading)

  const onSubmit:SubmitHandler<NewReviewFormData> = useCallback(async (data: NewReviewFormData) => {
    const packet = {
      itemId: itemId,
      title:data.title,
      content:data.content,
      image:data.image
    }

    if (dispatch && dispatch !== null && dispatch !== undefined ) {
      dispatch(setIsLoading())
      const resultAction = await dispatch(fetchAsyncNewReview(packet))
      if (fetchAsyncNewReview.fulfilled.match(resultAction)) {
        router.push('/items/[itemId]', `/items/${itemId}`)
        setTimeout(() => {
          dispatch(resetIsLoading())
        },1000)
      }
      //dispatch(resetIsLoading())
    }
  },[dispatch,router])


  return (
    <>
    {isLoading ? (
      <LoadingSpinner />
    ) :
    <div>
      <Head>
        <title>AceRacketReviews | 新規投稿</title>
      </Head>
      <div className="text-center text-2xl mb-5">新規投稿</div>
      <FormProvider {...methods}>
        <ReviewForm onSubmit={onSubmit} />
      </FormProvider>
    </div>
    }
    </>
  )
}

export default NewReview
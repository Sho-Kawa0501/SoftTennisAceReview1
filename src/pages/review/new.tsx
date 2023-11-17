import React, { useState,useCallback } from 'react'
import { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { fetchAsyncNewReview,fetchAsyncMyReview } from 'features/review/slice/actions'
import { AppDispatch, RootState } from 'app/store'
import { useForm,FormProvider,SubmitHandler } from 'react-hook-form'
import ReviewForm from 'components/organisms/ReviewForm'
// import { NewReviewFormData } from 'types'
import { setIsLoading,resetIsLoading, } from 'features/app/appSlice'
import LoadingSpinner from 'components/Atoms/LoadingSpinner'
import { useAuthGuard } from 'hooks/auth'
import { ReviewInputData } from 'types/reviewTypes'
import { setIsNewReview } from 'features/review/slice'
import { NewReviewSubmitData } from 'types/reviewTypes'
import useNavigation from 'hooks/utils/useNavigation'

const NewReview = () => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const { navigateTo } = useNavigation()
  const itemId = parseInt(router.query.itemId as string)
  const methods = useForm<ReviewInputData>()
  
  useAuthGuard()

  const onSubmit:SubmitHandler<NewReviewSubmitData> = useCallback(async (data) => {
    if (!data || !itemId) {
      return
    }
    const submitData:NewReviewSubmitData = {
      itemId: itemId,
      title:data.title,
      content:data.content,
      image:data.image
    }
    try {
    const resultAction = await dispatch(fetchAsyncNewReview(submitData))
    if (fetchAsyncNewReview.fulfilled.match(resultAction)) {
      dispatch(fetchAsyncMyReview())
      dispatch(setIsNewReview())
      if (router.query.itemId) {
        navigateTo(`/review/review-list/${itemId}?alert=success_new`)
      }
    }
  } catch(error) {
    console.error("NewReview:"+error)
  }
  },[itemId])


  return (
    <>
    
    <div>
      <Head>
        <title>新規投稿</title>
      </Head>
      <div className="text-center text-2xl mb-5">新規投稿</div>
      <FormProvider {...methods}>
        <ReviewForm onSubmit={onSubmit} />
      </FormProvider>
    </div>
    </>
  )
}

export default NewReview
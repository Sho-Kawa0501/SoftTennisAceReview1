import { useEffect, useCallback,useState,useRef } from 'react'
import { 
  NextPage,
} from 'next'
import { useSelector, useDispatch,shallowEqual } from 'react-redux'
import { useRouter } from 'next/router'
import { AppDispatch, RootState } from 'app/store'
import { fetchAsyncEditReview, } from 'features/review/slice/actions'
import Head from 'next/head'
import { useForm,FormProvider,SubmitHandler} from 'react-hook-form'
import ReviewForm from 'components/organisms/ReviewForm'
import { fetchAsyncMyReview } from 'features/review/slice/actions'
import { useAuthGuard } from 'hooks/auth'
import { setIsEditReview } from 'features/review/slice'
import { EditReviewSubmitData } from 'types/reviewTypes'
import useNavigation from 'hooks/utils/useNavigation'


const EditReview = () => {
  console.log("editR")
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const reviewId = typeof router.query.reviewId === "string" ? router.query.reviewId : undefined;
  const itemId = parseInt(router.query.itemId as string)
  console.log("itemId"+itemId)
  console.log("reviewId"+reviewId)
  useAuthGuard()
  const { navigateTo } = useNavigation()
  const handleReviewList = useCallback(() => {
    navigateTo(`/review/review-list/${itemId}`);
  }, [navigateTo, itemId]);

  const handleMyReviewList = useCallback(() => {
    navigateTo("/account/mypage/myreview-list/");
  }, [navigateTo])

  const handleBack = () => {
    if (itemId) {
      handleReviewList()
    } else {
      handleMyReviewList()
    }
  }
  
  //編集データを送信
  const onSubmit = useCallback<SubmitHandler<EditReviewSubmitData>>(async (editData) => {
    if (!editData || !reviewId) {
      console.log("editno")
      return
    }
   
    const submitData:EditReviewSubmitData = {
      reviewId: reviewId,
      title: editData.title,
      content: editData.content,
      image: editData.image,
    }

    try {
      const result = await dispatch(fetchAsyncEditReview(submitData));
      if (fetchAsyncEditReview.fulfilled.match(result) && result.payload) {
        dispatch(fetchAsyncMyReview())
        dispatch(setIsEditReview())
        handleBack()
        }
    } catch(error) {
      console.error("EditReview:"+error)
    }
  }, [reviewId])
  
  return (
    <>
      <div>
        <Head>
          <title>レビュー編集</title>
        </Head>
        <div className="text-center text-2xl mb-5">投稿編集</div>
        <ReviewForm onSubmit={onSubmit} reviewId={reviewId} />
      </div>
    </>
  )
}

export default EditReview


// const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current && router.query.alert === 'success') {
  //     alert("編集が完了しました。");
  //     isFirstRender.current = false;
  //   } else {
  //     isFirstRender.current = false;
  //   }
  // }, [router.query]);
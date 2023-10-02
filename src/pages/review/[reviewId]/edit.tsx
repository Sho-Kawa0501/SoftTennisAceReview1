import { useEffect, useCallback,useState } from 'react'
import { 
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'

import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AppDispatch, RootState } from 'app/store'
import { 
  resetIsEditReview,
} from 'features/review/slice/reducers'
import { fetchAsyncEditReview } from 'features/review/slice/actions'
import { getReviewIds, getReviewDetail,getItemIds, } from '../../../lib/posts'
import useSWR ,{SWRResponse} from 'swr'
import { Rings } from 'react-loader-spinner'
import Head from 'next/head'
import { useForm,FormProvider,SubmitHandler} from 'react-hook-form'
import { fetcherWithCredential } from '../../../lib/posts'
import ReviewForm from 'components/ReviewForm'
// import { NewReviewFormData } from 'types'
import { setIsLoading,resetIsLoading, } from 'features/app/appSlice'
import LoadingSpinner from 'components/LoadingSpinner'

// type ReviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

export interface NewReviewFormData {
  title: string;
  content: string;
  image: string | null;
}

interface SubmitFormData {
  title: string;
  content: string;
  image: File | null;
}

type ReviewData = NewReviewFormData & { id: number }
//役割...データの用意、子コンポーネントとの値の授受、
const EditReview:NextPage = () => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const reviewId = router.query.reviewId
  console.log(reviewId)
  //const isReviewLoading = useSelector((state:RootState) => state.review.isLoadingReview)
  // const isEditReview = useSelector((state:RootState) => state.review.isEditReview)
  
  //ここで定義しなくてもItem.tsxで取得した値をそのまんま使い回せばいい？
  const { data: review,error,mutate:mutateMyReview} = useSWR<ReviewData | undefined>(
    reviewId ? `${process.env.NEXT_PUBLIC_API_URL}/api/review_detail/${reviewId}/`: null,
    url => fetcherWithCredential(url, 'get',null,true),
  )
  
  useEffect (() => {
    mutateMyReview()
  },[review])
  console.log("review"+review)

       
  //子コンポーネントに渡す初期値
  const methods = useForm<NewReviewFormData>({
    
    defaultValues: {
      title:review?.title,
      content:review?.content,
      image:review?.image,
    },
    mode: 'onChange',
  }) 

  //必要...フォームのリロード対策。
  //setValueでフォームに初期値を格納し直している
  //このコードをreviewformで応用すれば、
  //入力値がある状態でリロードしても、状態を維持できるかもしれない
  useEffect(() => {
    
    if (review) {
      methods.setValue("title", review.title);
      methods.setValue("content", review.content);
      methods.setValue("image", review.image);
    }
  }, [review])
  
  //編集データを送信
  const onSubmit:SubmitHandler<SubmitFormData> = async (editData) => {
    if (!review) {
      // review が undefined の場合のエラーハンドリングを追加
      console.error("Review data is not available.")
      return
    }
    const packet = {
      id: review.id,
      title: editData.title,
      content:editData.content,
      image:editData.image
    }

    //アクション、非同期関数名を変更
    if (dispatch && dispatch !== null && dispatch !== undefined ) {
      dispatch(setIsLoading())
      const resultAction = await dispatch(fetchAsyncEditReview(packet));
      if (fetchAsyncEditReview.fulfilled.match(resultAction)) {
        router.back()
        setTimeout(() => {
          dispatch(resetIsLoading())
        }, 500)
      }
    }
  }

  if (!reviewId) {
  console.error("Review ID is not available.");
  return <div>Review ID is missing!</div>;
  }

  if (error) {
    console.error("Failed to fetch review data.");
    return <div>Failed to fetch review data. Please try again later.</div>;
  }

  if (!review && !error) {
    return <div>Loading...</div>;
  }


  return (
    <>
    {review ? (
      <div>
      <Head>
        <title>SoftTennisAceReviews | 投稿編集</title>
      </Head>
      <div className="text-center text-2xl mb-5">投稿編集</div>
      <FormProvider {...methods}>
        <ReviewForm onSubmit={onSubmit} />
      </FormProvider>
    </div>
    ) :
      <div></div>
    }
    </>
  )
}

export default EditReview

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = await getReviewIds()
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   if (!context.params?.reviewId) {
//     throw new Error('id is undefined')
//   }

//   const id = String(context.params.reviewId)
//   const staticReview = await getReviewDetail(id)

//   return {
//     props: {
//       id: staticReview.id,
//       staticReview,
//     },
//   }
// }


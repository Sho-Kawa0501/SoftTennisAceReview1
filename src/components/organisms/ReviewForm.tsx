import React, { useState,useEffect,useCallback,useMemo,useRef } from 'react'
import { useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import { useForm,FormProvider,SubmitHandler } from 'react-hook-form'
import InputImage from 'components/Atoms/InputImage'
import TextArea from 'components/Atoms/TextArea'
import AppButton from '../Atoms/AppButton'
import ImagePreview from '../Atoms/ImagePreview'
import TextInput from '../Atoms/TextInput'
import InputErrorMessage from '../Atoms/InputErrorMessage'
import { convertFileToDataURL } from 'lib/utils'
import { Review } from 'types/types'
import { ReviewInputData } from 'types/reviewTypes'
import { selectMyReviews } from 'features/review/slice'
import { selectReviewError } from 'features/review/slice'
import useNavigation from 'hooks/utils/useNavigation'
import { setIsButtonDisabled,selectIsButtonDisabled, } from 'features/app/appSlice'

interface SubmitFormData {
  title: string
  content: string
  image: File | null
}

interface ReviewFormProps {
  onSubmit: SubmitHandler<SubmitFormData>
  reviewId?:string | string[]
}

const ReviewForm = ({ onSubmit,reviewId }: ReviewFormProps,) => {
  const reviewError = useSelector(selectReviewError)
  const isButtonDisabled = useSelector(selectIsButtonDisabled)
  const router = useRouter()
  const { itemId } = router.query
  const { navigateTo } = useNavigation()
  const handleReviewList = useCallback(() => {
    navigateTo(`/review/review-list/${itemId}`)
  }, [navigateTo, itemId])

  const handleMyReviewList = useCallback(() => {
    navigateTo("/account/mypage/myreview-list/")
  }, [navigateTo])

  const myReview:Review[] = useSelector(selectMyReviews)
  const isMyReview = myReview.find(review => review.id === reviewId)
  const [imagePreviewUrl, setImagePreviewUrl] = 
    useState<string | null>(isMyReview ? isMyReview.image : null)
  const [image, setImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const methods = useForm<ReviewInputData>({
    defaultValues: {
      title: isMyReview?.title || '',
      content: isMyReview?.content || '',
      image: imagePreviewUrl || null,
    }
  })
  
  const { register, handleSubmit, formState: { errors },setValue } = methods
  useEffect(() => {
    setValue("title", isMyReview?.title || '')
    setValue("content", isMyReview?.content || '')
    setImagePreviewUrl(isMyReview?.image || '')
  }, [isMyReview,])

  const resetImage = () => {
    setImage(null);
    setImagePreviewUrl("")
    setValue('image', "")
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImage(file)
    if (file) {
      convertFileToDataURL(file, dataUrl => {
        setImagePreviewUrl(dataUrl)
        setValue('image', dataUrl)
      })
    }
  }

  const handleBack = () => {
    if (itemId) {
      handleReviewList()
    } else {
      handleMyReviewList()
    }
  }

  return (
    <FormProvider {...methods}>
    <form className="md:w-1/2 mx-auto" onSubmit={handleSubmit(data => {
      onSubmit({...data, image})
    })}>
      {reviewError && 
        <InputErrorMessage errorMessage={reviewError} />
      }
      {errors.title && 
        <InputErrorMessage errorMessage={errors.title.message || null} />
      }
      <div className="mb-4">
        <div className="mb-1">タイトル</div>
        <TextInput
          type="text"
          placeholder="タイトル"
          {...register('title', {
            required: 'タイトルは必須です。',
            maxLength: {
              value: 20,
              message: 'タイトルは20文字以内で入力してください。',
            },
          })}
        />
      </div>
      <div className="mb-4">
        <div className="mb-1">画像</div>
        <InputImage 
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <button type="button" onClick={resetImage}>画像をリセットする</button>
        {errors.image && 
          <InputErrorMessage errorMessage={errors.image.message || null} />
        }
      </div>
      <ImagePreview />
        
      <div className="mb-4">
        {errors.content && 
          <InputErrorMessage errorMessage={errors.content.message || null} />
        }
        <div className="mb-1">説明</div>
          <TextArea
            placeholder="説明"
            {...register('content', {
              required: '説明は必須です。',
              maxLength: {
                value: 140,
                message: '説明は140文字以内で入力してください。',
              },
            })}
          />
        </div>
      <div className="flex justify-center">
        <div>
          <AppButton text="送信" type={"submit"} color="blue" disabled={isButtonDisabled} />
          <AppButton text="戻る" type="button" onClick={handleBack} color="blue" />
        </div>
      </div>
    </form>
  </FormProvider>
  )
}

export default React.memo(ReviewForm)


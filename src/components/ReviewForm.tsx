import React, { useState,useEffect,useCallback, } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useForm,FormProvider, useFormContext,SubmitHandler } from 'react-hook-form'
import { Rings } from 'react-loader-spinner'
import { fetchAsyncNewReview } from 'features/review/slice/actions'
import { AppDispatch } from 'app/store'
import InputImage from 'components/InputImage'
import TextArea from 'components/TextArea'
import AppBackButton from './AppBackButton'
import AppSubmitButton from './AppSubmitButton'
import ImagePreview from './ImagePreview'
import TextInput from './TextInput'
import { NewReviewFormData } from 'types'
import InputErrorMessage from './InputErrorMessage'
import { convertFileToDataURL } from 'lib/posts'

// export interface NewReviewFormData {
//   title: string;
//   content: string;
//   image: string | null;
// }

interface SubmitFormData {
  title: string;
  content: string;
  image: File | null;
}

interface ReviewFormProps {
  onSubmit: SubmitHandler<SubmitFormData>
}

//表示用コンポーネントへ渡す値を用意、入力値を親コンポーネントに渡す
const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  // const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext<SubmitFormData>()
  const getValueImage = getValues("image")
  console.log(getValueImage,typeof(getValueImage))

  //プレビューに渡す画像
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(getValueImage as string | null)
  console.log(imagePreviewUrl+typeof(imagePreviewUrl))
  const [image, setImage] = useState<File | null>(null)

  // //
  // useEffect(() => {
    
  //   if (typeof imageValue === "string") {
  //     console.log("string"+imageValue)
  //     setImagePreviewUrl(imageValue)
  //   } else if (imageValue instanceof File) {
  //     console.log("File"+imageValue)
  //     convertFileToDataURL(imageValue, setImagePreviewUrl)
  //   }
  // }, [getValues,image])

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImage(file)
    if (file) {
      convertFileToDataURL(file, dataUrl => {
        setImagePreviewUrl(dataUrl); // 画像をstring型としてsetImagePreviewUrlに設定
        setValue("image", file);
      });
    }
  },[])
    // setValue("image", e.target.files ? e.target.files[0] : null)

    // if (file) {
    //   convertFileToDataURL(file,setImagePreviewUrl);  // ここで先程の関数を使用
    // }
  // useEffect(() => {
  //   setImagePreviewUrl(absoluteImageUrl);
  // },)

  // const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null
  //   setImage(file)
  //   if (file) {
  //     convertFileToDataURL(file, dataUrl => {
  //       setImagePreviewUrl(dataUrl); // 画像をstring型としてsetImagePreviewUrlに設定
  //       setValue("image", file);
  //     });
  //   }
  // },[])
  
  //遷移ボタン
  const handleBack = () => {
    router.back()
  }

  return (

    <form className="md:w-1/3 mx-auto" onSubmit={handleSubmit(data => {
      onSubmit({...data, image});
    })}>
      <div className="mb-4">
        <div className="mb-1">タイトル</div>
        <TextInput
          label="title"
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
        {errors.title && 
          <InputErrorMessage errorMessage={errors.title.message || null} />
        }
      </div>
      <div className="mb-4">
        <div className="mb-1">画像</div>
        <InputImage 
          {...register('image', {
            required: '画像は必須です。',
          })}
          onChange={handleImageChange}
        />
        {errors.image && 
          <InputErrorMessage errorMessage={errors.image.message || null} />
        }
      </div>
      {imagePreviewUrl && (
        <ImagePreview imagePreviewUrl={imagePreviewUrl} />
      )}
      <div className="mb-4">
        <div className="mb-1">説明</div>
          <TextArea
            label="説明"
            placeholder="説明"
            {...register('content', {
              required: '説明は必須です。',
              maxLength: {
                value: 140,
                message: '説明は140文字以内で入力してください。',
              },
            })}
            // errorMessage={errors.content && errors.content.message}
          />
          {errors.content && 
            <InputErrorMessage errorMessage={errors.content.message || null} />
          }
      </div>
      <div className="flex justify-center">
          <div>
            <AppSubmitButton text="送信" />
            <AppBackButton text='戻る' className="button-yellow" onClick={handleBack} />
          </div>
      </div>
    </form>
  )
}

export default  React.memo(ReviewForm)
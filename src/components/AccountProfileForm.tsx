import React,{ useState,useEffect,useCallback,} from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Rings } from 'react-loader-spinner'
import { useForm,FormProvider,useFormContext,SubmitHandler } from 'react-hook-form'
import { useSelector} from 'react-redux'
import TextInput from './TextInput'
import { RootState } from 'app/store'
import ImagePreview from './ImagePreview'
import InputImage from './InputImage'
import { AppDispatch } from 'app/store'
import { useDispatch } from 'react-redux'
import { SubmitFormData } from 'features/account/AccountTypes'
import InputErrorMessage from './InputErrorMessage'
import { convertFileToDataURL } from 'lib/posts'


// export type SubmitFormData = {
//   editName: string;
//   image: File | null;
// }

interface AccountProfileFormProps {
  onSubmit: SubmitHandler<SubmitFormData>
}

//useFormでバリデーションチェック
//
const AccountProfileForm = ({onSubmit}:AccountProfileFormProps) => {
  const dispatch: AppDispatch = useDispatch()
  const loginUser = useSelector((state:RootState) => state.account.loginUser)
  //ImagePreviewに送る画像データ
  const absoluteImageUrlold = `${process.env.NEXT_PUBLIC_API_URL}${loginUser.image}`
  const absoluteImageUrl = loginUser.image
  console.log(absoluteImageUrl)
  console.log(absoluteImageUrlold)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(absoluteImageUrlold)
  //保存するデータ
  const [image, setImage] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SubmitFormData>()
  const getValueImage = getValues("image")
  console.log(getValueImage,typeof(getValueImage))

  // useEffect(() => {
  //   // const absoluteImageUrl = getValues("image")
  //   setImagePreviewUrl(absoluteImageUrl);
  // }, [loginUser])
  
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

return (
  <form className="w-1/3 mx-auto" onSubmit={handleSubmit(data => {
    onSubmit({...data, image});
  })}>
    <div className="mb-4">
      <div className="mb-1">
        名前
      </div>
      <TextInput 
        label="ニックネーム"
        type="text"
        placeholder="ニックネーム"
        {...register('editName',{
          required:'ニックネームは必須です。',
          maxLength:{
            value:20,
            message:'ニックネームは20文字以内で入力してください。',
          },
        })}
      />
      {errors.editName && 
        <InputErrorMessage errorMessage={errors.editName.message || null} />
      }
    </div>
    <div className="mb-4">
      <div className="mb-1">プロフィール画像</div>
      <InputImage onChange={handleImageChange} />
      {imagePreviewUrl && ( 
        <ImagePreview imagePreviewUrl={imagePreviewUrl} />
      )}
    </div>  
    <div className="flex justify-center">
      <button className="button-yellow" type="submit">
        送信
      </button>
    </div>
  </form>
  )
}

export default React.memo(AccountProfileForm)
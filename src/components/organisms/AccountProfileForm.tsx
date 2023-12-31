import React,{ useState,useEffect,useCallback,} from 'react'
import { useForm,FormProvider,useFormContext,SubmitHandler } from 'react-hook-form'
import { useSelector} from 'react-redux'
import TextInput from '../Atoms/TextInput'
import ImagePreview from '../Atoms/ImagePreview'
import InputImage from '../Atoms/InputImage'
import { AppDispatch } from 'app/store'
import { useDispatch } from 'react-redux'
import { SubmitFormData } from 'types/accountTypes'
import InputErrorMessage from '../Atoms/InputErrorMessage'
import { convertFileToDataURL } from 'lib/utils'
import AppButton from '../Atoms/AppButton'
import { resetIsAuthErrorMessage } from 'features/account/accountSlice'
import { 
  selectLoginUser,
  selectAuthError 
} from 'features/account/accountSlice'
import useNavigation from 'hooks/utils/useNavigation'
import { selectIsButtonDisabled } from 'features/app/appSlice'

export type ProfileFormData = {
  name: string
  image: string | null
}

interface AccountProfileFormProps {
  onSubmit: SubmitHandler<SubmitFormData>
}


const AccountProfileForm = ({onSubmit}:AccountProfileFormProps) => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(resetIsAuthErrorMessage())
  },[])
  const isButtonDisabled = useSelector(selectIsButtonDisabled)
  const authError = useSelector(selectAuthError)
  const loginUser = useSelector(selectLoginUser)
  //ImagePreviewに送る画像データ
  const loginUserImage = `${loginUser.image}`
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(loginUserImage)
  //保存するデータ
  const [image, setImage] = useState<File | null>(null)
  const methods = useForm<ProfileFormData>({
    defaultValues: {
      name: loginUser.name,
      image: imagePreviewUrl
    },
  })
  const { register, handleSubmit, formState: { errors },setValue } = methods
  const { handleBack } = useNavigation()

  useEffect(() => {
    setImagePreviewUrl(loginUserImage)
  }, [loginUser,loginUserImage])
  useEffect(() => {
    setValue("image", imagePreviewUrl)
  }, [imagePreviewUrl])
  
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImage(file)
    if (file) {
      convertFileToDataURL(file, dataUrl => {
        setImagePreviewUrl(dataUrl) // 画像をstring型としてsetImagePreviewUrlに設定
        setValue('image', dataUrl)
      })
    }
  },[])

return (
  <FormProvider {...methods}>
  <form className="w-1/2 mx-auto" onSubmit={handleSubmit(data => {
    onSubmit({...data, image})
  })}>
    {authError && 
      <InputErrorMessage errorMessage={authError} />
    }
    {errors.name && 
        <InputErrorMessage errorMessage={errors.name.message || null} />
      }
    <div className="mb-4">
      <div className="mb-1">
        名前
      </div>
      
      <TextInput
        label="ニックネーム"
        type="text"
        placeholder="ニックネーム"
        {...register('name',{
          required:'ニックネームは必須です。',
          maxLength:{
            value:20,
            message:'ニックネームは20文字以内で入力してください。',
          },
        })}
      />
    </div>
    <div className="mb-4">
      <div className="mb-1">プロフィール画像</div>
      <InputImage onChange={handleImageChange} />
      
    {loginUser.image && (
      <ImagePreview />
    )}
      
    </div>  
    <div className="flex justify-center">
      <AppButton text="送信" type={"submit"} color="blue" disabled={isButtonDisabled}/>
      <AppButton text="戻る" type={"button"} color="blue" onClick={handleBack} />
    </div>
  </form>
  </FormProvider>
  )
}

export default React.memo(AccountProfileForm)
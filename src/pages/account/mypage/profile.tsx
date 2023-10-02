import { useState, useEffect,useCallback } from 'react'
import { AppDispatch } from 'app/store'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { 
  fetchAsyncEditProfile,
  resetIsEditProfile,
  fetchAsyncCheckAuth 
} from 'features/account/accountSlice/'
import { setIsLoading,resetIsLoading } from 'features/app/appSlice'
import { RootState } from 'app/store'
import { FILE } from 'types'
import { useForm,FormProvider,SubmitHandler } from 'react-hook-form'
import AccountProfileForm from 'components/AccountProfileForm'
import { SubmitFormData } from 'features/account/AccountTypes'
import LoadingSpinner from 'components/LoadingSpinner'

type ProfileFormData = {
  editName: string;
  image: string | null;
}
//ログイン時にユーザー情報を取得してreduxに保存している
//要検討...型指定について。ProfileFormDataとProfileには重複項目があるので、editNameをnameにすれば解決しそう？
const Profile = () => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const loginUser = useSelector((state:RootState) => state.account.loginUser)

  //子コンポーネントに渡す初期値
  const methods = useForm<ProfileFormData>({
    defaultValues: {
      editName: loginUser.name,
      image: loginUser.image,
    },
    mode: 'onChange',
  })
  //必要のリロード対策
  useEffect(() => {
    if (loginUser) {
      methods.setValue("editName", loginUser.name);
      methods.setValue("image", loginUser.image);
    }
  }, [loginUser])

  const onSubmit:SubmitHandler<SubmitFormData> = useCallback(async (data) => {
    const packet = {
      id:loginUser.id,
      name:data.editName,
      image:data.image,
    }

    if (dispatch && dispatch !== null && dispatch !== undefined && loginUser) {
      //これはextraReducerに記述すれば良い
      dispatch(setIsLoading())

      const resultAction = await dispatch(fetchAsyncEditProfile(packet))
      if (fetchAsyncEditProfile.fulfilled.match(resultAction)) {
        
        router.push('/')
        setTimeout(async() => {
          await dispatch(fetchAsyncCheckAuth())
          dispatch(resetIsLoading())
        }, 200)
      }
    }
  },[dispatch])

  // プロフィール編集成功

  return (
    <>
    <FormProvider {...methods}>
      <AccountProfileForm onSubmit={onSubmit} />
    </FormProvider>
    </>
  )
}

export default Profile
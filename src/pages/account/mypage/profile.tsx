import { AppDispatch } from 'app/store'
import { useSelector, useDispatch } from 'react-redux'
import { 
  fetchAsyncEditProfile,
  fetchAsyncCheckAuth, 
  setIsEditProfile
} from 'features/account/accountSlice/'
import Head from 'next/head'
import { SubmitHandler } from 'react-hook-form'
import AccountProfileForm from 'components/organisms/AccountProfileForm'
import { ProfileInputData,ProfileSubmitData, } from 'types/accountTypes'
import { useAuthGuard } from 'hooks/auth'
import { selectLoginUser } from 'features/account/accountSlice/'
import useNavigation from 'hooks/utils/useNavigation'

const ProfileEdit = () => {
  const dispatch:AppDispatch = useDispatch()
  const loginUser = useSelector(selectLoginUser)
  useAuthGuard()
  const { navigateTo } = useNavigation()
  const handleGoToMypage = () => navigateTo('/account/mypage?alert=success_edit')

  const onSubmit:SubmitHandler<ProfileInputData> = async (data) => {
    if (!data || !loginUser) {
      return
    } 
    const submitData:ProfileSubmitData = {
      id:loginUser.id,
      name:data.name,
      image:data.image,
    }
    const result = await dispatch(fetchAsyncEditProfile(submitData))
    if (fetchAsyncEditProfile.fulfilled.match(result)) {
      await dispatch(fetchAsyncCheckAuth())
      dispatch(setIsEditProfile())
      handleGoToMypage()
    }
  }

  return (
    <>
      <Head>
        <title>プロフィール編集</title>
      </Head>
      <AccountProfileForm onSubmit={onSubmit} />
    </>
  )
}

export default ProfileEdit
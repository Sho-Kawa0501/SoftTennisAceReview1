import { useState, useEffect,useCallback } from 'react'
import { AppDispatch } from 'app/store'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
import DeleteUserModal from 'components/DeleteUserModal'
import useSWR ,{SWRResponse} from 'swr'
import { fetcherWithCredential } from 'lib/posts'
import ReviewCard from 'components/ReviewCard'
import ReviewCardList from 'components/ReviewCardList'


type ProfileFormData = {
  editName: string;
  image: string | null;
}
//ログイン時にユーザー情報を取得してreduxに保存している
//要検討...型指定について。ProfileFormDataとProfileには重複項目があるので、editNameをnameにすれば解決しそう？
const MyPage = () => {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const loginUser = useSelector((state:RootState) => state.account.loginUser)
  //自分のいいね一覧を取得する処理favorite_list

  const { data: review,error,mutate:mutateFavoriteReview} = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/favorite_list/`,
    url => fetcherWithCredential(url, 'get',null,true),
  )

  useEffect (() => {
    if (loginUser.id) {
      mutateFavoriteReview()
    }
  },[review])
  console.log(review)


  return (
    <>
    {/* 各リンクを貼る */}
    <div>

    </div>
      <Link href="/account/mypage/profile" legacyBehavior>
        <a>
          プロフィール編集
        </a>
      </Link>
      <DeleteUserModal />
      <ReviewCardList reviews={review} />

    </>
  )
}

export default MyPage
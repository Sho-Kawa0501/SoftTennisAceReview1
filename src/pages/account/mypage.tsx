import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import DeleteUserModal from 'components/templates/DeleteUserModal'
import Head from 'next/head'
import { useAuthGuard } from 'hooks/auth'
import { useAlertAuthMessage } from 'hooks/account/useAlertAuthMessage'
import { selectLoginUser } from 'features/account/accountSlice'
import AlertMessage from 'components/Atoms/AlertMessage'
import Image from 'next/image'
import AppButton from 'components/Atoms/AppButton'
import useNavigation from 'hooks/utils/useNavigation'

const MyPage = () => {
  const loginUser = useSelector(selectLoginUser)
  useAuthGuard()
  const { showMessage } = useAlertAuthMessage()
  const { handleHome } = useNavigation()

  return (
    <>
    <Head>
        <title>マイページ</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          {showMessage.show && 
            <AlertMessage message={showMessage.message} color={showMessage.color} />
          }
          <div className="flex flex-col items-center justify-center mb-6">
            <Image 
              src={`${process.env.NEXT_PUBLIC_API_BASE_PATHE_PATH}` + loginUser.image}
              width="60"
              height="60"
              alt="loginUser.image"
              className="rounded-full mb-2"
            />
            <h1 className="text-2xl font-bold">{loginUser.name}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/account/mypage/profile" legacyBehavior>
              <a className="border p-3 text-black text-center hover:bg-gray-200 rounded bg-white">プロフィール編集</a>
            </Link>
            <Link href="/account/mypage/myreview-list" legacyBehavior>
              <a className="border p-3 text-black text-center hover:bg-gray-200 rounded bg-white">マイレビュー一覧</a>
            </Link>
            <Link href="/account/mypage/favorite-reviews" legacyBehavior>
              <a className="border p-3 text-black text-center hover:bg-gray-200 rounded bg-white">お気に入りレビュー一覧</a>
            </Link>
          </div>
          <DeleteUserModal />
          <AppButton text="ホームに戻る" type="button" onClick={handleHome} color="blue" />
        </div>
      </div>
    </>
  )
}

export default MyPage
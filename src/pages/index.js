import { useSelector } from 'react-redux'
import Head from 'next/head'

const Index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)

  return (
    <>
      <Head>
        <title>有料会員サイト</title>
      </Head>

      <div>
        {isAuthenticated && user ? (
          <div>
            <div>ようこそ、{user.name}さん</div>
            <div>ログイン後画面</div>
            <div className="my-4 border-4 border-dashed border-gray-200 rounded">
              <div className="flex justify-center items-center h-64">これまでよく頑張った！</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl">
            ログイン前画面
          </div>
        )}
      </div>
    </>
  )
}

export default Index
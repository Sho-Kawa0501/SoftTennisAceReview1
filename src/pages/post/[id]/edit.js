import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { edit_post } from '../../../actions/post'
import { getPostIds, getPostDetail } from '../../../lib/posts'
import useSWR from 'swr'
import { Rings } from 'react-loader-spinner'
import Head from 'next/head'

//jsonデータを返す関数
//引数urlにfetch対象のURLを入れる。
//成功後に
const fetcher = (url) => fetch(url).then((res) => res.json())

const EditPost = ({ staticPost,id }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const loading = useSelector((state) => state.post.loading)
  const edit_post_success = useSelector((state) => state.post.edit_post_success)
  const [image, setImage] = useState(null)

  //swr...関数コンポーネント内で使用可能
  // data,error,isLoading,などの値を返す
  //バウンドミューテートを採用
  //
  //useSWRに対して渡されたkeyに対して対応付けられ、dataを第１引数として受け取れる
  const { data: post,mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post_detail/${id}/`,
    fetcher,
    {
      fallbackData: staticPost,
    }
  )

  useEffect(() => {
    mutate()
  }, [])

  const [ formData, setFormData ] = useState({
    title: post ? post.title : '',
    content: post ? post.content : '',
  })

  if (router.isFallback || !post) {
    return <div className="text-center">Loading...</div>
  }

  const { title, content } = formData

  const onChange = (e) => {
    setFormData({ ...formData,[e.target.name]:e.target.value })
  }

  //編集データを送信
  const onSubmit = async (e) => {
    e.preventDefault()

    if (dispatch && dispatch !== null && dispatch !== undefined && post) {
      await dispatch(edit_post(post.id, title, image, content))
    }
  }

  // 編集成功時に詳細ページに移動
  if (edit_post_success) {
    router.push(`/post/${post.id}`)
  }

  return (
    <>
      <Head>
        <title>FullStackChannel | 投稿編集</title>
      </Head>

      <div className="text-center text-2xl mb-5">投稿編集</div>
      <form className="md:w-1/3 mx-auto" onSubmit={onSubmit}>
        <div className="mb-4">
          <div className="mb-1" htmlFor="title">
            タイトル
          </div>
          <input
            className="input-form"
            type="text"
            name="title"
            placeholder="タイトル"
            onChange={onChange}
            value={title}
            required
          />
        </div>
        <div className="mb-4">
          <div className="mb-1">画像</div>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="mb-4">
          <div className="mb-1" htmlFor="content">
            説明
          </div>
          <textarea
            className="input-form h-72"
            type="text"
            name="content"
            placeholder="説明"
            onChange={onChange}
            value={content}
            required
          />
        </div>

        <div className="flex justify-center">
          {loading ? (
            <Rings type="Oval" color="#F59E00" width={50} height={50} />
          ) : (
            <button className="button-yellow" type="submit">
              送信
            </button>
          )}
        </div>
      </form>
    </>
  )
}

export default EditPost

export async function getStaticPaths() {
  const paths = await getPostIds()
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const staticPost = await getPostDetail(params.id)

  return {
    props: {
      id: staticPost.id,
      staticPost,
    },
    revalidate:1,
  }
} 
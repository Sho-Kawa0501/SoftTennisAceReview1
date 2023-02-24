import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { new_post } from '../../actions/post'
import { Rings } from 'react-loader-spinner'
import Head from 'next/head'

const NewPost = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const loading = useSelector((state) => state.post.loading)
  const new_post_success = useSelector((state) => state.post.new_post_success)

  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  const { title, content } = formData
  
  //投稿データ入力
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //新規投稿
  const onSubmit = async (e) => {
    e.preventDefault()

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(new_post(title, image, content))
    }
  }

  //新規投稿成功後、ページ遷移
  if (new_post_success) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>FullStackChannel | 新規投稿</title>
      </Head>

      <div className="text-center text-2xl mb-5">新規投稿</div>
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
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
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

export default NewPost
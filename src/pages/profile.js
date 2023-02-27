import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { edit_profile } from '../actions/auth'
import { Rings } from 'react-loader-spinner'
import Head from 'next/head'

const Profile = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const edit_profile_success = useSelector((state) => state.auth.edit_profile_success)
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)
  const [image, setImage] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
  })

  const { name } = formData

  //user情報に変更があったら、nameに値を設定するようにする
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
      })
    }
  }, [user])

  // 入力
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // プロフィール編集
  const onSubmit = async (e) => {
    e.preventDefault()

    if (dispatch && dispatch !== null && dispatch !== undefined && user) {
      await dispatch(edit_profile(user.id, name, image))
    }
  }

  // プロフィール編集成功
  if (edit_profile_success) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>FullStackChannel | プロフィール</title>
      </Head>

      <div className="text-center text-2xl mb-5">プロフィール</div>
      <form className="w-1/3 mx-auto" onSubmit={onSubmit}>
        <div className="mb-4">
          <div className="mb-1" htmlFor="name">
            名前
          </div>
          <input
            className="input-form"
            type="text"
            name="name"
            placeholder="フルスタックチャンネル"
            onChange={onChange}
            value={name}
            required
          />
        </div>
        <div className="mb-4">
          <div className="mb-1">プロフィール画像</div>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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

export default Profile
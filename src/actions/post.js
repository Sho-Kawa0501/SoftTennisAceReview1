import {
  // 新規投稿
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,

  // 読み込み中
  SET_POST_LOADING,
  REMOVE_POST_LOADING,

  // 状態解除
  RESET_POST_STATUS,
} from './types'


//新規投稿
export const new_post = (title, image, content) => async (dispatch) => {
  dispatch({
    type: SET_POST_LOADING,
  })

  const formData = new FormData()
    formData.append('title',title)
    formData.append('content',content)
    formData.append('image',image)

    try {
      const res = await fetch('/api/post/new_post', {
        method:'GET',
      })
      const data = await res.json()

      const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, {
        method:'POST',
        headers: {
          Authorization:`Bearer ${data.access}`,
        },
        body: formData,
      })

      if (res2.status === 201 ) {
        dispatch({
          type:NEW_POST_SUCCESS,
        })
      } else {
        dispatch({
          type:NEW_POST_FAIL,
        })
      }
    } catch (err) {
      dispatch({
        type: NEW_POST_FAIL,
      })
    }

  dispatch({
    type: REMOVE_POST_LOADING,
  })
}
//状態解除
export const reset_post_status = () => (dispatch) => {
  dispatch({
    type: RESET_POST_STATUS,
  })
} 

import {
  // 新規投稿
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,

   // 投稿編集
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,

  // 読み込み中
  SET_POST_LOADING,
  REMOVE_POST_LOADING,

  // 状態解除
  RESET_POST_STATUS,
} from '../actions/types'

const initialState = {
  loading: false,
  new_post_success: false,
}


const postReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    // 新規投稿
    case NEW_POST_SUCCESS:
      return {
        ...state,
        new_post_success: true,
      }
    case NEW_POST_FAIL:
      return {
        ...state,
      }

    // 投稿編集
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        edit_post_success: true,
      }
    case EDIT_POST_FAIL:
      return {
        ...state,
      }

    // 読み込み中
    case SET_POST_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_POST_LOADING:
      return {
        ...state,
        loading: false,
      }

    // 状態解除
    case RESET_POST_STATUS:
      return {
        ...state,
        new_post_success: false,
      }
    default:
      return state
  }
}

export default postReducer
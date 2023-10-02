// import {
//   createAsyncThunk,
//   createSlice,
//   PayloadAction,
// } from '@reduxjs/toolkit';
// import axios from 'axios'
// import { id } from 'date-fns/locale';

import type { RootState } from '../../app/store'

// axios.defaults.withCredentials = true

// export interface FILE extends Blob {
//   readonly lastModified: number;
//   name: string;
// }

// interface NEW_POST {
//   title: string
//   content: string
//   image: FILE | null
//   itemId: number
// }

// interface EDIT_POST {
//   id: number
//   title: string
//   content: string
//   image: FILE | null
// }

// interface CREATE_LIKE {
//   userId: string
//   postId: string
// }

// interface LikePost {
//   id: number;
//   title: string;
//   content: string;
//   likes_count: number;
// }

// interface LikeState {
//   likedPosts: number[];
// }


// //CreatePostView
// export const fetchAsyncNewPost = createAsyncThunk(
//   'post/NewPost',
//   async (newPost: NEW_POST) => {
//     const uploadData = new FormData()
//     uploadData.append("title", newPost.title)
//     uploadData.append("content", newPost.content)
//     newPost.image && uploadData.append("image", newPost.image, newPost.image.name)

//     try {
//       const response2 = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/posts/create/${newPost.itemId}/`,
//         uploadData,
//         {
//           headers: {
//             'content-type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       )
//       console.log(response2)
//       return response2.data

//     } catch (error) {
//       console.log(error)
//       throw error
//     }
//   }
// )

// //PostViewSet...postsは全てPostViewSet
// export const fetchAsyncEditPost = createAsyncThunk(
//   'post/EditPost',
//   async (editPost: EDIT_POST) => {
//     const uploadData = new FormData()
//     uploadData.append("title", editPost.title)
//     uploadData.append("content", editPost.content)
//     editPost.image && uploadData.append("image", editPost.image, editPost.image.name)

//     // newPost.image && uploadData.append("image", newPost.image, newPost.image.name)

//     // 2番目の処理
//     try {
//       const response2 = await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${editPost.id}/`,
//         uploadData,
//         {
//           headers: {
//             'content-type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       )
//       return response2.data
//     } catch (error) {
//       console.log(error)
//       throw error
//     }
//   }
// )


// //PostViewSet post_delete
// export const fetchAsyncDeletePost = createAsyncThunk(
//   'post/DeletePost',
//   async (postId: string) => {
//     const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/`, 
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       }
//     )
//     return res.data
//   }
// )

// //いいね機能
// //いいね登録 ここでは認証は行わないこととする
// // //使っていない可能性あり
// // export const fetchAsyncAddLike = createAsyncThunk(
// //   'post/addLike',
// //   async (likeData: CREATE_LIKE) => {
// //     try {
// //       const response2 = await axios.post(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/like/${likeData.postId}/`,
// //         { post: likeData.postId,user:likeData.userId }, 
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           withCredentials: true,
// //         }
// //       )
// //       return response2.data
// //     } catch (error) {
// //       console.log(error)
// //       throw error
// //     }
// //   }
// // )

// // // いいね解除
// // export const fetchAsyncRemoveLike = createAsyncThunk(
// //   'post/removeLike',
// //   async (postId: string) => {
// //     try {
// //       const response2 = await axios.delete(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/${postId}/unlike/`,
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           withCredentials: true,
// //         }
// //       )
// //       return response2.data
// //     } catch (error) {
// //       console.log(error)
// //       throw error
// //     }
// //   }
// // )

// interface Post {
//   id: number
//   user: {
//     name: string;
//     image: string;
//     id: string;
//   };
//   productId: number;
//   title: string;
//   content: string;
//   image: string;
//   likes_count: number;
// }

// interface PostState {
//   isLoading:boolean,
//   isLoadingPost: boolean,
//   posts: Post[],
//   isNewPost: boolean,
//   isEditPost: boolean,
//   isDeletePost: boolean,
// }

// const initialState:PostState = {
//   isLoading:true,
//   isLoadingPost: false,
//   posts: [
//     {
//       id: 0,
//       user: {
//         name: '',
//         image: '',
//         id: ''
//       },
//       productId: 0,
//       title: '',
//       content: '',
//       image: '',
//       likes_count: 0, //実際のいいね数
//     },
//   ],
//   isNewPost: false,
//   isEditPost: false,
//   isDeletePost: false,
// }

// export const postSlice = createSlice({
//   name: 'post',
//   initialState,
//   reducers: {
//     fetchPostStart(state) {
//       state.isLoadingPost = true;
//     },
//     fetchPostEnd(state) {
//       state.isLoadingPost = false;
//     },
//     setIsNewPost(state) {
//       state.isNewPost = true
//     },
//     resetIsNewPost(state) {
//       state.isNewPost = false
//     },
//     setIsEditPost(state) {
//       state.isEditPost = true
//     },
//     resetIsEditPost(state) {
//       state.isEditPost = false
//     },
//     setIsDeletePost(state) {
//       state.isDeletePost = true
//     },
//     resetIsDeletePost(state) {
//       state.isDeletePost = false
//     }
//   },
//   //各非同期関数の処理が終了した後の処理。
//   extraReducers: (builder) => {
//     builder.addCase(fetchAsyncNewPost.pending,
//       (state) => {
//         state.isLoading = true
//       })
//     builder.addCase(fetchAsyncNewPost.fulfilled,
//       (state, action: PayloadAction<Post>) => {
//         return {
//           ...state,
//           posts: [...state.posts, action.payload],
//           isNewPost: true,
//           isloading:false,
//         };
//       })
//       builder.addCase(fetchAsyncEditPost.pending,
//         (state) => {
//           state.isLoading = true
//         })
//     builder.addCase(fetchAsyncEditPost.fulfilled,
//       (state, action:PayloadAction<Post>) => {
//         return {
//           ...state,
//           posts: [...state.posts, action.payload],
//           isEditPost: true,
//           isLoadint:false,
//         }
//       })
//     builder.addCase(fetchAsyncDeletePost.pending,
//       (state) => {
//         state.isLoading = true
//       })
//     builder.addCase(fetchAsyncDeletePost.fulfilled,
//       (state, action) => {
//         return {
//           ...state,
//           isDeletePost: true,
//           isloading:false,
//         }
//       })
//    },
// })


// export const {
//   fetchPostStart,
//   fetchPostEnd,
//   setIsNewPost,
//   resetIsNewPost,
//   setIsEditPost,
//   resetIsEditPost,
//   setIsDeletePost,
//   resetIsDeletePost,
// } =
//   postSlice.actions

// export const selectIsAuthenticated = (state: RootState) => state.account.isAuthenticated
// export const selectPosts = (state: RootState) => state.post.posts
// export const selectNewPost = (state: RootState) => state.post.isNewPost
// export const selectEditPost = (state: RootState) => state.post.isEditPost
// export const selectDeletePost = (state: RootState) => state.post.isDeletePost

// export default postSlice.reducer
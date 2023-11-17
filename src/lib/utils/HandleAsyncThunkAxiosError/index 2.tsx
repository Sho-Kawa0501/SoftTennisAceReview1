import axios from "axios"
//使わない
// import { AsyncThunk, RejectWithValue } from '@reduxjs/toolkit'
// import { AsyncThunkConfig } from "app/store"

// export const handleAsyncThunkAxiosError = 
// (error: unknown, thunkAPI:any): 
// ReturnType<typeof thunkAPI.rejectWithValue> => {
//   console.log("handleAxiosError"+error)
//   if (axios.isAxiosError(error)) {
    
//     if (error.response) {
//       console.log("handleAxiosError1"+error)
//       return thunkAPI.rejectWithValue(error.response.data.error);
//     } else if (error.request) {
//       return thunkAPI.rejectWithValue('サーバーからの応答がありません。');
//     } else {
//       return thunkAPI.rejectWithValue('通信に失敗しました。');
//     }
//   }
//   return thunkAPI.rejectWithValue('通信に失敗しました。');
// }
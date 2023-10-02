import axios from "axios";

export const handleAxiosError = (error: unknown, thunkAPI?: any): ReturnType<typeof thunkAPI.rejectWithValue> => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    } else if (error.request) {
      return thunkAPI.rejectWithValue('サーバーからの応答がありません。');
    } else {
      return thunkAPI.rejectWithValue('通信に失敗しました。');
    }
  }
  return thunkAPI.rejectWithValue('通信に失敗しました。');
}
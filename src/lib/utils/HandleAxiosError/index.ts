import axios from "axios"

export const handleAxiosError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data.error
    } else if (error.request) {
      return 'サーバーからの応答がありません。'
    } else {
      return '通信に失敗しました。'
    }
  }
  return '通信に失敗しました。'
}
import axios from "axios"
type HttpMethod = 'get' | 'post' | 'delete' | 'put'


export const fetcherWithCredential = async (
  url: string,
  method: HttpMethod = 'get',
  data = null,
  withCredentials = true
  ) => {
  const config = {
    method,
    withCredentials,
    data
  }

  try {
    const response = await axios(url, config)
    return response.data
  } catch (error) {
    console.error("fetcherWithCredential:", error)
    throw error
  }
}

export const convertFileToDataURL = (file: File, callback: (dataUrl: string) => void) => {
  let reader = new FileReader()
  reader.onloadend = () => {
    callback(reader.result as string)
  }
  reader.onerror = (error) => {
    console.error("convertFileToDataURL:"+error)
  }
  reader.readAsDataURL(file)
}

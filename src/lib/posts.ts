//投稿に関する関数
import { yearsToMonths } from "date-fns"
import { Params, ParamsNum } from "types"
import axios, { AxiosResponse } from 'axios'
import cookie from 'cookie'
import { BRAND_LIST,SERIES_LIST,POSITION_LIST } from "types"


//投稿一覧取得
export const getReviewList = async() =>  {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review_list/`, {
    method: 'GET',
  })
  const reviews = await apiRes.json()
  return reviews
}


export const getReviewListFilter= async(id:number) => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review_list/${id}/`, {
    method: 'GET',
  })
  const reviews = await apiRes.json()
  return reviews
}

//
interface ItemId {
  params: {
    itemId: string
  }
}

interface ReviewId {
  params: {
    reviewId: string;
  };
}

//投稿一覧ID取得
export const getReviewIds = async (): Promise<ReviewId[]> => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review_list/`, {
    method: 'GET',
  })
  const reviews = await apiRes.json()

  return reviews.map((review: Params) => ({
    params: {
      reviewId: review.id.toString(),
    },
  }))
}

export const getItemIds = async (): Promise<ItemId[]> => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_list/`, {
    method: 'GET',
  })

  const items = await apiRes.json()

  return items.map((item: Params) => ({
    params: {
      // itemId: item.id.toString(),
      itemId: item.id.toString(),
    },
  }))
}
//

export const getBrandList = async (): Promise<BRAND_LIST[]> => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/brand_list/`, {
    method: 'GET',
  })
  const brand_list = apiRes.json()
  return brand_list
}

export const getSeriesList = async (): Promise<SERIES_LIST[]> => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/series_list/`, {
    method: 'GET',
  })
  const series_list = apiRes.json()
  return series_list
}

export const getPositionList = async (): Promise<POSITION_LIST[]> => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/position_list/`, {
    method: 'GET',
  })
  const position_list = apiRes.json()
  return position_list
}

////

//投稿詳細取得
export const getReviewDetail = async(id:string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/review_detail/${id}/`, {
      withCredentials: true,
  })
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const getItemList = async() => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_list/`, {
    method: 'GET',
  })
  const items = await apiRes.json()
  return items
}


export const getItemDetail = async(id: number) => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_detail/${id}/`, {
    method: 'GET',
  })
  const detail = await apiRes.json()
  return detail
}
////


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
    const response = await axios(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const convertFileToDataURL = (file: File, callback: (dataUrl: string) => void) => {
  let reader = new FileReader()
  reader.onloadend = () => {
    callback(reader.result as string)
  }
  reader.onerror = (error) => {
  }
  reader.readAsDataURL(file)
}


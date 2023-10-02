//投稿に関する関数
import { yearsToMonths } from "date-fns"
import { Params, ParamsNum } from "types"
import axios, { AxiosResponse } from 'axios'
import cookie from 'cookie'
import { BRAND_LIST,SERIES_LIST,POSITION_LIST } from "types"

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
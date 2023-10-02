import { BRAND_LIST,SERIES_LIST,POSITION_LIST } from "types"

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

export const getItemMetaDataList = async() => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_metadata_list/`,{
    method: 'GET',
  })
  const item_metadata_list = await apiRes.json()
  return item_metadata_list
}
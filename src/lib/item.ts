import axios, { AxiosResponse } from 'axios'
import { StaticItemMetaDataType, } from "types/itemTypes"
import { Item } from 'types/itemTypes'
import { handleAxiosError } from "./utils/HandleAxiosError"

//アイテムデータがItemの配列状態で返ってくる
export const getItemList = async (): Promise<Item[]> => {
  try {
  const response = await axios.get<Item[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_list/`);
  return response.data;
  } catch(error) {
    throw handleAxiosError(error)
  }
}

export const getItemDetail = async (id: number): Promise<Item> => {
  try {
  const response = await axios.get<Item>(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_detail/${id}/`);
  return response.data;
  } catch(error) {
    throw handleAxiosError(error)
  }
}

//型
export const getItemMetaDataList = async(): Promise<StaticItemMetaDataType> => {
  try {
    const response = await axios.get<StaticItemMetaDataType>
    (`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_metadata_list/`,)
  // const item_metadata_list = await apiRes.data
  return response.data
  } catch(error) {
    throw handleAxiosError(error)
  }
}


//パス生成に使用する
export const getItemIds = async (): Promise<{ params: { itemId: string } }[]> => {
  try {
    const response = await axios.get<{ id: string }[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_list/`);
    return response.data.map(item => ({
      params: {
        itemId: item.id.toString()
      }
    }));
  } catch (error) {
    throw handleAxiosError(error);
  }
}

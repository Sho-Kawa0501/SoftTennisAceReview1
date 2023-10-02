import { Params, ParamsNum } from "types"
interface ItemId {
  params: {
    itemId: string
  }
}

export const getItemIds = async (): Promise<ItemId[]> => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/item_list/`, {
    method: 'GET',
  })

  const items = await apiRes.json()

  return items.map((item: Params) => ({
    params: {
      itemId: item.id.toString(),
    },
  }))
}
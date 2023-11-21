import ItemCard from '../molecules/ItemCard'
import { Item } from 'types/itemTypes'
import React from 'react'

type ItemCardListProps = {
  items: Item[]
}

const ItemCardList = React.memo(({ items }: ItemCardListProps) => (
  <div className="w-full mt-2 flex justify-center flex-wrap">
    {items.map((item) => (
      <ItemCard item={item} key={item.id} />
    ))}
  </div>
))

ItemCardList.displayName = "itemCardList"
export default ItemCardList
import ItemCard from "./ItemCard"
import { Item } from "features/item/ItemTypes"
import React from "react"

type ItemCardListProps = {
  items: Item[]
}

const ItemCardList = ({ items }: ItemCardListProps) => (
  <div className="flex flex-wrap">
    {items.map((item) => (
      <ItemCard item={item} key={item.id} />
    ))}
  </div>
)

export default ItemCardList
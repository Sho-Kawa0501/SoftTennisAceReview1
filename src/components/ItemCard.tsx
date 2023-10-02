import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Item } from 'features/item/ItemTypes'

type ItemCardProps = {
  item: Item
}

const ItemCard = React.memo(({ item }: ItemCardProps) => (
  <div key={item.id} className="w-full sm:w-1/3 p-4">
    {item.item_name}
    <Link href={`/items/${item.id}`} legacyBehavior>
      <Image 
        src={item.item_photo}
        alt={``}
        className="w-full h-64 object-cover"
        width={100}
        height={100}
      />
    </Link>
  </div>
))

export default ItemCard
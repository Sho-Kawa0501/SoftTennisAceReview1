import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Item } from 'types/itemTypes'

type ItemCardProps = {
  item: Item
}

const ItemCard = React.memo(({ item }: ItemCardProps) => {
  return (
    <div key={item.id} className="p-1 w-1/3 md:w-1/4">
      <div className="text-center text-base sm:text-lg">{item.item_name}</div>
      <div className="w-full flex justify-center">
        <Link href={`/review/review-list/${item.id}`} legacyBehavior>
        <div className="w-26 h-26 md:w-60 md:h-60 hover:scale-105 transition-transform duration-300">
          <Image 
            src={item.item_photo}
            alt={`ラケット画像`}
            className="object-cover"
            width={350}
            height={350}
          />
          </div>
        </Link>
      </div>
    </div>
  )
})

ItemCard.displayName = "itemCard"
export default ItemCard
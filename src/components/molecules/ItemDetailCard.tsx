import React from 'react'
import Image from 'next/image'
import { Item } from 'types/itemTypes'

type ItemDetailProps = {
  item: Item 
}

export const ItemDetail = React.memo(({ item }:ItemDetailProps) => {
  console.log(item)
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <div className="flex flex-col items-center justify-center bg-white py-4">
        <div className="text-center text-base sm:text-2xl mb-2">
          {item.item_name} - {item.brand.name}
        </div>
        <div className="text-center text-base sm:text-lg mb-2">
          {item.series.name} - {item.position.name}用
        </div>
        <div className="w-full flex justify-center">
          <Image 
            src={item.item_photo}
            alt={`アイテム画像`}
            className="object-cover"
            width={300}
            height={300}
          />
        </div>
      </div>  
    </div>
  )
})

ItemDetail.displayName = "ItemDetail"
export default ItemDetail
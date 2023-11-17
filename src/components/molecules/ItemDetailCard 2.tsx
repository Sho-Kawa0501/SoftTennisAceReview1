import React from 'react'
import Image from 'next/image'
import { Item } from "types/itemTypes"

type ItemDetailProps = {
  item: Item; 
}

export const ItemDetail = React.memo(({ item }:ItemDetailProps) => {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <div className="flex flex-col items-center justify-center bg-white py-4">
        
        <div className="text-center mb-2">
          {item.item_name} - {item.brand.name}
          {/* ここにシリーズとポジションを追加 */}
        </div>
        <div className="w-full flex justify-center">
        <Image 
          src={item.item_photo}
          alt={`アイテム画像`}
          className="object-cover"
          width={500}
          height={500}
        />
        </div>
        </div>
        <div className="col-span-1">
          {/* ここに他の名前などを追加してみる*/}
        </div>
      
    </div>
  )
})

ItemDetail.displayName = "ItemDetail"
export default ItemDetail
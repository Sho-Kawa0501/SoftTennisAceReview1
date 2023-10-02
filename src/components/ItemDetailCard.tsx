import React from 'react'
import Image from 'next/image'

type ItemDetailProps = {
  item: any;  // 実際の項目の型に適合する型に変更してください
}

export const ItemDetail = React.memo(({ item }:ItemDetailProps) => {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <div className="grid grid-cols-3 bg-white border">
        <div className="col-span-2">
          <Image
            src={item.item_photo}
            className=""
            alt={item.item_name}
            width={800}
            height={800}
          />
        </div>
        <div className="col-span-1">
          {/* ここに他の名前などを追加してみる*/}
        </div>
      </div>
    </div>
  )
})

export default ItemDetail
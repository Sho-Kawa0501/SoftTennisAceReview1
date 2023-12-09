import React from 'react'
import { FaRegStar,FaStar } from "react-icons/fa6"

type FavoriteButtonProps = {
  isFavorite: boolean
  onClick: () => void
  count: number | undefined
}

const FavoriteButton = React.memo(({ isFavorite, onClick, count }: FavoriteButtonProps) => (
  <button
    className="inline-flex space-x-2 items-center"
    onClick={onClick}
  >
    {isFavorite ? (
      <FaStar className="text-yellow-500" size={20} />
    ) : (
      <FaRegStar className="text-gray-500" size={20} />
    )}
    <span>いいね</span>
    <span>{count}</span>
  </button>
))

FavoriteButton.displayName ="FavoriteButton"
export default FavoriteButton
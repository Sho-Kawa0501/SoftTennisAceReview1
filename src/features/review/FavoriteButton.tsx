import React from "react";
import { HiHeart,HiOutlineHeart } from "react-icons/hi";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: () => void;
  count: number | undefined;
};

const FavoriteButton = React.memo(({ isFavorite, onClick, count }: FavoriteButtonProps) => (
  <button
    className="inline-flex space-x-2 items-center"
    onClick={onClick}
  >
    {isFavorite ? (
      <HiHeart className="text-pink-500" size={20} />
    ) : (
      <HiOutlineHeart className="text-gray-500" size={20} />
    )}
    <span>いいね</span>
    <span>{count}</span>
  </button>
))

FavoriteButton.displayName ="FavoriteButton"
export default FavoriteButton
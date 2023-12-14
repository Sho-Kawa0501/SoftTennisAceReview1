import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedReviewId, setActiveModal } from 'features/app/appSlice';

type DeleteReviewButtonProps = {
  reviewId: string;
};

const DeleteReviewButton: React.FC<DeleteReviewButtonProps> = ({ reviewId }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setSelectedReviewId(reviewId));
    dispatch(setActiveModal("ReviewDeleteModal"));
  };

  return (
    <button onClick={openModal} className="text-red-600 hover:text-red-800">
      削除
    </button>
  );
};

export default DeleteReviewButton;

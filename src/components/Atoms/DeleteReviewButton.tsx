import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setSelectedReviewId, setActiveModal } from 'features/app/appSlice';
import AppButton from './AppButton'
import { selectIsButtonDisabled } from 'features/app/appSlice';

type DeleteReviewButtonProps = {
  reviewId: string;
};

const DeleteReviewButton: React.FC<DeleteReviewButtonProps> = ({ reviewId }) => {
  const dispatch = useDispatch();
  const isButtonDisabled = useSelector(selectIsButtonDisabled)

  const openModal = () => {
    dispatch(setSelectedReviewId(reviewId));
    dispatch(setActiveModal("ReviewDeleteModal"));
  };

  return (
    <AppButton onClick={openModal} type={"button"} color="red" disabled={isButtonDisabled}>
      削除
    </AppButton>
    
  );
};

export default DeleteReviewButton;

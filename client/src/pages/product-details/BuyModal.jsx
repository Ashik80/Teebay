import React from 'react';
import CustomModal from '../../components/modal/CustomModal';

const BuyModal = ({ size, open, dispatch, buyProduct }) => {
  return (
    <CustomModal
      size={size}
      open={open}
      dispatch={dispatch}
      onClick={buyProduct}
    >
      <h2>Are you sure you want to buy this product?</h2>
    </CustomModal>
  );
};

export default BuyModal;

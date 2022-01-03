import React from 'react';
import { Input } from 'semantic-ui-react';
import CustomModal from '../../components/modal/CustomModal';

const RentModal = ({ size, open, dispatch, rentDate, rentProduct, setRentDate }) => {
  return (
    <CustomModal
      size={size}
      open={open}
      dispatch={dispatch}
      onClick={rentProduct}
    >
      <h2 className="rent-form-title">Rental Period</h2>
      <div className="rent-form">
        <Input
          type="date"
          label="From"
          size="small"
          onChange={(e) =>
            setRentDate({ ...rentDate, startDate: e.target.value })
          }
        />
        <Input
          type="date"
          label="To"
          size="small"
          onChange={(e) =>
            setRentDate({ ...rentDate, endDate: e.target.value })
          }
        />
      </div>
    </CustomModal>
  );
};

export default RentModal;

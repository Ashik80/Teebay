import React from 'react';
import './CustomModal.css';
import { Modal, Button } from 'semantic-ui-react';

const CustomModal = ({ size, open, dispatch, children, onClick }) => {
  return (
    <Modal size={size} open={open} onClose={() => dispatch({ type: 'close' })}>
      <Modal.Content className="modal-content">
        {children}

        <Modal.Actions className='modal-action'>
          <Button className='action-button' negative onClick={() => dispatch({ type: 'close' })}>
            No
          </Button>
          <Button className='action-button' color="violet" onClick={onClick}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModal;

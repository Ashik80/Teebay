import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonGroup = ({ setIsBuying, dispatch, isRented }) => {
  return (
    <>
      <Button
        color="violet"
        onClick={() => {
          setIsBuying(true);
          dispatch({ type: 'open', size: 'tiny' });
        }}
        disabled={isRented}
      >
        Buy
      </Button>

      {!isRented && (
        <Button
          color="violet"
          onClick={() => {
            setIsBuying(false);
            dispatch({ type: 'open', size: 'tiny' });
          }}
        >
          Rent
        </Button>
      )}
    </>
  );
};

export default ButtonGroup;

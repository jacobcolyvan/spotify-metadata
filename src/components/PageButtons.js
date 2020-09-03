import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const PageButtons = ({
  playlistTotalAmount,
  setOffset,
  offset
}) => {
  const [nextButton, setNextButton] = useState(undefined);
  const [backButton, setBackButton] = useState(undefined);

  useEffect(() => {
    const determineButtons = () => {
      const currentTrackIndex = offset + 50;
      (currentTrackIndex < playlistTotalAmount) ? setNextButton(true) : setNextButton(false);
      (offset >= 50) ? setBackButton(true) : setBackButton(false);
    };

    determineButtons();
  }, [offset, playlistTotalAmount]);

  const handleClick = (button) => {
    if (button === 'previous') {
      setOffset(offset - 50);

    } else if (button === 'next') {
      setOffset(offset + 50);
    }
  };

  return (
    <div className='page-buttons'>
      <Button
        color='primary'
        variant='outlined'
        style={{width: '50%'}}
        disabled={backButton ? false : true}
        onClick={() => handleClick('previous')}
      >
        Previous Page
      </Button>
      <Button
        color='primary'
        variant='outlined'
        style={{width: '50%'}}
        disabled={nextButton ? false : true}
        onClick={() => handleClick('next')}
      >
        Next Page
      </Button>
    </div>
  );
};

export default PageButtons;

import React, { useState, useEffect } from 'react';
import '../../Styles/Card.css' ;// Import necessary React hooks

// CardItem component definition
const CardItem = ({ id, imageId, shownCards, cardClicked, source }) => {
  const [show, setShow] = useState(false);

  // Effect to update the 'show' state based on the 'shownCards' prop
  useEffect(() => {
    const isShown = shownCards.includes(id); 
    setShow(isShown);
  }, [shownCards]); 

  // Handler for card click events
  const onClick = (e) => {
    cardClicked(e.target); 
  };

  // Handler for keyboard events (for accessibility)
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      cardClicked(e.target); 
    }
  };

  return (
    <div
      id={id} 
      imgid={imageId}
      role="button" 
      tabIndex={0} 
      className='mem-card' 
      style={{
        backgroundColor: show ? '#D3D3D3' : null, 
        pointerEvents: show ? 'none' : 'auto', 
      }}
      onClick={onClick}
      onKeyDown={onKeyDown} 
    >
      <img
        id={id} 
        imgid={imageId}
        alt='card-figure' 
        src={`https://robohash.org/${imageId}${source}`} 
        style={{ visibility: !show ? 'hidden' : 'visible' }} 
      />
    </div>
  );
};

export default CardItem;

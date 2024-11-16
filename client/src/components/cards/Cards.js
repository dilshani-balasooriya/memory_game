import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';

const Cards = ({
  updateActive,
  updateNumOfMoves,
  currentLevel,
  updateNewGame,
}) => {
  const [images, setImages] = useState([]);
  const [shownCards, setShownCards] = useState([]);
  const [currCards, setCurrCards] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [count, setCount] = useState(0); 
  const [isMounted, setIsMounted] = useState(true); // Track component mount status

  useEffect(() => {
    // Set mounted to true when component mounts
    setIsMounted(true);

    let number;
    switch (currentLevel) {
      case 'easy':
        number = 12; 
        break;
      case 'medium':
        number = 20; 
        break;
      case 'hard':
        number = 24; 
        break;
      default:
        number = 12; 
    }

    // declare array with integers up to 'number', repeated once, and then randomize
    let buffer = [];
    for (let i = 1; i <= number; i++) {
      let temp = i <= number / 2 ? i : i - number / 2;
      buffer.push({ id: temp });
    }

    buffer.sort(() => Math.random() - 0.5);

    // save random int array to state
    if (isMounted) { // Only update state if mounted
      setImages(buffer);
    }

    // Reset shown cards and count when a new game starts
    if (isMounted) {
      setShownCards([]);
      setCurrCards([]);
      setCount(0);
    }

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      setIsMounted(false);
    };
  }, [currentLevel, isMounted]); 

  // Set source directly for the cat theme
  const source = '?set=set4';

  // handle cards clicked
  const cardClicked = (cardDiv) => {
    const curImgId = parseInt(cardDiv.getAttribute('imgid'));
    const curId = parseInt(cardDiv.id);

    // if card is first clicked in pair, store values
    if (currCards.length === 0) {
      setCurrCards([curImgId]);
      setShownCards((prevShownCards) => [...prevShownCards, curId]);
    } else {
      // increase count state by 1
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        updateNumOfMoves(newCount); 
        return newCount;
      });

      // if cards match
      if (currCards.includes(curImgId)) {
        setShownCards((prevShownCards) => [...prevShownCards, curId]);
        setCurrCards([]);

        // if all cards are found
        if (shownCards.length + 1 === images.length) {
          updateNewGame({
            gameLevel: currentLevel,
            numOfMoves: count + 1,
            date: Date.now(),
          });
          updateActive();
        }
      } else {
        // Cards do not match
        setDisableClick(true);
        setShownCards((prevShownCards) => [...prevShownCards, curId]);
        setCurrCards([]);

        setTimeout(() => {
          let shownCardsTempArr = [...shownCards];
          shownCardsTempArr.splice(-1, 1); 
          if (isMounted) { // Only update state if mounted
            setShownCards(shownCardsTempArr);
            setDisableClick(false);
          }
        }, 800);
      }
    }
  };

  return (
    <div
      className='mem-cards-container'
      style={{
        maxWidth:
          currentLevel === 'easy'
            ? '500px'
            : currentLevel === 'medium'
            ? '600px'
            : '700px',
      }}
    >
      {images.map((image, index) => (
        <CardItem
          key={index}
          id={index}
          imageId={image.id}
          shownCards={shownCards}
          cardClicked={disableClick ? () => console.log('nope!') : cardClicked}
          source={source} 
        />
      ))}
    </div>
  );
};

export default Cards;


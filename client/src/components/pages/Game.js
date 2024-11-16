import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import HistoryContext from '../../context/history/historyContext';
import AuthContext from '../../context/auth/authContext';
import Cards from '../cards/Cards';
import backgroundImage from '../../img/background.png';
import monkeyImage from '../../img/small-image.png';
import '../../Styles/Game.css';

const Game = () => {
  const historyContext = useContext(HistoryContext);
  const authContext = useContext(AuthContext);
  const { currentLevel, currentTheme, addNewGame } = historyContext;
  const history = useHistory();

  const levelConfig = {
    easy: { cards: 6, maxMoves: 14 },
    medium: { cards: 12, maxMoves: 24 },
    hard: { cards: 18, maxMoves: 32 },
  };

  const { cards: numOfCards, maxMoves } = levelConfig[currentLevel] || levelConfig.easy;

  const [active, setActive] = useState(true);
  const [curNumOfMoves, setCurNumOfMoves] = useState(0);
  const [gameFailed, setGameFailed] = useState(false);
  const [newGame, setNewGame] = useState({
    gameLevel: currentLevel,
    numOfMoves: 0,
    date: Date.now(),
  });
  const [userGuess, setUserGuess] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const motivationalQuotes = [
    'Keep going, you can do it!',
    'Believe in yourself!',
    'Never give up!',
    'Stay strong, keep pushing forward!',
    'Every move counts!',
  ];
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    authContext.loadUser();

    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
    }, 3000);

    return () => clearInterval(quoteInterval);
  }, []);

  const updateActive = () => {
    setActive((prevActive) => !prevActive);
  };

  const updateCurNumOfMoves = (count) => {
    setCurNumOfMoves(count);
    if (count >= maxMoves) {
      setGameFailed(true);
      setActive(false);
    }
  };

  const updateNewGame = (newGame) => {
    setNewGame(newGame);
  };

  const onClickEndGame = () => {
    addNewGame({ ...newGame, numOfMoves: curNumOfMoves });
  };

  const handleGuessChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleGuessSubmit = () => {
    if (parseInt(userGuess) === 5) {
      setIsCorrectAnswer(true);
      history.push('/levels');
    } else {
      alert('Incorrect answer, try again!');
    }
  };

  if (authContext.loading) {
    return null;
  }

  return (
    <div
      className="game-board enhanced-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: '100vh',
      }}
    >
      {(!gameFailed || isCorrectAnswer) && (
        <Link to="/levels" className="btn animated-btn">
          Back to Levels
        </Link>
      )}

      <div className="moves-counter">
        <h3>
          Moves: {curNumOfMoves} / {maxMoves}
        </h3>
      </div>

      {active && !gameFailed ? (
        <Cards
          updateActive={updateActive}
          updateNumOfMoves={updateCurNumOfMoves}
          currentLevel={currentLevel}
          currentTheme={currentTheme}
          updateNewGame={updateNewGame}
          numOfCards={numOfCards}
        />
      ) : gameFailed ? (
        <div className="game-over-panel animated-panel">
          <h2>Game Over!</h2>
          <p>You've exceeded the maximum move count of {maxMoves}.</p>
          <img
            src="https://www.sanfoh.com/uob/banana/data/t3eb842b7be923b8a9f766cf230n85.png"
            alt="question"
          />
          <div>
            <input
              type="number"
              value={userGuess}
              onChange={handleGuessChange}
              placeholder="Enter your guess"
              className="animated-input"
            />
            <button onClick={handleGuessSubmit} className="btn animated-btn">
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="success-panel animated-panel">
          <h2>Congratulations!</h2>
          <p>You completed the game in {curNumOfMoves} moves.</p>
          <Link to="/levels" onClick={onClickEndGame} className="btn animated-btn">
            Back to Levels
          </Link>
        </div>
      )}
      {active && !gameFailed && !isCorrectAnswer && (
        <div className="motivational-quote-container">
          <div className="motivational-quote">
            <p>{currentQuote}</p>
          </div>
          <img
            src={monkeyImage}
            alt="Motivational Monkey"
            className="motivational-image"
          />
        </div>
      )}
    </div>
  );
};

export default Game;

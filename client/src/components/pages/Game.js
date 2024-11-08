import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import HistoryContext from '../../context/history/historyContext';
import AuthContext from '../../context/auth/authContext';
import Cards from '../cards/Cards';
import backgroundImage from '../../img/background.png';

const Game = () => {
  const historyContext = useContext(HistoryContext);
  const authContext = useContext(AuthContext);
  const { currentLevel, currentTheme, addNewGame } = historyContext;
  const history = useHistory();

  const levelConfig = {
    easy: { cards: 6, maxMoves: 12 },
    medium: { cards: 12, maxMoves: 18 },
    hard: { cards: 18, maxMoves: 24 },
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

  useEffect(() => {
    authContext.loadUser();
  }, [authContext]);

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

  // Return early if loading
  if (authContext.loading) {
    return null;
  }

  return (
    <div
      className='game-board'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px 10px 10px', 
        fontFamily: 'Joti One, sans-serif',
      }}
    >
      <Link
        to='/levels'
        className='waves-effect waves-light btn'
        style={{ marginBottom: '10px', backgroundColor: '#ff9800', color: 'white' }}
      >
        Back to Levels
      </Link>

      {/* Display available and used counts */}
      <div style={{ color: 'white', marginBottom: '20px' }}>
        <h3>Moves: {curNumOfMoves} / {maxMoves}</h3>
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
        <div className='row container'>
          <div className='col s12'>
            <div
              className='card red darken-1 small'
              style={{ background: 'rgba(255, 0, 0, 0.9)', padding: '10px', width: '600px', margin: '0 auto'}}
            >
              <div className='card-content white-text' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                  <span className='center card-title'>Game Over!</span>
                  <br />
                  <span className='center'>
                    You've exceeded the maximum move count of {maxMoves}.
                  </span>
                </div>
              </div>
              <div className='col s12 card-action'>
                <div className='col s12 center'>
                  <img
                    src="https://www.sanfoh.com/uob/banana/data/t3eb842b7be923b8a9f766cf230n85.png"
                    alt="question"
                    style={{ width: '400px', height: '150px', marginBottom: '20px' }} 
                  />
                  <div>
                    <span className="question-text">What is the solution to this question?</span>
                    <input
                      type="number"
                      value={userGuess}
                      onChange={handleGuessChange}
                      placeholder="Enter your guess"
                      style={{ margin: '10px 0' }}
                    />
                    <button onClick={handleGuessSubmit} className="waves-effect waves-light btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='row container'>
          <div className='col s12'>
            <div
              className='card blue-grey darken-1 small'
              style={{
                background: 'rgba(38, 50, 56, 0.9)',
                padding: '30px',
                width: '600px',
                margin: '0 auto',
                paddingBottom: '2rem',
              }}
            >
              <div className='card-content white-text' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                  <span className='center card-title'>Congratulations!</span>
                  <br />
                  <span className='center'>
                    You completed the game in {curNumOfMoves} moves.
                  </span>
                </div>
              </div>
              <div className='col s12 card-action'>
                <div className='col s12 center'>
                  <Link
                    to='/levels'
                    className='waves-effect waves-light btn'
                    onClick={onClickEndGame}
                  >
                    Back to Levels
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;

import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import HistoryContext from '../../context/history/historyContext';
import AuthContext from '../../context/auth/authContext';
import Cards from '../cards/Cards';
import backgroundImage from '../../img/forest1.jpg';
import '../../Styles/Game.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const Game = () => {
  const historyContext = useContext(HistoryContext);
  const authContext = useContext(AuthContext);
  const { currentLevel, currentTheme, addNewGame } = historyContext;
  const history = useHistory();

  // Configuration for different game levels
  const levelConfig = {
    easy: { cards: 6, maxMoves: 14 },
    medium: { cards: 12, maxMoves: 24 },
    hard: { cards: 18, maxMoves: 32 },
  };

  const { cards: numOfCards, maxMoves } = levelConfig[currentLevel] || levelConfig.easy;

  // Component state management
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
  const [openDialog, setOpenDialog] = useState(false); // Dialog state

  // States for the Banana API image and solution
  const [imageURL, setImageURL] = useState('');
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the authenticated user when the component mounts
  useEffect(() => {
    authContext.loadUser();
  }, []);

  // Fetch image and solution from the Banana API when the game is lost
  useEffect(() => {
    if (gameFailed) {
      const fetchBananaAPI = async () => {
        try {
          const response = await fetch('https://marcconrad.com/uob/banana/api.php');
          const data = await response.json(); 
          setImageURL(data.question);  
          setSolution(data.solution);  
        } catch (error) {
          console.error('Error fetching the Banana API data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBananaAPI();
    }
  }, [gameFailed]);

  // Toggle the active state of the game
  const updateActive = () => {
    setActive((prevActive) => !prevActive);
  };

  // Update the current number of moves and check if the maximum is exceeded
  const updateCurNumOfMoves = (count) => {
    setCurNumOfMoves(count);
    if (count >= maxMoves) {
      setGameFailed(true);
      setActive(false);
    }
  };

  // Update the details of the new game being played
  const updateNewGame = (newGame) => {
    setNewGame(newGame);
  };

  // End the game and save its details to history
  const onClickEndGame = () => {
    addNewGame({ ...newGame, numOfMoves: curNumOfMoves });
  };

  // Handle changes to the user's guess input
  const handleGuessChange = (e) => {
    setUserGuess(e.target.value);
  };

  // Handle the submission of the user's guess
  const handleGuessSubmit = () => {
    if (parseInt(userGuess) === solution) {
      setIsCorrectAnswer(true);
      setOpenDialog(true); 
    } else {
      alert('Incorrect answer, try again!');
    }
  };

  // Close the dialog and navigate to the levels page
  const handleDialogClose = () => {
    setOpenDialog(false);
    history.push('/levels'); 
  };

  // Render the game board and different UI states
  return (
    <div
      className="game-board enhanced-background"
      style={{
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      {/* Background Image with Blur Effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          zIndex: -1,
        }}
      />

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

          {/* Display fetched image from Banana API */}
          <div style={{ marginBottom: '20px' }}>
            <p>Wanna Play Again? Try to solve! Good Luck!!!:</p>
            <img
              src={loading ? 'loading.gif' : imageURL}
              alt="Case Study Question"
              style={{
                maxWidth: '80%',
                display: 'block',
                margin: '10px auto',
                border: '2px solid white',
                borderRadius: '10px',
              }}
            />
          </div>
          <div>
            <input
              type="number"
              value={userGuess}
              onChange={handleGuessChange}
              placeholder="Enter your guess"
              className="animated-input"
              style={{
                color: 'white',
              }}
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

      {/* Dialog for Correct Answer */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <p>You got the correct answer!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            Replay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Game;

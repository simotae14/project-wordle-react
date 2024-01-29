import React from 'react';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import GameOverBanner from '../GameOverBanner/GameOverBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  // running | won | lost
  const [ gameStatus, setGameStatus ] = React.useState('running');
  const [guesses, setGuesses] = React.useState([]);

  const handleSubmitGuess = (tentativeGuess) => {
    const newGuess = {
      id: crypto.randomUUID(),
      value: tentativeGuess
    };

    const nextGuesses = [...guesses, newGuess];

    setGuesses(nextGuesses);

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }
  return <>
    {
      guesses && (
        <GuessResults guesses={guesses} answer={answer} />
      )
    }
    <GuessInput handleSubmitGuess={handleSubmitGuess} gameStatus={gameStatus} />
    {
      gameStatus !== 'running' && (
        <GameOverBanner
          gameStatus={gameStatus}
          answer={answer}
          numOfGuesses={guesses.length}
        />
      )
    }
  </>;
}

export default Game;

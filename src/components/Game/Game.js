import React from 'react';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';
import Keyboard from '../Keyboard';

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

  const validatedGuesses = guesses.map((guess) =>
    checkGuess(guess, answer)
  );

  return <>
    {
      guesses && (
        <GuessResults validatedGuesses={validatedGuesses} />
      )
    }
    <GuessInput handleSubmitGuess={handleSubmitGuess} gameStatus={gameStatus} />
    <Keyboard validatedGuesses={validatedGuesses} />

    {
      gameStatus === 'won' && (
        <WonBanner
          numOfGuesses={guesses.length}
        />
      )
    }
    {
      gameStatus === 'lost' && (
        <LostBanner
          answer={answer}
        />
      )
    }
  </>;
}

export default Game;

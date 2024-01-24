import React from 'react';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);

  const handleSubmitGuess = (tentativeGuess) => {
    const newGuess = {
      id: crypto.randomUUID(),
      value: tentativeGuess
    };

    const nextGuesses = [...guesses, newGuess];

    setGuesses(nextGuesses);
  }
  return <>
    {
      guesses && (
        <GuessResults guesses={guesses} answer={answer} />
      )
    }
    <GuessInput handleSubmitGuess={handleSubmitGuess} />
  </>;
}

export default Game;

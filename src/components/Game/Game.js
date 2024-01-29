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

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS));

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

  const handleRestart = () => {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
    setGuesses([]);
    setGameStatus('running');
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
          handleRestart={handleRestart}
        />
      )
    }
    {
      gameStatus === 'lost' && (
        <LostBanner
          answer={answer}
          handleRestart={handleRestart}
        />
      )
    }
  </>;
}

export default Game;

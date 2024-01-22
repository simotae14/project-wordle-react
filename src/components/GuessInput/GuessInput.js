import React from 'react';

function GuessInput() {
  const [guessValue, setGuessValue] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    if (guessValue.length !== 5) {
      window.alert('Please enter exactly 5 characters. 💖')
      return;
    }

    console.log('Guessed value: ', {guessValue});
    setGuessValue('');
  };
  return (
    <form 
      className='guess-input-wrapper'  
      onSubmit={handleSubmit}
    >
      <label htmlFor='guess-input'>Enter guess:</label>
      <input 
        id='guess-input'
        type='text'
        value={guessValue}
        onChange={(event) => {
            const nextGuess = event.target.value.toUpperCase();
            setGuessValue(nextGuess);
          } 
        }
        required
        minLength={5}
        maxLength={5}
      />
    </form>
  );
}

export default GuessInput;

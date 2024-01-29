import React from 'react';

function GuessInput({ handleSubmitGuess, gameStatus }) {
  const [tentativeGuess, setTentativeGuess] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    if (tentativeGuess.length !== 5) {
      window.alert('Please enter exactly 5 characters. 💖')
      return;
    }

    handleSubmitGuess(tentativeGuess);
    setTentativeGuess('');
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
        value={tentativeGuess}
        onChange={(event) => {
            const nextTentativeGuess = event.target.value.toUpperCase();
            setTentativeGuess(nextTentativeGuess);
          } 
        }
        required
        disabled={gameStatus !== 'running'}
        minLength={5}
        maxLength={5}
      />
    </form>
  );
}

export default GuessInput;

import { useState } from 'react'
import './App.css';

import Notification from './components/Notification';

const EMPTY = '';
const PLAYER_X = 'X';
const PLAYER_O = 'O';

function App() {
  const [turno, setTurno] = useState(PLAYER_X);
  const [squares, setSquares] = useState(new Array(9).fill(EMPTY));
  const [disable, setDisable] = useState(false);
  const [notification, setNotification] = useState("");

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const onClick = (index) => {
    if (squares[index] !== EMPTY) {
      return;
    }

    const newSquares = squares.map((cellValue, i) => i === index ? turno : cellValue);

    const [newNotification, newDisable] = [winningPositions.map(winningPosition => [
      winningPosition.map(x => newSquares[x] === PLAYER_X).every(x => x),
      winningPosition.map(x => newSquares[x] === PLAYER_O).every(x => x)
    ]).reduce(([currentCalculatedX, currentCalculatedO], [calculatedX, calculatedO]) =>
      !currentCalculatedX && calculatedX
        ? [true, currentCalculatedO]
        : !currentCalculatedO && calculatedO
          ? [currentCalculatedX, true]
          : [currentCalculatedX, currentCalculatedO]
      , [false, false])]
      .map(([winX, winO]) => 
        winX
          ? ['Ganaste X', true]
          : winO
            ? ['Ganaste O', true]
            : newSquares.filter(x => x === EMPTY).length === 0
              ? ['Empate', true]
              : [notification, disable]
      ).flatMap(x => x);

    const newTurno = turno === PLAYER_X ? PLAYER_O : PLAYER_X;

    setTurno(newTurno)
    setSquares(newSquares)
    setNotification(newNotification);
    setDisable(newDisable);
  }

  return (
    <div className='juego'>
      <h1>TATETI</h1>

      <div className='fila'>
        <div>
          <button disabled={disable} onClick={() => onClick(0)}>{squares[0]}</button>
          <button disabled={disable} onClick={() => onClick(1)}>{squares[1]}</button>
          <button disabled={disable} onClick={() => onClick(2)}>{squares[2]}</button>
        </div>
        <div>
          <button disabled={disable} onClick={() => onClick(3)}>{squares[3]}</button>
          <button disabled={disable} onClick={() => onClick(4)}>{squares[4]}</button>
          <button disabled={disable} onClick={() => onClick(5)}>{squares[5]}</button>
        </div>
        <div>
          <button disabled={disable} onClick={() => onClick(6)}>{squares[6]}</button>
          <button disabled={disable} onClick={() => onClick(7)}>{squares[7]}</button>
          <button disabled={disable} onClick={() => onClick(8)}>{squares[8]}</button>
        </div>
      </div>


      <Notification
        nota={notification}
      />
    </div>
  );
}

export default App;
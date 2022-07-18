import { useState } from 'react'
import './App.css';

import Notification from './components/Notification';

const EMPTY = '';
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const tateti = [[0,1,2],[3,4,5],[6,7,8]]

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
      {tateti.map((a,index) => {
      return(
        <div>{
          a.map((b,sindex) =>{
            return(
              <button disabled={disable} onClick={() => onClick(b)}>{squares[b]}</button>
            )
          })}
        </div>
        )
      })}
      </div>


      <Notification
        nota={notification}
      />
    </div>
  );
}

export default App;

import { toBeInTheDOM, toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
import { useState } from 'react'
import './App.css';

import Notification from './components/Notification';

function App() {
  const [turno,setTurno] = useState ("x");
  const [square,setSquare] = useState(["","","","","","","","",""]);
  const [disable, setDisable] = useState(false);
  const [notification, setNotification] = useState("Buenos dias");
  
  

  const rules2Win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  
  const onClick = (index) =>{
    
    const arraySquares = square.map((a,i) => i === index ? turno : a)
    
    setTurno(turno==="x" ? "o" : "x")

    setSquare(arraySquares)

    console.log(arraySquares)

    const verificarX = arraySquares.map(squere => {
      return(squere === "x")
    })

    const verificarO = arraySquares.map(squere => {
      return(squere === "o")
    })
    
    rules2Win.forEach((rules)=>{
        let verificadoX = []
        let verificadoO = []

        rules.forEach((index)=>{
            verificadoX.push(verificarX[index])
            verificadoO.push(verificarO[index])
        })

        let ganoX = verificadoX.reduce((acc,red)=>{
              if( acc === false ) return false 
              if (red === true ) return acc = true
              else return acc = false 
        })

        let ganoO = verificadoO.reduce((acc,red)=>{
              if( acc === false ) return false 
              if (red === true ) return acc = true
              else return acc = false 
        })
        
        if(ganoX) {
          setNotification("ganaste X")
          setDisable(true)
        }
        if(ganoO) {
          setNotification("ganaste O")
          setDisable(true)
        }

        console.log(square.includes(""))
        
        if( square.filter(i => i === "").length <= 1 && !disable) {
          setNotification("empate")
          setDisable(true)

        }
          


        
    })

  }
  const mensaje = notification
  return (
    <div className='juego'>
      <h1>TATETI</h1>


      <div className='fila'>
        <div>
          <button disabled={disable} onClick={() => onClick(0)}>{square[0]}</button>
          <button disabled={disable} onClick={() => onClick(1)}>{square[1]}</button>
          <button disabled={disable} onClick={() => onClick(2)}>{square[2]}</button>
        </div>
        <div>
          <button disabled={disable} onClick={() => onClick(3)}>{square[3]}</button>
          <button disabled={disable} onClick={() => onClick(4)}>{square[4]}</button>
          <button disabled={disable} onClick={() => onClick(5)}>{square[5]}</button>
        </div>
        <div>
          <button disabled={disable} onClick={() => onClick(6)}>{square[6]}</button>
          <button disabled={disable} onClick={() => onClick(7)}>{square[7]}</button>
          <button disabled={disable} onClick={() => onClick(8)}>{square[8]}</button>
        </div>
      </div>
      

      <Notification 
        nota={notification}
      
      />
    </div>
  );
}

export default App;

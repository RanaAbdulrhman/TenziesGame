import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = useState(() => allNewDice());
  const [winState, setWinState] = useState(false);
  useEffect( () => {
      const allEqual = dice.every(element => element.value === dice[0].value);
      const allHeld = dice.every(element => element.isHeld === true);

      if (allEqual && allHeld ){
        setWinState(true);
        console.log("You won!!")
      }
    }
  , [dice])

  function restartGame(){
    if(winState){
      setWinState(false);
      setDice(allNewDice());
    }
  }
  function allNewDice(){
    const array = [...Array(10)]
      .map(element => ({
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
      }) ); 
    return array;
  }
  function rollDice(){
    setDice(prevDice => prevDice.map(oldDice => 
      { 
        if(oldDice.isHeld === false){
          return {
            ...oldDice,
            value: Math.ceil(Math.random()*6),
          }
        }
        else{
          return oldDice;
        }
      }
    ))
  }
  function flipHeld(key){
    setDice(prevDice => prevDice.map(oldDice => 
      { 
        if(oldDice.id === key){
          return {
            ...oldDice,
            isHeld: !oldDice.isHeld
          }
        }
        else{
          return oldDice;
        }
      }
    ))
  }
  const diceElements = dice.map(element => <Die flipHeld ={() => flipHeld(element.id)} key={element.id} value={element.value} isHeld={element.isHeld}/>)

  return (
    <div className='bg-[#0B2434] w-screen h-screen flex items-center justify-center'>
         {winState? <Confetti/>: ""} 
      <div className='bg-white aspect-square h-1/2 rounded-xl p-14 flex flex-col gap-10 items-center justify-center'>
          <div>
            <h1 className='text-2xl font-bold mb-1'>Tenzies</h1>
            <p className='text-sm text-[#4A4E74]'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
          <div className='grid grid-cols-5 items-center justify-around gap-3 w-full'>
              {diceElements}
          </div>
          <button className='bg-[#5035FF] rounded-lg w-2/3 py-2 text-lg font-bold text-white' onClick={winState?restartGame : rollDice}>{winState? "New Game": "Roll"}</button>
          
      </div>
    </div>
  )
}

export default App

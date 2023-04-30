import { useEffect, useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './components/Die'

function App() {
  const [dice, setDice] = useState(() => allNewDice());
  const [numRolls, setNumRolls] = useState(0);
  const [time, setTime] = useState(0);
  const [winState, setWinState] = useState(false);
  const [bestRecord, setBestRecord] = useState({numRolls: 100000, time: 0});
  useEffect( () => {
      const allEqual = dice.every(element => element.value === dice[0].value);
      const allHeld = dice.every(element => element.isHeld === true);

      if (allEqual && allHeld ){
        setWinState(true);
        console.log("You won!!")
      }
    }
  , [dice])
  useEffect(() => {
    console.log(bestRecord);
  }, [bestRecord])
  useEffect(() => {
    let interval;
    if (!winState) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 1000);
    } else if (winState) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [winState]);

  // function formatTime(time) {
  //   const minutes = Math.floor(time / 60000);
  //   const seconds = ((time % 60000) / 1000).toFixed(0);
  //   return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
  // }
  
  function restartGame(){
    if(winState){
      setWinState(false);
      setBestRecord(prevRecord => changeBestRecord(prevRecord))
      setDice(allNewDice());
      resetValues();
    }
  }
  function resetValues(){
    setTime(0);
    setNumRolls(0);
  }
  function changeBestRecord(prevRecord){
      console.log(`previous record: ${JSON.stringify(prevRecord)}`)
      const currentRecord = {
        numRolls: numRolls,
        time: time
      };
      if( bestRecord.numRolls < currentRecord.numRolls){
        currentRecord.numRolls = bestRecord.numRolls;
      } 
      if(bestRecord.time > bestRecord.time){
        currentRecord.time = bestRecord.time;
      }
      console.log(`Alterd record: ${JSON.stringify(currentRecord)}`);
      localStorage.setItem("bestRecord", JSON.stringify(currentRecord))
      return currentRecord;
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
    setNumRolls(preNumRolls => preNumRolls + 1 )
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
      <div className='bg-white aspect-square h-2/3 rounded-xl p-14 flex flex-col gap-4 items-center justify-center'>
          <div>
            <h1 className='text-2xl font-bold mb-1'>Tenzies</h1>
            <p className='text-sm text-[#4A4E74]'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
          <div className='flex gap-5 items-baseline'>
            <div className=' bg-slate-500 text-white py-1 px-2 rounded-md text-sm'>Rolls: {numRolls}</div>
            <div className=' bg-slate-500 text-white py-1 px-2 rounded-md text-sm'>Timer: <span>{(`0${Math.floor((time / 1000) % 60)}`).slice(-2)}:</span><span>{(`0${((time / 10) % 100)}`).slice(-2)}</span> </div>
          </div>
          <div className='grid grid-cols-5 items-center justify-between gap-3 w-10/12 mt-5'>
              {diceElements}
          </div>
          <button className='bg-[#5035FF] rounded-lg w-2/3 py-2 text-lg font-bold text-white mt-7' onClick={winState?restartGame : rollDice}>{winState? "New Game": "Roll"}</button>
          <div className='flex gap-5 items-baseline mt-8'>
            {bestRecord.numRolls !== 100000?
            <div className='bg-yellow-500 text-white py-1 px-2 rounded-md text-sm'>
              Best Rolls: {bestRecord.numRolls}
            </div>: 
            ""}
            {bestRecord.time?
            <div className='bg-yellow-500 text-white py-1 px-2 rounded-md text-sm'>
              Best Time: <span>{(`0${Math.floor((bestRecord.time / 1000) % 60)}`).slice(-2)}:</span><span>{(`0${((bestRecord.time / 10) % 100)}`).slice(-2)}</span> 
            </div>: 
            ""}
          </div>
      </div>
    </div>
  )
}

export default App

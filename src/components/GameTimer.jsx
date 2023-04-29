import { useEffect, useState } from 'react'

export default function Timer({winState}){
  const [time, setTime] = useState(0);
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
  return (
      <>
        <span>{(`0${Math.floor((time / 1000) % 60)}`).slice(-2)}:</span>
        <span>{(`0${((time / 10) % 100)}`).slice(-2)}</span>
      </>
  );
}
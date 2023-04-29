export default function Die({value, isHeld, flipHeld}){

  const dots = () =>[...Array(value)].map( elem => <span className="dot block w-2 h-2 rounded-full bg-black" />);

  return (
    <button onClick={flipHeld} className={`${value > 3 ? "flex justify-center items-center ": ""} w-12 h-12 px-3 rounded-lg box-shadow ${isHeld? "bg-[#59E391]": ""}`}>
      <div className={`dice dice-${value}`}>
        {dots()}
      </div>
    </button>
  )
}
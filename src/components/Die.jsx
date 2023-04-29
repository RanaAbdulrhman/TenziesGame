export default function Die({value, isHeld, flipHeld}){
  return (
    <button onClick={flipHeld} className={`w-12 p-3 rounded-lg box-shadow font-bold text-xl cursor-pointer ${isHeld? "bg-[#59E391]": ""}`}>
      {value}
    </button>
  )
}
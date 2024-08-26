import React from "react"

export default function Square({index, boardState, X, setBoardState, setX, checkWinner, finished}) {
  
  const updateValueAndSquare = () => {
    if (finished) {
      return;
    }
    const tempState = boardState;
    if(X) {
      tempState[index] = "X"
    } else {
      tempState[index] = "O"
    }
    const tempTurn = X;
    setBoardState(tempState)
    setX(!tempTurn)
    checkWinner();
  }

  return (
    <div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold size-40 rounded text-xl	" onClick={updateValueAndSquare}>
      {boardState[index] === 0 ? "_" : boardState[index]}
    </button>
    </div>
  )
}

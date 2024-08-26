import './App.css';
import Square from './components/square';
import React, {useState, useEffect} from "react"

function App() {
  const [boardState, setBoardState] = useState([0,0,0,0,0,0,0,0,0]);
  const [X, setX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  // Update the game if there's a win or a tie
  useEffect(() => {
    if(winner || tie) {
      setGameFinished(true);
    }
  },[tie, winner])

  // Reset the game if necessary
  useEffect(() => {
    if (gameFinished === false) {
      setX(true);
      setWinner(null);
      setTie(false);
      setBoardState([0,0,0,0,0,0,0,0,0]);
    }
  },[gameFinished])


  function checkWinner() {
    console.log("checked winner")
    // Quick and Dirty
    let checkSet = new Set();

    function checkSetWinner() {
      if(winner || tie) {
        return;
      }
      console.log('checking set', checkSet)
      const checkSetArr = [...checkSet]
      console.log(checkSetArr)
      if(checkSetArr.length === 1 && checkSetArr[0] !== 0) {
        // set winner 
        console.log('setting winner')
        setWinner(checkSetArr[0]);
        console.log('winner', winner)
        return;
      }
      // clear set
      checkSet.clear();
    }

    //rows
    checkSet = new Set([boardState[0], boardState[1], boardState[2]]);
    checkSetWinner();

    checkSet = new Set([boardState[3], boardState[4], boardState[5]]);
    checkSetWinner();

    checkSet = new Set([boardState[6], boardState[7], boardState[8]]);
    checkSetWinner();

    //cols
    checkSet = new Set([boardState[0], boardState[3], boardState[6]]);
    checkSetWinner();

    checkSet = new Set([boardState[1], boardState[4], boardState[7]]);
    checkSetWinner();

    checkSet = new Set([boardState[2], boardState[5], boardState[8]]);
    checkSetWinner();

    //diags
    checkSet = new Set([boardState[0], boardState[4], boardState[8]]);
    checkSetWinner();

    checkSet = new Set([boardState[2], boardState[4], boardState[6]]);
    checkSetWinner();

    // checked winners, check for a tie
    if(!winner) {
      let fullBoard = noNulls(boardState);
      setTie(fullBoard);
    }
  }

  function resetGame() {
    setGameFinished(false);
  }

  return (

      <body style={{height: "100vh", backgroundColor: "black"}}>
      <header style={{color: "white", textAlign: "center"}}>TIC TAC TOE</header>
      <h2 style={{color: "white", textAlign: "center"}}>{X ? <>current player: X</> : <>current player: O</>}</h2>
        <div class = "grid grid-cols-3  gap-4  place-content-center	justify-items-center">
            <Square index={0} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={1} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={2} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={3} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={4} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={5} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={6} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={7} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
            <Square index={8} boardState = {boardState}  X={X} setBoardState={setBoardState} setX={setX} checkWinner={checkWinner} finished={gameFinished}/>
      </div>
      {tie && gameFinished ? <h2 style={{color: "white", textAlign: "center"}}>TIE GAME</h2> : <></>}
      {winner && gameFinished ? <h2 style={{color: "white", textAlign: "center"}}>Winner is {winner}</h2> : <></>}
      {gameFinished ? <ResetButton class="bg-blue-500 hover:bg-blue-700 text-white font-bold size-40 place-content-center	justify-items-center" rounded reset = {resetGame}/>: <></>}
      </body>
  )
}

function ResetButton({reset}) {
  return (
    <div style={{textAlign: "center"}}>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-30 h-30" onClick={reset}>
      RESET GAME
    </button>
    </div>
  )
}

function noNulls(arr){
  let nullFound = true;

  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === 0) {
      nullFound = false;
    }
  }

  return nullFound;
}


export default App;

import { useState } from "react"
import Board from "./Board.jsx"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [position, setPosition] = useState([Array(2).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, i) {
    const row = i % 3;
    const col = Math.floor(i / 3);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextPosition = [...position.slice(0, currentMove + 1), [row, col]];
    setPosition(nextPosition);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = position.map((position, move) => {
    let discription = move > 0 ? 'Go to move #'+move + ' Position: (' + position + ')': 'Go to game start';
    return (
      <li key={move}>
        {move === currentMove ? (
          <>You are at move: {move} </>
        ) : (
          <button onClick={() => jumpTo(move)}>{discription}</button>
        )}
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

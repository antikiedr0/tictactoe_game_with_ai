import { useState } from "react";
import "./App.css";

function App() {
  const player: string[] = ["O", "X"];
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [turn, setTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  /**
   * 0|1|2
   * 3|4|5    <- this is the board
   * 6|7|8
   */

  const winStates: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function tableCellOnClick(idx: number): void {
    if (idx > 8 || board[idx] !== "" || gameOver) return;

    setBoard((prevBoard) => {
      const nextBoard = [...prevBoard];
      nextBoard[idx] = player[turn % 2];

      if (checkIfConcluded(nextBoard)) {
        endGame(nextBoard[idx]);
      }

      return nextBoard;
    });

    setTurn((prevTurn) => prevTurn + 1);
  }

  function checkIfConcluded(boardToCheck: string[]): boolean {
    if (!boardToCheck.includes("")) {
      setWinner("");
      return true;
    }
    for (const arr of winStates) {
      if (
        boardToCheck[arr[0]] !== "" &&
        boardToCheck[arr[0]] === boardToCheck[arr[1]] &&
        boardToCheck[arr[1]] === boardToCheck[arr[2]]
      ) {
        return true;
      }
    }
    return false;
  }

  function endGame(currentWinner: string): void {
    setGameOver(true);
    setWinner(currentWinner);
  }

  function onClickResetBoardButton(): void {
    setBoard(Array(9).fill(""));
    setGameOver(false);
  }

  return (
    <div className="main-body">
      <div className="game-name-row">
        <p
          className={`game-name-label-nought ${winner === "O" ? "winner-label" : ""}`}
        >
          Noughts
        </p>
        <p className="game-name-label">and</p>
        <p
          className={`game-name-label-cross ${winner === "X" ? "winner-label" : ""}`}
        >
          Crosses
        </p>
      </div>
      <div className={`game-grid ${gameOver ? "game-over" : ""}`}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            disabled={cell !== "" || gameOver}
            className={`game-button ${cell === "X" ? "cell-x" : cell === "O" ? "cell-o" : ""} `}
            onClick={() => tableCellOnClick(idx)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className="reset-board-button"
        onClick={() => onClickResetBoardButton()}
      >
        Reset
      </button>
    </div>
  );
}
export default App;

import { useState } from "react";
import "./App.css";
import { minimax } from "./minimax";

const initialBoard: (string | null)[] = Array(9).fill(null);

function App() {
  const [result, setResult] = useState("");
  const [X_Wins, setXWins] = useState(0);
  const [O_Wins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [board, setBoard] = useState<(string | null)[]>([...initialBoard]);
  const [turn, setTurn] = useState("X");
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

  const resetBoard = () => {
    setBoard([...initialBoard]);
    setTurn("X");
    setGameOver(false);
    setWinner("");
    setResult("");
  };

  const checkWinner = (boardToCheck: (string | null)[]): string => {
    for (const [a, b, c] of winStates) {
      if (
        boardToCheck[a] !== null &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c]
      ) {
        return boardToCheck[a]!;
      }
    }
    return "";
  };

  const isBoardFull = (boardToCheck: (string | null)[]) => {
    return boardToCheck.every((cell) => cell !== null);
  };

  const handleGameEnd = (winnerMark: string) => {
    if (winnerMark === "X") {
      setResult("Winner is X player");
      setXWins((prev) => prev + 1);
    } else if (winnerMark === "O") {
      setResult("Winner is O player");
      setOWins((prev) => prev + 1);
    } else {
      setResult("It's a draw, gg");
      setDraws((prev) => prev + 1);
    }

    setWinner(winnerMark);
    setGameOver(true);
  };

  const make_move = (index: number) => {
    if (gameOver || board[index] !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = turn;

    const winnerMark = checkWinner(nextBoard);
    const boardIsFull = isBoardFull(nextBoard);

    setBoard(nextBoard);

    if (winnerMark) {
      handleGameEnd(winnerMark);
      return;
    }

    if (boardIsFull) {
      handleGameEnd("");
      return;
    }

    setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
  };

  const handleBestMove = () => {
    if (gameOver) return;

    let bestScore = -Infinity;
    let move = -1;
    const currentMark = turn;
    const opponentMark = turn === "X" ? "O" : "X";

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const tempBoard = [...board];
        tempBoard[i] = currentMark;
        const score = minimax(tempBoard, false, currentMark, opponentMark);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== -1) {
      make_move(move);
    }
  };

  return (
    <div className="main-body">
      {/* Header with title */}
      <div className="header">
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
      </div>

      {/* Main content container */}
      <div className="content-container">
        {/* Left side: Game grid and buttons */}
        <div className="left-section">
          <div className={`game-grid ${gameOver ? "game-over" : ""}`}>
            {board.map((cell, idx) => (
              <button
                key={idx}
                disabled={cell !== null || gameOver}
                className={`game-button ${cell === "X" ? "cell-x" : cell === "O" ? "cell-o" : ""}`}
                onClick={() => make_move(idx)}
              >
                {cell}
              </button>
            ))}
          </div>
          <div className="button-group">
            <button
              className="action-button reset-board-button"
              onClick={resetBoard}
            >
              Reset Board
            </button>
            <button
              className="action-button best-move-button"
              onClick={handleBestMove}
              disabled={gameOver}
            >
              Make Best Move
            </button>
          </div>
        </div>

        {/* Right side: Scoreboard and turn indicator */}
        <div className="right-section">
          <div className="right-panel">
            <div className="turn-indicator">
              <h2>Current Turn</h2>
              <div
                className={`turn-display ${turn === "X" ? "turn-x" : "turn-o"}`}
              >
                {turn}
              </div>
            </div>

            <div className="scoreboard">
              <h2>Scoreboard</h2>
              <div className="score-item">
                <span className="score-label">X Wins:</span>
                <span className="score-value score-x">{X_Wins}</span>
              </div>
              <div className="score-item">
                <span className="score-label">O Wins:</span>
                <span className="score-value score-o">{O_Wins}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Draws:</span>
                <span className="score-value">{draws}</span>
              </div>
            </div>
          </div>

          {gameOver && (
            <div className="game-result">
              <h3>{result}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

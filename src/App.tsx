import { useState } from 'react'
import './App.css'

function App() {

  let arr = Array(9).fill(null);
  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState(arr);
  const [result, setResult] = useState("")

  const [X_Wins, setXWins] = useState(0);
  const [O_Wins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  let results = (winner:string) =>{55
    if (winner == "X"){
      setResult("Winner is X player")
      setBoard(arr)
      setXWins(prev => prev + 1)
    }else if(winner == "O"){
      setResult("Winner is O player")
      setBoard(arr)
      setOWins(prev => prev +1)
    }else if(winner == "none"){
      setResult("It's a draw, gg")
      setBoard(arr);
      setDraws(prev => prev + 1)
    }
  } 
  let x = () => {
    if(turn == "X"){
      setTurn("O");
    }else{
      setTurn("X");
    }
  } 
  const check_the_winner = () =>{
    let win = ""
    let i = 0
    // na wzdłórz
    if(board[i] == "X" && board[i + 1] == "X" && board[i + 2] == "X"){
      win = "X"
    }
    if(board[i+3] == "X" && board[i + 4] == "X" && board[i + 5] == "X"){
      win = "X"
    }
    if(board[i + 6] == "X" && board[i + 7] == "X" && board[i + 8] == "X"){
      win = "X"
    }
    if(board[i] == "O" && board[i + 1] == "O" && board[i + 2] == "O"){
      win = "O"
    }
    if(board[i+3] == "O" && board[i + 4] == "O" && board[i + 5] == "O"){
      win = "O"
    }
    if(board[i + 6] == "O" && board[i + 7] == "O" && board[i + 8] == "O"){
      win = "O"
    }
    // na ukos
    if(board[i] == "X" && board[i+4] == "X" && board[i+8] == "X"){
      win = "X";
    }
    if(board[i+2] == "X" && board[i+4] == "X" && board[i+6] == "X"){
      win = "X";
    }
    if(board[i] == "O" && board[i+4] == "O" && board[i+8] == "O"){
      win = "O";
    }
    if(board[i+2] == "O" && board[i+4] == "O" && board[i+6] == "O"){
      win = "O";
    }
    // w poprzek 
    if(board[i] == "X" && board[i + 3] == "X" && board[i + 6] == "X"){
      win = "X"
    }
    if(board[i+1] == "X" && board[i + 4] == "X" && board[i + 7] == "X"){
      win = "X"
    }
    if(board[i + 2] == "X" && board[i + 5] == "X" && board[i + 8] == "X"){
      win = "X"
    }
    if(board[i] == "O" && board[i + 3] == "O" && board[i + 6] == "O"){
      win = "O"
    }
    if(board[i+1] == "O" && board[i + 4] == "O" && board[i + 7] == "O"){
      win = "O"
    }
    if(board[i + 2] == "O" && board[i + 5] == "O" && board[i + 8] == "O"){
      win = "O"
    }
    return win;
    
  }

  const make_move = (index) => {
    
    let end = 0;
    let win = "";
    if(board[index]) return;

    const newBoard = board
    newBoard[index] = turn;

    setBoard(newBoard)
    setTurn(turn === "X" ? "O" :"X")
  
    end = check_result()
    win = check_the_winner()
    if(win == "X"){
      results("X")
    }
    if(win == "O"){
      results("O")
    }
    if(end == 1 && win == ""){
      results("none")
    }
  }
  const check_result = () => {
    let full = 0;
    for(let i = 0; i < 9; i++){
      if(board[i] != null){
        full += 1
    }}
    if(full < 9){
      return 0;
    }
    else{
      return 1;
    } 
  }   
  
  return (
    <div className="center">
      <p>
        <h1>Move for {turn}</h1>

      </p>
      
      
      <br></br>
      <table>
      <tbody>
          <tr>
            <td onClick={() => make_move(0)}>{board[0]}</td>
            <td onClick={() => make_move(1)}>{board[1]}</td>
            <td onClick={() => make_move(2)}>{board[2]}</td>
          </tr>
          <tr>
            <td onClick={() => make_move(3)}>{board[3]}</td>
            <td onClick={() => make_move(4)}>{board[4]}</td>
            <td onClick={() => make_move(5)}>{board[5]}</td>
          </tr>
          <tr>
            <td onClick={() => make_move(6)}>{board[6]}</td>
            <td onClick={() => make_move(7)}>{board[7]}</td>
            <td onClick={() => make_move(8)}>{board[8]}</td>
          </tr>
        </tbody>
      </table>
      <span>
        <h2>
          {result}
        </h2>
      </span>
      <h3>Winners Board:</h3>
      <ul>
        <li>X player: {X_Wins}</li>
        <li>O player: {O_Wins} </li>
        <li>Draws: {draws} </li>
      </ul>
    </div>
  )

  
}

export default App

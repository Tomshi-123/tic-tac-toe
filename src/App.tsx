import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import ResetButton from "./components/ResetButton";

function App() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerIndexes, setWinnerIndexes] = useState<number[] | null>(null);

  const checkWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], indexes: line };
      }
    }
    return null;
  };

  const handleClick = (idx: number) => {
    if (winner || board[idx]) return;
    const newBoard = [...board];
    newBoard[idx] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinnerIndexes(result.indexes);
    } else if (!newBoard.includes(null)) {
      setWinner("Oavgjort");
      setWinnerIndexes(null);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinnerIndexes(null);
  };

  return (
    <div
      className="container py-5"
      style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center"
      }}
    >
      <h1 className="mb-4" style={{ color: "#6ae3ff", textShadow: "0 0 12px #6ae3ff88" }}>
        Tic-Tac-Toe
      </h1>
      <ResetButton onReset={resetGame} />
      <Board
        board={board}
        onSquareClick={handleClick}
        winner={winner}
        winnerIndexes={winnerIndexes}
      />
      <GameInfo winner={winner} isXNext={isXNext} />
    </div>
  );
}

export default App;

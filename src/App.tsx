import { useState } from 'react';
import './App.css';

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
    newBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinnerIndexes(result.indexes);
    } else if (!newBoard.includes(null)) {
      setWinner('Oavgjort');
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
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        justifyContent: 'center'
      }}
    >
      <h1 className="mb-4" style={{ color: '#6ae3ff', textShadow: '0 0 12px #6ae3ff88' }}>Tic-Tac-Toe</h1>
      <button
        className="btn btn-outline-info mb-4"
        style={{ fontSize: '1.1rem', borderRadius: '8px', padding: '8px 24px', color: '#6ae3ff', borderColor: '#6ae3ff' }}
        onClick={resetGame}
      >
        Starta om spelet
      </button>
      <div className="d-flex justify-content-center">
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: 'repeat(3, 80px)',
            gap: '18px'
          }}
        >
          {board.map((cell, idx) => (
            <button
              key={idx}
              className={`btn shadow-sm${winnerIndexes && winnerIndexes.includes(idx) ? ' blink' : ''}`}
              style={{
                width: '80px',
                height: '80px',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff',
                borderRadius: '12px',
                color: cell === 'X' ? '#6ae3ff' : '#ffe066',
                background: '#172554',
                boxShadow: '0 2px 12px #000a, 0 0 8px #6ae3ff44',
                transition: 'background 0.2s'
              }}
              onClick={() => handleClick(idx)}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 fs-5">
        {winner
          ? winner === 'Oavgjort'
            ? <span className="text-secondary">Oavgjort!</span>
            : <span style={{ color: winner === 'X' ? '#6ae3ff' : '#ffe066', textShadow: '0 0 8px #fff' }}>Vinnare: {winner}</span>
          : <><span style={{ color: '#ffffff' }}>Nästa spelare: </span><span style={{ color: isXNext ? '#6ae3ff' : '#ffe066' }}>{isXNext ? 'X' : 'O'}</span></>
        }
      </p>
    </div>
  );
}

export default App;
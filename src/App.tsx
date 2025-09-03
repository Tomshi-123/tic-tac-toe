import React, { useState } from 'react'; // Importerar React och useState-hooken för att hantera state
import './App.css'; // Importerar grundläggande CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Importerar Bootstrap för snyggare standardstilar

function App() { // Definierar huvudkomponenten för spelet

  // State: En array med 9 platser (en för varje ruta), alla börjar som null (tomma)
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  // State: true om det är X:s tur, false om det är O:s tur
  const [isXNext, setIsXNext] = useState(true);
  // State: Vinnare, null om ingen vunnit än
  const [winner, setWinner] = useState<string | null>(null);

  // Funktion som kontrollerar om någon har vunnit
  const checkWinner = (squares: Array<string | null>) => {
    // Alla möjliga vinstkombinationer (rader, kolumner, diagonaler)
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rader
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolumner
      [0, 4, 8], [2, 4, 6]             // diagonaler
    ];
    // Gå igenom varje vinstkombination
    for (let line of lines) {
      const [a, b, c] = line;
      // Om alla tre rutor är lika och inte tomma, returnera vinnaren
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    // Ingen vinnare hittad
    return null;
  };

  // Funktion som körs när användaren klickar på en ruta
  const handleClick = (idx: number) => {
    // Om det redan finns en vinnare eller rutan är upptagen, gör inget
    if (winner || board[idx]) return;

    // Kopiera brädet för att inte ändra state direkt
    const newBoard = [...board];
    // Sätt X eller O beroende på vems tur det är
    newBoard[idx] = isXNext ? 'X' : 'O';
    // Uppdatera brädet
    setBoard(newBoard);

    // Kolla om någon har vunnit efter draget
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win); // Sätt vinnaren
    } else if (!newBoard.includes(null)) {
      setWinner('Oavgjort'); // Om brädet är fullt och ingen vunnit: oavgjort
    } else {
      setIsXNext(!isXNext); // Växla spelare om ingen vunnit
    }
  };

  // Funktion för att starta om spelet
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Tömmer brädet
    setIsXNext(true); // X börjar alltid
    setWinner(null); // Ingen vinnare i början
  };

  return (
    <div className="container py-5"> {/* Yttre wrapper med Bootstrap-padding */}
      <h1 className="mb-4 text-primary">Tic-Tac-Toe</h1> {/* Rubrik med Bootstrap-färg */}
      <button
        className="btn btn-outline-primary mb-4"
        style={{ fontSize: '1.1rem', borderRadius: '8px', padding: '8px 24px' }}
        onClick={resetGame}
      >
        Starta om spelet
      </button> {/* Knapp för att starta om spelet */}
      <div className="d-flex justify-content-center"> {/* Centrerar brädet horisontellt */}
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: 'repeat(3, 80px)', // Tre kolumner, 80px breda
            gap: '18px' // Avstånd mellan rutorna
          }}
        >
          {board.map((cell, idx) => (
            <button
              key={idx} // Unik nyckel för varje ruta
              className="btn btn-light shadow-sm"
              style={{
                width: '80px', // Storlek på ruta
                height: '80px',
                fontSize: '2.5rem', // Stor text för X/O
                fontWeight: 'bold',
                display: 'flex', // Flex för att centrera innehållet
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #0d6efd', // Blå kant
                borderRadius: '12px',
                color: cell === 'X' ? '#0d6efd' : '#dc3545', // Färg: blå för X, röd för O
                transition: 'background 0.2s'
              }}
              onClick={() => handleClick(idx)} // Hanterar klick på ruta
              disabled={!!cell || !!winner} // Inaktivera om rutan är upptagen eller spelet är slut
            >
              {cell} {/* Visar X, O eller tomt */}
            </button>
          ))}
        </div>
      </div>
      {/* Visar statusmeddelande under brädet */}
      <p className="mt-4 fs-5">
        {winner
          ? winner === 'Oavgjort'
            ? <span className="text-secondary">Oavgjort!</span>
            : <span className={winner === 'X' ? "text-primary" : "text-danger"}>Vinnare: {winner}</span>
          : <>Nästa spelare: <span className={isXNext ? "text-primary" : "text-danger"}>{isXNext ? 'X' : 'O'}</span></>
        }
      </p>
    </div>
  );
}

export default App; // Exporterar App-komponenten så att den kan användas i projektet

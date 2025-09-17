import Square from "./Square";

type BoardProps = {
    board: Array<string | null>;
    onSquareClick: (idx: number) => void;
    winner: string | null;
    winnerIndexes: number[] | null;
};

export default function Board({ board, onSquareClick, winner, winnerIndexes }: BoardProps) {
    return (
    <div className="d-grid" style={{ gridTemplateColumns: 'repeat(3, 80px)', gap: '18px' }}>
        {board.map((cell, idx) => (
        <Square
            key={idx}
            value={cell}
            onClick={() => onSquareClick(idx)}
            isWinning={!!winnerIndexes?.includes(idx)}
            disabled={!!cell || !!winner}
        />
        ))}
    </div>
    );
}

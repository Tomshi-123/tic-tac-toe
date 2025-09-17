type GameInfoProps = {
  winner: string | null;
  isXNext: boolean;
};

export default function GameInfo({ winner, isXNext }: GameInfoProps) {
  return (
    <p className="mt-4 fs-5">
      {winner
        ? winner === 'Oavgjort'
          ? <span className="text-secondary">Oavgjort!</span>
          : <span style={{ color: winner === 'X' ? '#6ae3ff' : '#ffe066', textShadow: '0 0 8px #fff' }}>Vinnare: {winner}</span>
        : <>
            <span style={{ color: '#ffffff' }}>Nästa spelare: </span>
            <span style={{ color: isXNext ? '#6ae3ff' : '#ffe066' }}>{isXNext ? 'X' : 'O'}</span>
          </>
      }
    </p>
  );
}

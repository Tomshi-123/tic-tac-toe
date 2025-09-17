type SquareProps = {
  value: string | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
};

export default function Square({ value, onClick, isWinning, disabled }: SquareProps) {
  return (
    <button
      className={`btn shadow-sm${isWinning ? ' blink' : ''}`}
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
        color: value === 'X' ? '#6ae3ff' : '#ffe066',
        background: '#172554',
        boxShadow: '0 2px 12px #000a, 0 0 8px #6ae3ff44',
        transition: 'background 0.2s'
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

type ResetButtonProps = {
  onReset: () => void;
};

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      className="btn btn-outline-info mb-4"
      style={{ fontSize: '1.1rem', borderRadius: '8px', padding: '8px 24px', color: '#6ae3ff', borderColor: '#6ae3ff' }}
      onClick={onReset}
    >
      Starta om spelet
    </button>
  );
}

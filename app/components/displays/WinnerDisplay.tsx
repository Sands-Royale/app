type WinnerDisplayProps = {
  winner: string | null;
};

export default function WinnerDisplay({ winner }: WinnerDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl mb-6 border border-cyan-500/30">
      <p className="font-bold mb-2 text-cyan-400">Latest Winner</p>
      <p className="text-pink-400">{winner ? winner : "No winner yet"}</p>
    </div>
  );
}

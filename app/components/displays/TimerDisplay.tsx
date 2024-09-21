interface TimerDisplayProps {
  time: { hours: number; minutes: number; secs: number };
}

export default function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl mb-6 border border-cyan-500/30">
      <div className="flex justify-center space-x-2 text-pink-400 text-2xl">
        <span>{time.hours.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{time.minutes.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{time.secs.toString().padStart(2, "0")}</span>
      </div>
      <div className="flex justify-center space-x-4 text-xs text-cyan-400 mt-1">
        <span>HRS</span>
        <span>MIN</span>
        <span>SEC</span>
      </div>
    </div>
  );
}

import { formattedJackpotSize } from "@/app/helpers/utils";

type JackpotDisplayProps = {
  jackpotSize: number;
};

export default function JackpotDisplay({ jackpotSize }: JackpotDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl mb-6 border border-cyan-500/30">
      <p className="text-cyan-400 text-5xl font-bold text-center mb-2">
        {`${formattedJackpotSize(jackpotSize)} USDC`}
      </p>
    </div>
  );
}

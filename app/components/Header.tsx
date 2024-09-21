import { MARINA_SANDS_JACKPOT } from "../helpers/constants";

export default function Header() {
  return (
    <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
      {MARINA_SANDS_JACKPOT.toUpperCase()} 💰💰💰
    </h1>
  );
}

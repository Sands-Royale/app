import { useState } from "react";

type LiquidityProviderProps = {
  handleProvideLiquidity: (amount: number) => Promise<void>;
  handleWithdrawLiquidity: (amount: number) => Promise<void>;
  buttonClass: string;
};

export default function LiquidityProvider({
  handleProvideLiquidity,
  handleWithdrawLiquidity,
  buttonClass,
}: LiquidityProviderProps) {
  const [provideAmount, setProvideAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="flex flex-col items-center">
        <input
          type="number"
          value={provideAmount}
          onChange={(e) => setProvideAmount(Number(e.target.value))}
          className="bg-black/50 p-2 rounded-lg w-full text-cyan-400 border border-cyan-500/30 mb-2"
          placeholder="Amount"
        />
        <button
          onClick={() => handleProvideLiquidity(provideAmount)}
          className={buttonClass}
        >
          Provide Liquidity
        </button>
      </div>
      <div className="flex flex-col items-center">
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          className="bg-black/50 p-2 rounded-lg w-full text-cyan-400 border border-cyan-500/30 mb-2"
          placeholder="Amount"
        />
        <button
          onClick={() => handleWithdrawLiquidity(withdrawAmount)}
          className={buttonClass}
        >
          Withdraw Liquidity
        </button>
      </div>
    </div>
  );
}

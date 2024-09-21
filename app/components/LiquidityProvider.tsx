type LiquidityProviderProps = {
  handleProvideLiquidity: () => void;
  handleWithdrawLiquidity: () => void;
  buttonClass: string;
};

export default function LiquidityProvider({
  handleProvideLiquidity,
  handleWithdrawLiquidity,
  buttonClass,
}: LiquidityProviderProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <button onClick={handleProvideLiquidity} className={buttonClass}>
        Provide Liquidity
      </button>
      <button onClick={handleWithdrawLiquidity} className={buttonClass}>
        Withdraw Liquidity
      </button>
    </div>
  );
}

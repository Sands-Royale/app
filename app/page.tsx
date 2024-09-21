"use client";
import { useState, useEffect } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
  isEthereumWallet,
} from "../lib/dynamic";
import { handleRead, handleWrite } from "./web3/transactions";
import Spinner from "./Spinner";
import { WalletClient } from "viem";

export default function Main() {
  const { sdkHasLoaded, user, primaryWallet } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWalletLoading, setIsWalletLoading] = useState<boolean>(true);
  const [jackpotSize, setJackpotSize] = useState(2558);
  const [timeRemaining, setTimeRemaining] = useState(44647);
  const [ticketCount, setTicketCount] = useState(10);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsWalletLoading(false);
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, secs };
  };

  const time = formatTime(timeRemaining);

  const handleBuyTickets = () => {
    alert(`Buying ${ticketCount} tickets`);
  };

  const handleProvideLiquidity = () => {
    alert("Providing liquidity");
  };

  const handleWithdrawLiquidity = () => {
    alert("Withdrawing liquidity");
  };

  const buttonClass =
    "bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-cyan-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-white/20";

  const getWalletClient = async (): Promise<WalletClient | null> => {
    try {
      if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;
      const walletClient = await primaryWallet.getWalletClient();
      return walletClient;
    } catch (error) {
      console.error("Error getting wallet client:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-mono">
      <div className="w-full max-w-md p-6 bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30">
        <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
          JACKPOT
        </h1>

        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl mb-6 border border-cyan-500/30">
          <p className="text-cyan-400 text-5xl font-bold text-center mb-2">
            {jackpotSize.toString().padStart(5, "0")}
          </p>
          <div className="flex justify-between text-pink-400">
            <span>{time.hours.toString().padStart(2, "0")}</span>
            <span>{time.minutes.toString().padStart(2, "0")}</span>
            <span>{time.secs.toString().padStart(2, "0")}</span>
          </div>
          <div className="flex justify-between text-xs text-cyan-400">
            <span>HRS</span>
            <span>MIN</span>
            <span>SEC</span>
          </div>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl mb-6 border border-cyan-500/30">
              <p className="font-bold mb-4 text-cyan-400">
                Buy Lottery Tickets
              </p>
              <div className="flex justify-between mb-4">
                <input
                  type="number"
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                  className="bg-black/50 p-2 rounded-lg w-1/2 text-cyan-400 border border-cyan-500/30"
                />
                <button onClick={handleBuyTickets} className={buttonClass}>
                  Buy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button onClick={handleProvideLiquidity} className={buttonClass}>
                Provide Liquidity
              </button>
              <button onClick={handleWithdrawLiquidity} className={buttonClass}>
                Withdraw Liquidity
              </button>
            </div>

            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl mb-6 border border-cyan-500/30">
              <p className="font-bold mb-2 text-cyan-400">Latest Winner</p>
              <p className="text-pink-400">
                {winner ? winner : "No winner yet"}
              </p>
            </div>

            {isWalletLoading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-cyan-400 mt-4 mb-4 text-center">
                  <span className="mr-2">🏅</span>
                  Connect your wallet to participate!
                </p>
                <div>
                  <DynamicWidget />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

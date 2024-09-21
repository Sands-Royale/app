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
import TicketPurchaser from "./components/TicketPurchaser";
import LiquidityProvider from "./components/LiquidityProvider";
import TimerDisplay from "./components/displays/TimerDisplay";
import JackpotDisplay from "./components/displays/JackpotDisplay";
import WinnerDisplay from "./components/displays/WinnerDisplay";
import TabNavigation from "./components/navigations/TabNavigation";

export default function Main() {
  const { sdkHasLoaded, user, primaryWallet } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWalletLoading, setIsWalletLoading] = useState<boolean>(true);
  const [jackpotSize, setJackpotSize] = useState(2558);
  const [timeRemaining, setTimeRemaining] = useState(44647);
  const [ticketCount, setTicketCount] = useState(10);
  const [winner, setWinner] = useState(null);
  const [activeTab, setActiveTab] = useState("tickets");

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
    setIsLoading(true); // Set loading to true when starting the process
    alert(`Buying ${ticketCount} tickets`);
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the process is complete
    }, 2000); 
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
          MARINA SANDS JACKPOT
        </h1>

        <JackpotDisplay jackpotSize={jackpotSize} />
        <TimerDisplay time={time} />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "tickets" ? (
              <TicketPurchaser
                ticketCount={ticketCount}
                setTicketCount={setTicketCount}
                handleBuyTickets={handleBuyTickets}
                buttonClass={buttonClass}
              />
            ) : (
              <LiquidityProvider
                handleProvideLiquidity={handleProvideLiquidity}
                handleWithdrawLiquidity={handleWithdrawLiquidity}
                buttonClass={buttonClass}
              />
            )}

            <WinnerDisplay winner={winner} />

            {isWalletLoading ? (
              <Spinner />
            ) : !user ? (
              <div className="flex flex-col items-center justify-center mt-6">
                <p className="text-cyan-400 mt-4 mb-4 text-center">
                  <span className="mr-2">🏅</span>
                  Connect your wallet to participate!
                </p>
                <button
                  onClick={() => telegramSignIn({ forceCreateUser: true })}
                  className="bg-white text-black font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  Log in or sign up
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <DynamicWidget />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "../lib/dynamic";
import Spinner from "./components/Spinner";
import TicketPurchaser from "./components/TicketPurchaser";
import LiquidityProvider from "./components/LiquidityProvider";
import TimerDisplay from "./components/displays/TimerDisplay";
import JackpotDisplay from "./components/displays/JackpotDisplay";
import WinnerDisplay from "./components/displays/WinnerDisplay";
import TabNavigation from "./components/navigations/TabNavigation";
import Header from "./components/Header";
import WalletConnection from "./components/WalletConnection";
import { TabNames } from "./helpers/constants";
import { formatTime, getWalletClient } from "./helpers/utils";
import {
  addLiquidity,
  removeLiquidity,
  swapInTicket,
} from "./web3/transactions";

export default function Main() {
  const { sdkHasLoaded, user, primaryWallet } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWalletLoading, setIsWalletLoading] = useState<boolean>(true);
  const [jackpotSize, setJackpotSize] = useState(2558);
  const [timeRemaining, setTimeRemaining] = useState(44647);
  const [ticketCount, setTicketCount] = useState(10);
  const [winner, setWinner] = useState(null);
  const [activeTab, setActiveTab] = useState<TabNames>(TabNames.TICKETS);

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

  const handleBuyTickets = async (amount: number) => {
    setIsLoading(true); // Set loading to true when starting the process
    const walletClient = await getWalletClient(primaryWallet);
    if (!walletClient) {
      console.error("No wallet client found");
      return;
    }
    await swapInTicket(walletClient, amount);
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the process is complete
    }, 2000);
  };

  const handleProvideLiquidity = async (amount: number) => {
    const walletClient = await getWalletClient(primaryWallet);
    if (!walletClient) {
      console.error("No wallet client found");
      return;
    }
    await addLiquidity(walletClient, amount);
  };

  const handleWithdrawLiquidity = async (amount: number) => {
    const walletClient = await getWalletClient(primaryWallet);
    if (!walletClient) {
      console.error("No wallet client found");
      return;
    }
    await removeLiquidity(walletClient, amount);
  };

  const buttonClass =
    "bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-cyan-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-white/20";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-mono">
      <div className="w-full max-w-md p-6 bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30">
        <Header />

        <JackpotDisplay jackpotSize={jackpotSize} />
        <TimerDisplay time={formatTime(timeRemaining)} />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TabNavigation
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab as TabNames)}
            />

            {activeTab === TabNames.TICKETS ? (
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
              <WalletConnection />
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

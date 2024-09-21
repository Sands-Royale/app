import { isEthereumWallet } from "@/lib/dynamic";
import { WalletClient } from "viem";
import { Wallet } from "@/lib/dynamic";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return { hours, minutes, secs };
};

const getWalletClient = async (
  primaryWallet: Wallet
): Promise<WalletClient | null> => {
  try {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;
    const walletClient = await primaryWallet.getWalletClient();
    return walletClient;
  } catch (error) {
    console.error("Error getting wallet client:", error);
    return null;
  }
};

const formattedJackpotSize = (jackpotSize: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(jackpotSize);

export { formatTime, getWalletClient, formattedJackpotSize };

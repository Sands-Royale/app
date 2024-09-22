import { isEthereumWallet } from "@/lib/dynamic";
import { formatUnits, parseUnits, WalletClient } from "viem";
import { Wallet } from "@/lib/dynamic";
import { USDC_DECIMALS } from "./constants";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return { hours, minutes, secs };
};

const getWalletClient = async (
  primaryWallet: Wallet | null
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

const formatAmount = (
  amount: bigint | number,
  decimals: number = USDC_DECIMALS
) => {
  return formatUnits(BigInt(amount), decimals);
};

const parseAmount = (amount: number, decimals: number = USDC_DECIMALS) => {
  return parseUnits(String(amount), decimals);
};

export {
  formatTime,
  getWalletClient,
  formattedJackpotSize,
  formatAmount,
  parseAmount,
};

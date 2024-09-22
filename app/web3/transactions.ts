import { pubClient } from "./viem";
import { Address, WalletClient } from "viem";
import { lotteryManagerABI, lotteryABI, v3SwapRouterABI } from "./abi";
import { parseAmount } from "../helpers/utils";
import { ADDRESSES } from "../helpers/constants";

const addLiquidity = async (walletClient: WalletClient, amount: number) => {
  try {
    const { request } = await pubClient.simulateContract({
      address: ADDRESSES.LOTTERY_MANAGER,
      abi: lotteryManagerABI,
      functionName: "addLiquidity",
      args: [walletClient.account?.address!, parseAmount(amount)],
      account: walletClient.account,
    });

    const hash = await walletClient.writeContract(request);
    return await pubClient.waitForTransactionReceipt({ hash });
  } catch (error) {
    console.error("Error adding liquidity:", error);
  }
};

const removeLiquidity = async (walletClient: WalletClient, amount: number) => {
  try {
    const { request } = await pubClient.simulateContract({
      address: ADDRESSES.LOTTERY_MANAGER,
      abi: lotteryManagerABI,
      functionName: "removeLiquidity",
      args: [walletClient.account?.address!, parseAmount(amount)],
      account: walletClient.account,
    });

    const hash = await walletClient.writeContract(request);
    return await pubClient.waitForTransactionReceipt({ hash });
  } catch (error) {
    console.error("Error removing liquidity:", error);
  }
};

const swapInTicket = async (
  walletClient: WalletClient,
  amountIn: number,
  deadline: number = Math.floor(Date.now() / 1000) + 60 * 20
) => {
  try {
    const { request } = await pubClient.simulateContract({
      address: ADDRESSES.V3_SWAP_ROUTER,
      abi: v3SwapRouterABI,
      functionName: "swapExactInputSingle",
      args: [
        ADDRESSES.USDC,
        ADDRESSES.LOTTERY_TOKEN,
        amountIn,
        walletClient.account?.address!,
        deadline,
        parseAmount(amountIn),
      ],
      account: walletClient.account,
    });

    const hash = await walletClient.writeContract(request);
    return await pubClient.waitForTransactionReceipt({ hash });
  } catch (error) {
    console.error("Error buying ticket:", error);
  }
};

export { addLiquidity, removeLiquidity, swapInTicket };

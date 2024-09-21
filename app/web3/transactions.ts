import { pubClient } from "./viem";
import { erc20Abi, WalletClient } from "viem";
import { Address } from "viem";
import { contractAddress } from "../helpers/constants";

const handleRead = async (setSymbol: (symbol: string) => void) => {
  try {
    const symbol = await pubClient.readContract({
      address: contractAddress,
      abi: erc20Abi,
      functionName: "symbol",
    });
    setSymbol(symbol);
  } catch (error) {
    console.error("Error reading from contract:", error);
    setSymbol("Error reading symbol");
  }
};

const handleWrite = async (walletClient: WalletClient) => {
  try {
    console.log("1", walletClient);
    if (!walletClient || !walletClient.account) {
      console.error("No wallet client address found");
      return;
    }

    console.log("2", walletClient);
    const { request } = await pubClient.simulateContract({
      address: contractAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [walletClient.account.address, BigInt(1)],
      account: walletClient.account,
    });

    const hash = await walletClient.writeContract(request);
    return await pubClient.waitForTransactionReceipt({ hash });
  } catch (error) {
    console.error("Error writing to contract:", error);
  }
};

export { handleRead, handleWrite };

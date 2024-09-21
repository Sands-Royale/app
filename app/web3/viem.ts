import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

export const pubClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

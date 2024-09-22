import { Address } from "abitype";

export const contractAddress =
  "0x081827b8c3aa05287b5aa2bc3051fbe638f33152" as Address; // random ERC20 contract

export const MARINA_ROYALE_JACKPOT = "Marina Royale Jackpot";

export enum TabNames {
  TICKETS = "tickets",
  LIQUIDITY = "liquidity",
}

export const ADDRESSES = {
  LOTTERY_MANAGER: "0xe2556948701831C7174aa7207FdcB28A092737F9" as Address,
  LOTTERY: "0x99c1bC023bfaF144316794bbd51d3b357693eF1e" as Address,
  V3_SWAP_ROUTER: "0x68b34802431f4cdb2d43541317aD190e49f25598" as Address, // TODO
  LOTTERY_TOKEN: "0x081827b8c3aa05287b5aa2bc3051fbe638f33152" as Address, // TODO
  USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address, // TODO
};

export const USDC_DECIMALS = 6;

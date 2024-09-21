import circleUserServerSdk from '../../lib/circle';

export interface WalletData {
  challengeId: string;
  userToken: string;
  encryptionKey?: string;
}

export const createWallet = async (userId: string): Promise<WalletData> => {
  try {
    const userAccess = await circleUserServerSdk.createUserToken({
      userId,
    });

    if (!userAccess.data?.userToken) {
      throw new Error("Error in creating session");
    }

    const newWallet = await circleUserServerSdk.createWallet({
      blockchains: ["ETH-SEPOLIA"],
      accountType: "SCA",
      userId: userId,
    });

    if (!newWallet.data?.challengeId) {
      throw new Error("Error in creating wallet");
    }

    return {
      challengeId: newWallet.data.challengeId,
      userToken: userAccess.data.userToken,
      encryptionKey: userAccess.data.encryptionKey,
    };
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};

export const listWallets = async (userToken: string): Promise<string[]> => {
  try {
    const wallets = await circleUserServerSdk.listWallets({
      userToken: userToken,
    });

    return wallets.data?.wallets?.map((wallet) => wallet.id) || [];
  } catch (error) {
    console.error('Error listing wallets:', error);
    throw error;
  }
};
// @ts-nocheck

const mycircleUserServerSdk = require('../../lib/circle');

interface WalletData {
  challengeId: string;
  userToken: string;
  encryptionKey?: string;
}

const createWallet = async (userId: string): Promise<WalletData> => {
  try {
    const userAccess = await mycircleUserServerSdk.createUserToken({
      userId,
    });

    if (!userAccess.data?.userToken) {
      throw new Error("Error in creating session");
    }

    const newWallet = await mycircleUserServerSdk.createWallet({
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

const listWallets = async (userToken: string): Promise<string[]> => {
  try {
    const wallets = await mycircleUserServerSdk.listWallets({
      userToken: userToken,
    });

    return wallets.data?.wallets?.map((wallet: any) => wallet.id) || [];
  } catch (error) {
    console.error('Error listing wallets:', error);
    throw error;
  }
};

module.exports = {
  createWallet,
  listWallets
};
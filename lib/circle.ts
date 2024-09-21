import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets";
const circleUserServerSdk = initiateUserControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY!,
});

export default circleUserServerSdk;
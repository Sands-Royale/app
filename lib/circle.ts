// circle.ts
const { initiateUserControlledWalletsClient } = require("@circle-fin/user-controlled-wallets");

const circleUserServerSdk = initiateUserControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
});

module.exports = circleUserServerSdk;

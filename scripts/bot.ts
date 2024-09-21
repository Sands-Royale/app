// @ts-nocheck

const { Telegraf } = require("telegraf");
const jwt = require("jsonwebtoken");
const nodeCrypto = require("crypto");
require("dotenv").config();
const { createWallet, listWallets } = require("../src/services/circleService");

// Environment variables
const TOKEN: any = process.env.TELEGRAM_BOT_TOKEN;
const LOGIN_URL: any = process.env.LOGIN_URL;
const PORT: any = process.env.NEXT_PUBLIC_PORT || 3000;

if (!TOKEN || !LOGIN_URL) {
  console.error(
    "Please add your Telegram bot token and app URL to the .env file"
  );
  process.exit(1);
}

// Initialize the bot
const bot: any = new Telegraf(TOKEN);

/**
 * Start command handling for the bot
 */
bot.start((ctx: any) => {
  // Extract user data from the context
  const userData: any = {
    authDate: Math.floor(new Date().getTime()),
    firstName: ctx.from?.first_name || "",
    lastName: "",
    username: ctx.from?.username || "",
    id: ctx.from?.id.toString() || "",
    photoURL: "",
  };

  // Generate the hash for Telegram authentication
  const hash: any = generateTelegramHash(userData);

  // Create JWT with user data and hash
  const telegramAuthToken: any = jwt.sign(
    {
      ...userData,
      hash,
    },
    TOKEN,
    { algorithm: "HS256" }
  );

  console.log("[DEBUG] JWT generated for user", userData);

  // URL-encode the generated JWT for safe usage in a URL
  const encodedTelegramAuthToken: any = encodeURIComponent(telegramAuthToken);

  // Create a wallet using the circleService
  createWallet(userData.id)
    .then((walletData: any) => {
      // Create the inline keyboard with the Mini Web App button
      const keyboard: any = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open Mini Web App 🚀",
                web_app: {
                  url: `${LOGIN_URL}/?telegramAuthToken=${encodedTelegramAuthToken}&challengeId=${walletData.challengeId}`,
                },
              },
            ],
          ],
        },
      };

      // Send a welcome message with the inline keyboard
      return ctx.reply("Welcome to Circle Wallet Mini Web App", keyboard);
    })
    .catch((error: any) => {
      console.error("Error in start command:", error);
      return ctx.reply("Sorry, there was an error setting up your wallet. Please try again later.");
    });
});

// Add a command to list wallets
bot.command("list_wallets", (ctx: any) => {
  if (!ctx.from) {
    return ctx.reply("Error: Unable to identify user.");
  }
  
  createWallet(ctx.from.id.toString())
    .then((walletData: any) => listWallets(walletData.userToken))
    .then((walletIds: any) => {
      return ctx.reply(`Your wallet IDs: ${walletIds.join(", ")}`);
    })
    .catch((error: any) => {
      console.error("Error listing wallets:", error);
      return ctx.reply("Sorry, there was an error listing your wallets. Please try again later.");
    });
});

// Launch the bot
bot
  .launch({
    webhook: {
      domain: LOGIN_URL,
      port: Number(PORT),
    },
  })
  .then(() => {
    console.log(`Bot is running on port ${PORT}`);
  });

/**
 * Function to generate HMAC hash for Telegram authentication
 */
const generateTelegramHash = (data: any): any => {
  // Prepare the data object with required fields
  const useData: any = {
    auth_date: String(data.authDate),
    first_name: data.firstName,
    id: String(data.id),
    last_name: data.lastName,
    photo_url: data.photoURL,
    username: data.username,
  };

  // Filter out undefined or empty values from the data object
  const filteredUseData: any = Object.entries(useData).reduce(
    (acc: any, [key, value]: [string, any]) => {
      if (value) acc[key] = value;
      return acc;
    },
    {} as any
  );

  // Sort the entries and create the data check string
  const dataCheckArr: any = Object.entries(filteredUseData)
    .map(([key, value]: [string, any]) => `${key}=${String(value)}`)
    .sort((a: any, b: any) => a.localeCompare(b))
    .join("\n");

  // Create SHA-256 hash from the bot token
  const TELEGRAM_SECRET: any = nodeCrypto
    .createHash("sha256")
    .update(TOKEN)
    .digest();

  // Generate HMAC-SHA256 hash from the data check string
  return nodeCrypto
    .createHmac("sha256", TELEGRAM_SECRET)
    .update(dataCheckArr)
    .digest("hex");
};

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
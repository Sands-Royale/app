import { useTelegramLogin } from "@/lib/dynamic";

export default function WalletConnection() {
  const { telegramSignIn } = useTelegramLogin();

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <p className="text-cyan-400 mt-4 mb-4 text-center">
        <span className="mr-2">🏅</span>
        Connect your wallet to participate!
      </p>
      <button
        onClick={() => telegramSignIn({ forceCreateUser: true })}
        className="bg-white text-black font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
      >
        Log in or sign up
      </button>
    </div>
  );
}

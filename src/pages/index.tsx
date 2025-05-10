// src/pages/index.tsx
import { GameGrid } from "@/components/game/GameGrid";
import { PLATFORM_REFERRAL_FEE } from "@/constants";
import RecentPlays from "@/components/game/RecentPlays/RecentPlays";
import { toast } from "sonner";
import { useReferral } from "gamba-react-ui-v2";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

export default function HomePage() {
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const { copyLinkToClipboard } = useReferral();

  const handleCopyInvite = () => {
    if (!wallet.publicKey) {
      return walletModal.setVisible(true);
    }
    copyLinkToClipboard();
    toast.success(
      `Copied! Share your link to earn a ${PLATFORM_REFERRAL_FEE * 100}% fee when players use this platform`,
    );
  };

  return (
    <>
      <div className="relative mx-auto flex flex-col gap-5 mt-20 pb-10 px-2.5 transition-all duration-250 ease-in-out sm:px-5 sm:pt-5 md:max-w-6xl">
        <div className="relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-lg lg:grid lg:grid-cols-3 gap-4 lg:p-10 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 transform rotate-12 scale-150 blur-xl pointer-events-none"></div>

          <div className="rounded-lg p-4 lg:col-span-2 text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <div className=" flex items-center justify-center md:justify-start">
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
                Double It Or Go Home 🎲
              </h1>
              <img src="/wave.gif" className="h-14" alt="Gamba Logo" />
            </div>
            <p className="my-2 text-white drop-shadow text-lg md:text-xl">
              On-chain
              degeneracy on Solana. Roll Dice, Double It, or Go Home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/play/dice" passHref>
                <button className="my-4 px-8 py-3 text-2xl font-bold text-black bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200 ease-in-out animate-pulse">
                  Play Dice
                </button>
              </Link>
              <Link href="/play/plinko" passHref>
                <button className="my-4 px-8 py-3 text-2xl font-bold text-black bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200 ease-in-out animate-pulse">
                  Play Plinko
                </button>
              </Link>
            </div>
            <p className="my-2 text-sm md:text-base max-w-sm">
              Share your link to earn a {PLATFORM_REFERRAL_FEE * 100}% fee on
              each play when players use this platform using your code.
            </p>
            <button
              className="bg-[#8851ff] hover:bg-[#9564ff] rounded-lg p-2 text-xs"
              onClick={handleCopyInvite}
            >
              Copy Link
            </button>
          </div>
          <div className="whitespace-nowrap grid grid-cols-2 grid-rows-2 gap-2 mt-5 md:flex md:flex-col md:mt-0 md:justify-start z-10">
            <button
              onClick={() =>
                window.open("https://raydium.io/swap/?outputMint=CnJzTPbjFzpo5ogNPwRFjt2ade8s2NoBfJVhrFAt31X9&inputMint=sol", "_blank", "noopener,noreferrer")
              }
              className="rounded-lg p-3 bg-yellow-400 hover:bg-yellow-500 hover:-translate-y-0.5 transform text-black font-semibold transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
            >
              Buy DIOGH
            </button>
           

            <button
              onClick={() => window.open("https://t.me/+eRls5c1GgutjYTk0")}
              className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
            >
              💬 Join Community
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center">Recent Plays</h2>
        <RecentPlays />
      </div>
    </>
  );
}

// src/hooks/useGameEvent.ts
import { BPS_PER_WHOLE, GambaTransaction } from "gamba-core-v2";
import { TokenValue, useTokenMeta } from "gamba-react-ui-v2";

import { GAMES } from "@/games";
import React from "react";
import { extractMetadata } from "@/utils/utils";
import { toast } from "sonner";
import { useGambaEventListener } from "gamba-react-v2";
import { useWallet } from "@solana/wallet-adapter-react";

function RecentPlay({ event }: { event: GambaTransaction<"GameSettled"> }) {
  const data = event.data;
  const token = useTokenMeta(data.tokenMint);

  const multiplier = data.bet[data.resultIndex.toNumber()] / BPS_PER_WHOLE;
  const wager = data.wager.toNumber();
  const payout = multiplier * wager;
  const profit = payout + data.jackpotPayoutToUser.toNumber() - wager;

  const { game } = extractMetadata(event);

  if (!game || !token) {
    return null;
  }

  const textColorClass = profit >= 0 ? "text-green-600" : "text-red-600";

  return (
    <>
      <img
        src={`/games/${game.id}/logo.png`}
        alt={`${game.meta.name}`}
        className="h-10"
      />
      <div className={textColorClass}>
        <img
          src="/logo.svg"
          alt="gamba"
          className="absolute top-2 right-2 w-24 h-6 rounded-full"
        />
        <div className="font-bold text-lg">
          {data.user.toBase58().substring(0, 4)}...{" "}
          <span className="text-sm">{profit >= 0 ? "WON" : "LOST"}</span>{" "}
          <TokenValue amount={Math.abs(profit)} mint={data.tokenMint} />
        </div>
        <div className="flex items-center gap-2 mt-2">
          {token.image ? (
            <img
              src={token.image}
              alt={`${token.name}`}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <span className="inline-block w-6 h-6 border border-white rounded-full flex items-center justify-center text-xs font-medium text-white">
              <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
                {token.symbol}
              </span>
            </span>
          )}
          <span
            className={`text-sm font-semibold ${
              profit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {profit >= 0 ? "+" : "-"}
            <TokenValue amount={data.payout.toNumber()} mint={data.tokenMint} />
          </span>
          {profit > 0 && (
            <span className="text-xs font-medium text-gray-500">
              ({multiplier.toFixed(2)}x)
            </span>
          )}
        </div>
        {data.jackpotPayoutToUser.toNumber() > 0 && (
          <div className="mt-2 animate-jackpotGradient flex items-center gap-2 text-black rounded-lg p-1">
            +
            <TokenValue
              mint={data.tokenMint}
              amount={data.jackpotPayoutToUser.toNumber()}
            />
          </div>
        )}
      </div>
    </>
  );
}

const GameToast = () => {
  const { publicKey } = useWallet();

  useGambaEventListener("GameSettled", (event) => {
    const gameId = event.data.metadata.split(":")[1];
    const game = GAMES.find((x) => x.id === gameId);
    if (game && publicKey) {
      const connectedUserPublicKeyString = publicKey.toString();
      const eventUserPublicKeyString = event.data.user.toBase58();

      if (eventUserPublicKeyString !== connectedUserPublicKeyString) {
        const isGameWon = event.data.payout.toNumber() > 0;
        const toastType = isGameWon ? toast.success : toast.error;

        toastType(<RecentPlay event={event} />, {
          duration: 5000,
          position: "bottom-left",
        });
      }
    }
  });

  return null;
};

export default GameToast;

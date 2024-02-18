// src/components/sections/RecentPlays/RecentPlays.tsx

import { BPS_PER_WHOLE, GambaTransaction } from "gamba-core-v2";
import React, { useState } from "react";
import { TokenValue, useTokenMeta } from "gamba-react-ui-v2";

import { ShareModal } from "./ShareModal";
import { extractMetadata } from "../../../utils/utils";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useRecentPlays } from "./useRecentPlays";

function TimeDiff({ time, suffix = "ago" }: { time: number; suffix?: string }) {
  const diff = Date.now() - time;
  return React.useMemo(() => {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours >= 1) {
      return `${hours}h ${suffix}`;
    }
    if (minutes >= 1) {
      return `${minutes}m ${suffix}`;
    }
    return "Just now";
  }, [diff, suffix]);
}

function RecentPlay({ event }: { event: GambaTransaction<"GameSettled"> }) {
  const data = event.data;
  const token = useTokenMeta(data.tokenMint);
  const md = useMediaQuery("md");

  const multiplier = data.bet[data.resultIndex.toNumber()] / BPS_PER_WHOLE;
  const wager = data.wager.toNumber();
  const payout = multiplier * wager;
  const profit = payout - wager;

  const { game } = extractMetadata(event);

  if (!game) {
    return null;
  }

  const imagePath = `/games/${game.id}/logo.png`;

  return (
    <>
      <img src={imagePath} alt={`Splash for ${game.meta.name}`} width={64} />
      <div className="text-[#a079ff]">
        {data.user.toBase58().substring(0, 4)}...
      </div>
      {md && (profit >= 0 ? " won " : " lost ")}
      <div
        className={`flex gap-2 items-center rounded-lg p-1 ${
          profit > 0 ? "bg-green-200/50" : "bg-white/10"
        }`}
      >
        <img src={token.image} width={24} className="rounded-full" />
        <TokenValue amount={Math.abs(profit)} mint={data.tokenMint} />
      </div>
      {md && (
        <>
          {profit > 0 && <div>({multiplier.toFixed(2)}x)</div>}
          {data.jackpotPayoutToUser.toNumber() > 0 && (
            <div className="animate-jackpotGradient flex gap-2 items-center text-black rounded-lg p-1">
              +
              <TokenValue
                mint={data.tokenMint}
                amount={data.jackpotPayoutToUser.toNumber()}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function RecentPlays() {
  const events = useRecentPlays();
  const [selectedGame, setSelectedGame] =
    useState<GambaTransaction<"GameSettled"> | null>(null);
  const md = useMediaQuery("md");

  return (
    <div className="w-full relative flex flex-col gap-2.5">
      {selectedGame && (
        <ShareModal
          event={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
      {!events.length &&
        Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-full rounded-lg animate-pulse bg-gray-300"
          />
        ))}
      {events.map((tx) => (
        <button
          key={tx.signature}
          onClick={() => setSelectedGame(tx)}
          className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0f121b] hover:bg-[#131724] justify-between"
        >
          <div className="flex items-center gap-2">
            <RecentPlay event={tx} />
          </div>
          <TimeDiff time={tx.time} suffix={md ? "ago" : ""} />
        </button>
      ))}
    </div>
  );
}

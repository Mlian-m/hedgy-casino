import { BPS_PER_WHOLE, GambaTransaction } from "gamba-core-v2";
import { TokenValue, useTokenMeta } from "gamba-react-ui-v2";

import { GAMES } from "@/games";

export const extractMetadata = (event: GambaTransaction<"GameSettled">) => {
  try {
    const [version, gameId, ...rest] = event.data.metadata.split(":");
    const game = GAMES.find((x) => x.id.toLowerCase() === gameId.toLowerCase());
    const gameNameFallback = gameId || "Unknown";
    return { game, gameNameFallback };
  } catch {
    return { game: null, gameNameFallback: "Unknown" };
  }
};

export function RecentPlay({
  event,
}: {
  event: GambaTransaction<"GameSettled">;
}) {
  const data = event.data;
  const token = useTokenMeta(data.tokenMint);

  const multiplier = data.bet[data.resultIndex.toNumber()] / BPS_PER_WHOLE;
  const wager = data.wager.toNumber();
  const payout = multiplier * wager;
  const profit = payout - wager;

  const { game, gameNameFallback } = extractMetadata(event);

  return (
    <>
      <div className="game-info">
        {game ? (
          <img
            src={`/games/${game.id}/logo.png`}
            alt={`Splash for ${game.meta.name}`}
            width={64}
          />
        ) : (
          <div className="fallback-game-info">{gameNameFallback}</div>
        )}
      </div>
      <div style={{ color: "#a079ff" }}>
        {`${data.user.toBase58().substring(0, 4)}...${data.user
          .toBase58()
          .slice(-4)}`}
      </div>
      <div className="hidden md:flex">{profit >= 0 ? " WON " : " LOST "}</div>
      <div
        className="flex gap-2 items-center rounded-lg p-1"
        style={{ backgroundColor: profit > 0 ? "#34D399" : "#666" }}
      >
        {token.image ? (
          <img
            src={token.image}
            alt="Token"
            width={24}
            className="rounded-full"
          />
        ) : (
          <span className="inline-block w-6 h-6 border border-white rounded-full items-center justify-center text-xs font-medium text-white">
            <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center m-auto">
              {token.symbol}
            </span>
          </span>
        )}

        <TokenValue amount={Math.abs(profit)} mint={data.tokenMint} />
      </div>
      <div className="hidden md:flex flex-col">
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
      </div>
    </>
  );
}

// src/games/Dice/index.tsx

import { Container, Result, RollUnder, Stats } from "./styles";
import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useCurrentToken,
  useSound,
  useWagerInput,
} from "gamba-react-ui-v2";
import { useMemo, useState, useEffect } from "react";

import { BPS_PER_WHOLE } from "gamba-core-v2";
import GambaPlayButton from "@/components/GambaPlayButton";
import Slider from "./slide";
import { toast } from "sonner";
import { useGamba } from "gamba-react-v2";
import Dice3D from "./Dice3D";

const SOUND_PLAY = "/games/dice/play.mp3";
const SOUND_LOSE = "/games/dice/lose.mp3";
const SOUND_WIN = "/games/dice/win.mp3";
const SOUND_TICK = "/games/dice/tick.mp3";

const DICE_SIDES = 100;

export default function Dice() {
  const gamba = useGamba();
  const token = useCurrentToken();
  const [wager, setWager] = useWagerInput();
  const pool = useCurrentPool();
  const [resultIndex, setResultIndex] = useState(-1);
  const [rollUnderIndex, setRollUnderIndex] = useState(
    Math.floor(DICE_SIDES / 2),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedResult, setDisplayedResult] = useState<number | null>(null);
  const [winStatus, setWinStatus] = useState<'win' | 'loss' | null>(null);
  const [achievedMultiplier, setAchievedMultiplier] = useState<number | null>(null);

  console.log("Dice component rendering. Current token:", token?.symbol);

  const sounds = useSound({
    win: SOUND_WIN,
    play: SOUND_PLAY,
    lose: SOUND_LOSE,
    tick: SOUND_TICK,
  });

  const potentialMultiplier = useMemo(() => {
    if (rollUnderIndex === 0) return 0;
    return Number(BigInt(DICE_SIDES * BPS_PER_WHOLE) / BigInt(rollUnderIndex)) / BPS_PER_WHOLE;
  },
    [rollUnderIndex]
  );

  // Log the values for debugging
  useEffect(() => {
    if (token && pool) {
      const calculatedMaxWin = potentialMultiplier * wager;
      console.log(`---
Token: ${token.symbol}
Potential Multiplier: ${potentialMultiplier.toFixed(2)}
Wager (smallest unit): ${wager}
Calculated Max Win (smallest unit): ${calculatedMaxWin}
Pool Max Payout (smallest unit): ${pool.maxPayout}
Payout Exceeded: ${calculatedMaxWin > pool.maxPayout}
---`);
    }
  }, [token, pool, wager, potentialMultiplier]);

  const scaledMultiplier = useMemo(() => {
    const result = potentialMultiplier * BPS_PER_WHOLE;
    return Number.isFinite(result) ? Math.floor(result) : 0;
  }, [potentialMultiplier]);

  const bet = useMemo(() =>
    Array.from({ length: DICE_SIDES }).map((_, i) =>
      i < rollUnderIndex ? scaledMultiplier : 0
    ),
    [rollUnderIndex, scaledMultiplier]
  );

  const game = GambaUi.useGame();

  const play = async () => {
    try {
      sounds.play("play");
      setResultIndex(-1);
      setDisplayedResult(null);
      setWinStatus(null);
      setAchievedMultiplier(null);
      setIsAnimating(true);

      await game.play({
        wager,
        bet,
      });

      const result = await game.result();

      const didWin = result.payout > 0;
      const currentWinStatus = didWin ? 'win' : 'loss';
      const currentMultiplier = didWin ? potentialMultiplier : null;

      setTimeout(() => {
        setResultIndex(result.resultIndex);
        setDisplayedResult(result.resultIndex + 1);
        setWinStatus(currentWinStatus);
        setAchievedMultiplier(currentMultiplier);
        setIsAnimating(false);

        if (didWin) {
          sounds.play("win");
        } else {
          sounds.play("lose");
        }
      }, 500);

    } catch (err: any) {
      toast.error(`An error occurred: ${err.message}`);
      setResultIndex(-1);
      setIsAnimating(false);
      setDisplayedResult(null);
      setWinStatus(null);
      setAchievedMultiplier(null);
    }
  };

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Responsive>
          <Container>
            <Dice3D
              isSpinning={isAnimating}
              resultNumber={displayedResult}
              winStatus={winStatus}
              multiplier={achievedMultiplier}
            />
            <Stats>
              <div>
                <div>{((rollUnderIndex / DICE_SIDES) * 100).toFixed(0)}%</div>
                <div>Win Chance</div>
              </div>
              <div>
                <div>{potentialMultiplier.toFixed(2)}x</div>
                <div>Multiplier</div>
              </div>
              <div>
                {potentialMultiplier * wager > pool.maxPayout ? (
                  <div style={{ color: "red" }}>Too high</div>
                ) : (
                  <div>
                    <TokenValue suffix="" amount={potentialMultiplier * wager} />
                  </div>
                )}
                <div>Payout</div>
              </div>
            </Stats>
            <div style={{ position: "relative", marginTop: "20px" }}>
              <Slider
                disabled={gamba.isPlaying || isAnimating}
                range={[0, DICE_SIDES]}
                min={1}
                max={DICE_SIDES - 5}
                value={rollUnderIndex}
                onChange={(value) => {
                  setRollUnderIndex(value);
                  sounds.play("tick");
                }}
              />
            </div>
            <RollUnder style={{ marginTop: "40px" }}>
              <div>
                <div>{rollUnderIndex + 1}</div>
                <div>Roll Under</div>
              </div>
            </RollUnder>
          </Container>
        </GambaUi.Responsive>
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaPlayButton onClick={play} text="Roll" disabled={gamba.isPlaying || isAnimating} />
      </GambaUi.Portal>
    </>
  );
}

import { GambaUi, useSound, useWagerInput } from "gamba-react-ui-v2";
import {
  LineLayer1,
  LineLayer2,
  LineLayer3,
  MultiplierText,
  Rocket,
  StarsLayer1,
  StarsLayer2,
  StarsLayer3,
} from "./styles";
import React, { useState } from "react";

import CustomSlider from "./slider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const calculateBetArray = (multiplier: number) => {
  const fraction = Math.round((multiplier % 1) * 100) / 100;
  const repeatMultiplier = (() => {
    switch (fraction) {
      case 0.25:
        return 4;
      case 0.5:
        return 2;
      case 0.75:
        return 4;
      default:
        return 1;
    }
  })();

  const totalSum = multiplier * repeatMultiplier;
  const betArray = Array.from({ length: repeatMultiplier }).map(
    () => multiplier,
  );
  const totalElements = Math.ceil(totalSum);
  const zerosToAdd = totalElements - repeatMultiplier;

  return betArray.concat(Array.from({ length: zerosToAdd }).map(() => 0));
};

const CrashGame = () => {
  const [wager, setWager] = useWagerInput();
  const [multiplierTarget, setMultiplierTarget] = useState(1.5);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);
  const [rocketState, setRocketState] = useState<"idle" | "win" | "crash">(
    "idle",
  );
  const game = GambaUi.useGame();
  const sound = useSound({
    music: "/sounds/music.mp3",
    crash: "/sounds/crash.mp3",
    win: "/sounds/win.mp3",
  });

  const walletModal = useWalletModal();
  const wallet = useWallet();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  const getRocketStyle = () => ({
    bottom: `${Math.min(currentMultiplier / 1, 1) * 100}%`,
    left: `${Math.min(currentMultiplier / 1, 1) * 100}%`,
    transform: `rotate(${90 * (1 - currentMultiplier)}deg)`,
  });

  const doTheIntervalThing = (
    currentMultiplier: number,
    targetMultiplier: number,
    win: boolean,
  ) => {
    const nextIncrement = 0.01 * (Math.floor(currentMultiplier) + 1);
    const nextValue = currentMultiplier + nextIncrement;

    setCurrentMultiplier(nextValue);

    if (nextValue >= targetMultiplier) {
      sound.sounds.music.player.stop();
      sound.play(win ? "win" : "crash");
      setRocketState(win ? "win" : "crash");
      setCurrentMultiplier(targetMultiplier);
      return;
    }

    setTimeout(() => doTheIntervalThing(nextValue, targetMultiplier, win), 50);
  };

  const calculateBiasedLowMultiplier = (targetMultiplier: number) => {
    const randomValue = Math.random();
    const maxPossibleMultiplier = Math.min(targetMultiplier, 12);
    const exponent = randomValue > 0.95 ? 2.8 : targetMultiplier > 10 ? 5 : 6;
    const result =
      1 + Math.pow(randomValue, exponent) * (maxPossibleMultiplier - 1);
    return parseFloat(result.toFixed(2));
  };

  const multiplierColor = (() => {
    if (rocketState === "crash") return "#ff0000";
    if (rocketState === "win") return "#00ff00";
    return "#ffffff";
  })();

  const play = async () => {
    setRocketState("idle");
    const bet = calculateBetArray(multiplierTarget);
    await game.play({ wager, bet });

    const result = await game.result();
    const win = result.payout > 0;
    const multiplierResult = win
      ? multiplierTarget
      : calculateBiasedLowMultiplier(multiplierTarget);

    console.log("multiplierResult", multiplierResult);
    console.log("win", win);

    sound.play("music");
    doTheIntervalThing(0, multiplierResult, win);
  };

  return (
    <>
      <GambaUi.Portal target="screen">
        <StarsLayer1 style={{ opacity: currentMultiplier > 3 ? 0 : 1 }} />
        <LineLayer1 style={{ opacity: currentMultiplier > 3 ? 1 : 0 }} />
        <StarsLayer2 style={{ opacity: currentMultiplier > 2 ? 0 : 1 }} />
        <LineLayer2 style={{ opacity: currentMultiplier > 2 ? 1 : 0 }} />
        <StarsLayer3 style={{ opacity: currentMultiplier > 1 ? 0 : 1 }} />
        <LineLayer3 style={{ opacity: currentMultiplier > 1 ? 1 : 0 }} />
        <MultiplierText color={multiplierColor}>
          {currentMultiplier.toFixed(2)}x
        </MultiplierText>
        <Rocket style={getRocketStyle()} />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <CustomSlider value={multiplierTarget} onChange={setMultiplierTarget} />

        {wallet.connected ? (
          <GambaUi.Button main onClick={play}>
            Play
          </GambaUi.Button>
        ) : (
          <GambaUi.Button main onClick={play}>
            Play
          </GambaUi.Button>
        )}
      </GambaUi.Portal>
    </>
  );
};

export default CrashGame;

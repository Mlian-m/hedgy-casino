// src/games/Crash/index.tsx
import { GambaUi, useSound, useWagerInput } from "gamba-react-ui-v2";
import {
  LineLayer1,
  LineLayer10,
  LineLayer2,
  LineLayer3,
  LineLayer4,
  LineLayer5,
  LineLayer6,
  LineLayer7,
  LineLayer8,
  LineLayer9,
  MultiplierText,
  Rocket,
  ScreenWrapper,
  StarsLayer1,
  StarsLayer10,
  StarsLayer2,
  StarsLayer3,
  StarsLayer4,
  StarsLayer5,
  StarsLayer6,
  StarsLayer7,
  StarsLayer8,
  StarsLayer9,
} from "./styles";
import React, { useState } from "react";

import CustomSlider from "./slider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const calculateBetArray = (multiplier: number) => {
  const targetMultiplier = Math.ceil(multiplier);

  // Generate an array filled with zeros, except for the multiplier
  const betArray = new Array(targetMultiplier)
    .fill(0)
    .map((_, index) => (index === 0 ? multiplier : 0));

  return betArray;
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
    music: "/games/crash/music.mp3",
    crash: "/games/crash/crash.mp3",
    win: "/games/crash/win.mp3",
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

  const getRocketStyle = () => {
    const maxMultiplier = 1;
    const progress = Math.min(currentMultiplier / maxMultiplier, 1);

    const leftOffset = 20;
    const bottomOffset = 30;
    const left = progress * (100 - leftOffset);
    const bottom = Math.pow(progress, 5) * (100 - bottomOffset);
    const rotationProgress = Math.pow(progress, 2.3);
    const startRotationDeg = 90;
    const rotation = (1 - rotationProgress) * startRotationDeg;

    return {
      bottom: `${bottom}%`,
      left: `${left}%`,
      transform: `rotate(${rotation}deg)`,
    };
  };

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
    let result =
      1 + Math.pow(randomValue, exponent) * (maxPossibleMultiplier - 1);

    // Set a minimum to at least 2%
    const minThreshold = targetMultiplier * 0.02;

    // Apply some randomness
    const randomMultiplier =
      minThreshold + Math.random() * (targetMultiplier * 0.03);

    result = Math.max(result, randomMultiplier);
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

    sound.play("music");
    doTheIntervalThing(0, multiplierResult, win);
  };

  return (
    <>
      <GambaUi.Portal target="screen">
        <ScreenWrapper>
          <StarsLayer1 style={{ opacity: currentMultiplier > 5 ? 0 : 1 }} />
          <LineLayer1 style={{ opacity: currentMultiplier > 5 ? 1 : 0 }} />
          <StarsLayer2 style={{ opacity: currentMultiplier > 4.5 ? 0 : 1 }} />
          <LineLayer2 style={{ opacity: currentMultiplier > 4.5 ? 1 : 0 }} />
          <StarsLayer3 style={{ opacity: currentMultiplier > 4 ? 0 : 1 }} />
          <LineLayer3 style={{ opacity: currentMultiplier > 4 ? 1 : 0 }} />
          <StarsLayer4 style={{ opacity: currentMultiplier > 3.5 ? 0 : 1 }} />
          <LineLayer4 style={{ opacity: currentMultiplier > 3.5 ? 1 : 0 }} />
          <StarsLayer5 style={{ opacity: currentMultiplier > 3 ? 0 : 1 }} />
          <LineLayer5 style={{ opacity: currentMultiplier > 3 ? 1 : 0 }} />
          <StarsLayer6 style={{ opacity: currentMultiplier > 2.5 ? 0 : 1 }} />
          <LineLayer6 style={{ opacity: currentMultiplier > 2.5 ? 1 : 0 }} />
          <StarsLayer7 style={{ opacity: currentMultiplier > 2 ? 0 : 1 }} />
          <LineLayer7 style={{ opacity: currentMultiplier > 2 ? 1 : 0 }} />
          <StarsLayer8 style={{ opacity: currentMultiplier > 1.5 ? 0 : 1 }} />
          <LineLayer8 style={{ opacity: currentMultiplier > 1.5 ? 1 : 0 }} />
          <StarsLayer9 style={{ opacity: currentMultiplier > 1 ? 0 : 1 }} />
          <LineLayer9 style={{ opacity: currentMultiplier > 1 ? 1 : 0 }} />
          <StarsLayer10 style={{ opacity: currentMultiplier > 0.5 ? 0 : 1 }} />
          <LineLayer10 style={{ opacity: currentMultiplier > 0.5 ? 1 : 0 }} />

          <MultiplierText color={multiplierColor}>
            {currentMultiplier.toFixed(2)}x
          </MultiplierText>
          <Rocket style={getRocketStyle()} />
        </ScreenWrapper>
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <CustomSlider value={multiplierTarget} onChange={setMultiplierTarget} />

        {wallet.connected ? (
          <GambaUi.PlayButton onClick={play}>Play</GambaUi.PlayButton>
        ) : (
          <GambaUi.Button main onClick={connect}>
            Play
          </GambaUi.Button>
        )}
      </GambaUi.Portal>
    </>
  );
};

export default CrashGame;

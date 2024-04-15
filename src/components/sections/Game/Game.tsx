// src/components/sections/Game/Game.tsx

import { GambaUi, useGambaAudioStore } from "gamba-react-ui-v2";
import React, { useEffect, useState } from "react";
import { decodeGame, getGameAddress } from "gamba-core-v2";
import {
  useAccount,
  useGamba,
  useTransactionStore,
  useWalletAddress,
} from "gamba-react-v2";

import { GAMES } from "@/games";
import { GameCard } from "@/components/sections/Dashboard/GameCard";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { ProvablyFairModal } from "./ProvablyFairModal";
import { useUserStore } from "@/hooks/useUserStore";

interface TransactionStepperProps {
  currentStep: number;
}

const TransactionStepper: React.FC<TransactionStepperProps> = ({
  currentStep,
}) => {
  const steps = ["Signing", "Sending", "Settling"];

  return (
    <div className="flex justify-center">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`w-full h-2 rounded-md mx-1 flex items-center justify-center transition-all duration-300 
          ${index < currentStep ? "bg-purple-500" : ""}
          ${index === currentStep ? "bg-purple-700 animate-purplePulse" : ""}
          ${index > currentStep ? "bg-gray-300" : ""}
          `}
        />
      ))}
    </div>
  );
};

function useLoadingState() {
  const userAddress = useWalletAddress();
  const game = useAccount(getGameAddress(userAddress), decodeGame);
  const txStore = useTransactionStore();

  return React.useMemo(() => {
    if (txStore.label !== "play") {
      return -1;
    }
    if (game?.status.resultRequested) {
      return 2;
    }
    if (txStore.state === "processing" || txStore.state === "sending") {
      return 1;
    }
    if (txStore.state === "simulating" || txStore.state === "signing") {
      return 0;
    }
    return -1;
  }, [txStore, game]);
}

export function GameSlider() {
  return (
    <>
      <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center">
        {GAMES.map((game) => (
          <div
            key={game.id}
            className="w-48 md:w-64 p-2 flex justify-center md:my-2"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </>
  );
}

export function CustomError() {
  return (
    <>
      <GambaUi.Portal target="error">
        <GambaUi.Responsive>
          <h1>😭 Oh no!</h1>
          <p>Something went wrong</p>
        </GambaUi.Responsive>
      </GambaUi.Portal>
    </>
  );
}

export default function CustomRenderer() {
  const { game } = GambaUi.useGame();
  const [info, setInfo] = useState(false);
  const [provablyFair, setProvablyFair] = useState(false);
  const audioStore = useGambaAudioStore();
  const imagePath = `/games/${game.id}/logo.png`;
  const { newcomer, gamesPlayed, set } = useUserStore();
  const currentStep = useLoadingState();

  useEffect(() => {
    if (newcomer || !gamesPlayed.includes(game.id)) {
      setInfo(true);
      set((state) => ({
        newcomer: false,
        gamesPlayed: [...state.gamesPlayed, game.id],
      }));
    }
  }, [game.id, gamesPlayed, newcomer, set]);

  return (
    <>
      {info && (
        <Modal onClose={() => setInfo(false)}>
          <img
            height="150px"
            src={imagePath}
            alt={`Splash for ${game.meta.name}`}
          />
          <h1>{game.meta.name}</h1>
          <p>{game.meta.description}</p>
        </Modal>
      )}
      {provablyFair && (
        <ProvablyFairModal onClose={() => setProvablyFair(false)} />
      )}
      <div className="w-full relative grid gap-1">
        <div className="relative flex-grow bg-[#0c0c11] rounded-lg overflow-hidden transition-height duration-200 md:min-h-[550px] min-h-[500px]">
          <GambaUi.PortalTarget target="error" />
          <GambaUi.PortalTarget target="screen" />
          <div className="absolute left-0 bottom-0 p-1 flex gap-2">
            <button
              onClick={() =>
                audioStore.set((audioStore.masterGain + 0.25) % 1.25)
              }
            >
              Volume: {audioStore.masterGain * 100}%
            </button>
          </div>
        </div>
        <TransactionStepper currentStep={currentStep} />
        <div className="w-full bg-[#1A1B28] p-2 sm:p-5 text-white rounded-lg flex flex-wrap gap-2 sm:gap-5 items-start sm:flex-row">
          <div className="flex gap-2 justify-center">
            <button
              className="p-2 text-white bg-transparent hover:bg-[#ffffff22] rounded-lg cursor-pointer focus:outline-none"
              onClick={() => setInfo(true)}
            >
              <Icon.Info />
            </button>
            <button
              className="p-2 text-white bg-transparent hover:bg-[#ffffff22] rounded-lg cursor-pointer focus:outline-none"
              onClick={() => setProvablyFair(true)}
            >
              <Icon.Fairness />
            </button>
          </div>
          <div className="flex-grow flex items-center justify-start gap-2">
            <GambaUi.PortalTarget target="controls" />
            <GambaUi.PortalTarget target="play" />
          </div>
        </div>
      </div>
    </>
  );
}

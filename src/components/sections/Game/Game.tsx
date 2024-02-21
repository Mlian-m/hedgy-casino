// src/components/sections/Game/Game.tsx

import { GambaUi, useGambaAudioStore } from "gamba-react-ui-v2";
import React, { useEffect, useState } from "react";

import { GAMES } from "@/games";
import { GameCard } from "@/components/sections/Dashboard/GameCard";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/Modal";
import { ProvablyFairModal } from "./ProvablyFairModal";
import RecentPlays from "@/components/sections/RecentPlays/RecentPlays";
import { SlideSection } from "@/components/Slider";
import { useGamba } from "gamba-react-v2";
import { useRouter } from "next/router";

function GameSlider() {
  return (
    <>
      <div className="block md:hidden">
        <SlideSection>
          <div className="max-w-sm flex gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory py-2">
            {GAMES.map((game) => (
              <div
                key={game.id}
                className="snap-start shrink-0 w-40 flex justify-center"
              >
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </SlideSection>
      </div>
      <div className="hidden md:block">
        <div className="flex flex-wrap justify-center">
          {GAMES.map((game) => (
            <div key={game.id} className="w-40 flex justify-center px-2 my-2">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CustomError() {
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

/**
 * A renderer component to display the contents of the loaded GambaUi.Game
 * Screen
 * Controls
 */
function CustomRenderer() {
  const gamba = useGamba();
  const { game } = GambaUi.useGame();
  const [info, setInfo] = useState(false);
  const [provablyFair, setProvablyFair] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const audioStore = useGambaAudioStore();
  const imagePath = `/games/${game.id}/logo.png`;

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
        {showSplash && (
          <div className="pointer-events-none absolute inset-0 flex justify-center items-center z-10 bg-[#0c0c11] text-6xl font-bold animate-[splashAnimation_1.5s_ease-out_forwards]">
            <img
              height="150px"
              src={imagePath}
              alt={`Splash for ${game.meta.name}`}
            />
          </div>
        )}
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
        <div
          className={`relative h-1 w-full overflow-hidden rounded-lg after:content-[' '] after:absolute after:w-[25%] after:h-full after:bg-[#9564ff] after:transition-opacity duration-500 ${
            gamba.isPlaying
              ? "after:animate-[loadingAnimation_0.5s_ease-infinite]"
              : "after:opacity-0"
          }`}
          key={Number(gamba.isPlaying)}
          data-active={gamba.isPlaying}
        />
        <div className="w-full bg-[#1A1B28] p-2 sm:p-5 text-white rounded-lg flex flex-wrap gap-2 sm:gap-5 items-center justify-center sm:flex-row">
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

interface GameProps {
  gameId: string;
}

export default function Game({ gameId }: GameProps) {
  const router = useRouter();
  const game = GAMES.find((x) => x.id === gameId);

  return (
    <>
      {game ? (
        <div className="flex flex-col justify-center items-center mx-auto max-w-6xl max-sm:max-w-sm pt-20">
          <GambaUi.Game game={game} errorFallback={<CustomError />}>
            <CustomRenderer />
          </GambaUi.Game>
        </div>
      ) : (
        <div className="bg-black animate-pulse mt-20 flex flex-col justify-center items-center mx-auto max-w-5xl px-10 py-20 rounded-lg shadow-xl">
          <div className="flex flex-col justify-center items-center max-w-lg rounded-lg">
            <video
              src="/gamba.mp4"
              className="w-full h-full"
              autoPlay
              muted
              playsInline
              loop
            />
            <p className="text-2xl text-white mt-5">
              Loading or Invalid game ID...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center mx-auto max-w-6xl max-sm:max-w-sm mb-4">
        <div className="py-4">
          <GameSlider />
        </div>
        <RecentPlays />
      </div>
    </>
  );
}

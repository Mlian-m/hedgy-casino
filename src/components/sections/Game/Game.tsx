// src/components/sections/Game/Game.tsx

import {
  Container,
  Controls,
  IconButton,
  LoadingIndicator,
  Screen,
  SettingControls,
  Splash,
} from "./Game.styles";
import { GambaUi, useGambaAudioStore } from "gamba-react-ui-v2";

import { GAMES } from "@/games";
import { GameCard } from "@/components/sections/Dashboard/GameCard";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/Modal";
import { ProvablyFairModal } from "./ProvablyFairModal";
import React from "react";
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
  const [info, setInfo] = React.useState(false);
  const [provablyFair, setProvablyFair] = React.useState(false);
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
      <Container>
        <Splash>
          <img
            height="150px"
            src={imagePath}
            alt={`Splash for ${game.meta.name}`}
          />
        </Splash>
        <Screen>
          <GambaUi.PortalTarget target="error" />
          <GambaUi.PortalTarget target="screen" />
          <SettingControls>
            <button
              onClick={() =>
                audioStore.set((audioStore.masterGain + 0.25) % 1.25)
              }
            >
              Volume: {audioStore.masterGain * 100}%
            </button>
          </SettingControls>
        </Screen>
        <LoadingIndicator
          key={Number(gamba.isPlaying)}
          $active={gamba.isPlaying}
        />
        <Controls>
          <div style={{ display: "flex" }}>
            <IconButton onClick={() => setInfo(true)}>
              <Icon.Info />
            </IconButton>
            <IconButton onClick={() => setProvablyFair(true)}>
              <Icon.Fairness />
            </IconButton>
          </div>
          <GambaUi.PortalTarget target="controls" />
          <GambaUi.PortalTarget target="play" />
        </Controls>
      </Container>
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
        <div className="mt-20 flex flex-col justify-center items-center mx-auto max-w-5xl px-10 py-20 rounded-lg shadow-xl">
          <div className="p-10 rounded-lg">
            <img
              src="/gamba.svg"
              alt="Loading..."
              className="w-48 h-48 animate-pulse"
            />
            <p className="text-2xl text-white mt-5">Invalid game ID...</p>
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

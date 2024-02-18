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

import { GAMES } from "../../../games";
import { GameSlider } from "../Dashboard/Dashboard";
import { Icon } from "../../Icon";
import { Modal } from "../../Modal";
import { ProvablyFairModal } from "./ProvablyFairModal";
import React from "react";
import RecentPlays from "../RecentPlays/RecentPlays";
import { useGamba } from "gamba-react-v2";
import { useRouter } from "next/router";

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
        <div className="flex flex-col justify-center items-center mx-auto max-sm:max-w-sm max-sm:pt-10">
          <GambaUi.Game
            game={game}
            errorFallback={<CustomError />}
            children={<CustomRenderer />}
          />
        </div>
      ) : (
        <h1 className="text-center">Game not found! 👎</h1>
      )}
      <div className="flex flex-col justify-center items-center mx-auto max-sm:max-w-sm">
        <GameSlider />
        <RecentPlays />
      </div>
    </>
  );
}

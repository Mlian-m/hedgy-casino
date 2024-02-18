// src/components/sections/Dashboard/Dashboard.tsx

import { GAMES } from "../../../games";
import { GameCard } from "./GameCard";
import React from "react";
import { SlideSection } from "../../Slider";
import { WelcomeBanner } from "./WelcomeBanner";

export function GameSlider() {
  return (
    <SlideSection>
      <div className="flex flex-wrap justify-center">
        {GAMES.map((game) => (
          <div key={game.id} className="w-40 flex justify-center">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </SlideSection>
  );
}

export function GameGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {GAMES.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <WelcomeBanner />
      <h2 className="text-center">Games</h2>
      <GameGrid />
    </>
  );
}

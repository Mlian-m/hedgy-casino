// src/components/sections/Dashboard/Dashboard.tsx

import { GAMES } from "../../../games";
import { GameCard } from "./GameCard";
import React from "react";
import { SlideSection } from "../../Slider";
import { WelcomeBanner } from "./WelcomeBanner";

export function GameSlider() {
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

export function GameGrid() {
  return (
    <div className="grid grid-cols-4 max-sm:grid-cols-3 gap-4">
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

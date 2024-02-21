// src/games/index.tsx

import { GameBundle } from "gamba-react-ui-v2";
import dynamic from "next/dynamic";

export const GAMES: GameBundle[] = [
  {
    id: "dice",
    meta: {
      background: "#ff6490",
      name: "Dice",
      image: "/games/dice.png",
      description: `Dice challenges players to predict the outcome of a roll with a unique twist. Select a number and aim to roll below it to win. Adjusting your choice affects potential payouts, balancing risk and reward for an engaging experience.`,
    },
    app: dynamic(() => import("./Dice")),
  },
  {
    id: "slots",
    meta: {
      background: "#5465ff",
      name: "Slots",
      image: "/games/slots.png",
      description: `Slots is the quintessential game of luck and anticipation. Spin the reels and match symbols to win, with potential rewards displayed upfront. A fair and exciting game, Slots offers a classic casino experience tailored for digital enjoyment.`,
    },
    app: dynamic(() => import("./Slots")),
  },
  {
    id: "flip",
    meta: {
      name: "Flip",
      description: `Flip offers a straightforward yet thrilling gamble: choose Heads or Tails and double your money or lose it all. This simple, high-stakes game tests your luck and decision-making with every flip of the coin.`,
      image: "/games/flip.png",
      background: "#ffe694",
    },
    app: dynamic(() => import("./Flip")),
  },
  {
    id: "hilo",
    meta: {
      name: "HiLo",
      image: "/games/hilo.png",
      description: `HiLo is a game of foresight and luck, challenging players to guess whether the next card will be higher or lower. Make consecutive correct guesses to increase your winnings, and decide when to cash out for maximum rewards.`,
      background: "#ff4f4f",
    },
    props: { logo: "/logo.svg" },
    app: dynamic(() => import("./HiLo")),
  },
  {
    id: "mines",
    meta: {
      name: "Mines",
      description: `Mines is a strategic game of risk and reward. Uncover squares to find hidden treasures, but beware of mines that could end your game instantly. With every square, the stakes get higher, offering a thrilling experience for daring players.`,
      image: "/games/mines.png",
      background: "#8376ff",
    },
    app: dynamic(() => import("./Mines")),
  },
  {
    id: "roulette",
    meta: {
      name: "Roulette",
      image: "/games/roulette.png",
      description: `Roulette brings the classic wheel-spinning game to life with a digital twist. Bet on where the ball will land and watch as the wheel decides your fate. With straightforward rules and the chance for big wins, Roulette is a timeless game of chance.`,
      background: "#1de87e",
    },
    app: dynamic(() => import("./Roulette")),
  },
  {
    id: "plinko",
    meta: {
      background: "#7272ff",
      image: "/games/plinko.png",
      name: "Plinko",
      description: `Plinko combines strategy with chance, inviting players to drop chips down a pegged board to land in winning slots. Each drop is a mix of anticipation and strategy, making Plinko an endlessly entertaining game of chance.`,
    },
    app: dynamic(() => import("./Plinko")),
  },
  {
    id: "wheel",
    meta: {
      background: "#77bbff",
      image: "/games/wheel.png",
      name: "Wheel",
      description: `Wheel is a classic game of chance and luck. Spin the wheel and land on a multiplyer to win. With the power of chance and luck, Wheel offers a fun and engaging gaming experience.`,
    },
    app: dynamic(() => import("./Wheel"), { ssr: false }),
  },
];

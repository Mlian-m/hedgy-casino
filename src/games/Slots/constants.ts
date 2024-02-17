// src/games/Slots/constants.ts
export const SOUND_LOSE = "../../../public/games/Slots/lose.mp3";
export const SOUND_PLAY = "../../../public/games/Slots/insert.mp3";
export const SOUND_REVEAL_LEGENDARY =
  "../../../public/games/Slots/reveal-legendary.mp3";
export const SOUND_REVEAL = "../../../public/games/Slots/reveal.mp3";
export const SOUND_SPIN = "../../../public/games/Slots/spin.mp3";
export const SOUND_WIN = "../../../public/games/Slots/win.mp3";
export const IMAGE_2X = "../../../public/games/Slots/2x.png";
export const IMAGE_3X = "../../../public/games/Slots/3x.png";
export const IMAGE_5X = "../../../public/games/Slots/5x.png";
export const IMAGE_COOL = "../../../public/games/Slots/emoji-cool.png";
export const IMAGE_HEARTS = "../../../public/games/Slots/emoji-hearts.png";
export const IMAGE_UNICORN = "../../../public/games/Slots/unicorn.png";
export const IMAGE_WOJAK = "../../../public/games/Slots/wojak.png";

export interface SlotItem {
  multiplier: number;
  image: string;
}

const slotItem = (multiplier: number, ...icons: string[]): SlotItem[] =>
  icons.map((image) => ({ multiplier, image }));

export const SLOT_ITEMS = [
  slotItem(7, IMAGE_UNICORN),
  slotItem(5, IMAGE_5X),
  slotItem(3, IMAGE_3X),
  slotItem(2, IMAGE_2X),
  slotItem(1, IMAGE_COOL, IMAGE_HEARTS),
  slotItem(0.5, IMAGE_WOJAK),
].flat();

export const NUM_SLOTS = 3;
// MS that it takes for spin to finish and reveal to start
export const SPIN_DELAY = 1000;
// MS between each slot reveal
export const REVEAL_SLOT_DELAY = 500;
// MS after reveal until win / lose effect is played
export const FINAL_DELAY = 500;
//
export const LEGENDARY_THRESHOLD = 5;

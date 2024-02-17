export const WAGER_AMOUNTS = [100_000, 1_000_000]

export const MAX_CARD_SHOWN = 5

export const RANK_SYMBOLS: Record<number, string> = {
  0: '2',
  1: '3',
  2: '4',
  3: '5',
  4: '6',
  5: '7',
  6: '8',
  7: '9',
  8: '10',
  9: 'J',
  10: 'Q',
  11: 'K',
  12: 'A',
}
export const RANKS = Object.keys(RANK_SYMBOLS).length

export const SOUND_CARD = '../../../public/games/HiLo/card.mp3'
export const SOUND_FINISH = '../../../public/games/HiLo/finish.mp3'
export const SOUND_LOSE = '../../../public/games/HiLo/lose.mp3'
export const SOUND_PLAY = '../../../public/games/HiLo/play.mp3'
export const SOUND_WIN = '../../../public/games/HiLo/win.mp3'

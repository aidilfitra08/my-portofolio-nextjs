export interface BingoTheme {
  id: string;
  name: string;
  description: string;
}

export const BINGO_THEMES: BingoTheme[] = [
  {
    id: "retro-terminal",
    name: "Retro Terminal",
    description: "Matches the portfolio's vintage terminal aesthetic.",
  },
];

export const shuffleArray = <T,>(items: T[]) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
};

export const buildBingoBoard = (texts: string[]) => {
  const normalized = texts.map((text) => text.trim()).filter(Boolean);

  if (normalized.length === 0) {
    return Array.from({ length: 25 }, () => "Add bingo words in admin");
  }

  const pool = [...normalized];

  while (pool.length < 25) {
    pool.push(...normalized);
  }

  return shuffleArray(pool).slice(0, 25);
};

export const getWinningLine = (marked: boolean[]) => {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  return lines.find((line) => line.every((index) => marked[index])) || null;
};
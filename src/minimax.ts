
export const minimax = (tempBoard: (string | null)[], isMax: boolean, aiMark: string, playerMark: string): number => {
  const check = (b: (string | null)[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return b.includes(null) ? null : "draw";
  };

  const winner = check(tempBoard);
  if (winner === aiMark) return 10;
  if (winner === playerMark) return -10;
  if (winner === "draw") return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!tempBoard[i]) {
        tempBoard[i] = aiMark;
        best = Math.max(best, minimax(tempBoard, false, aiMark, playerMark));
        tempBoard[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!tempBoard[i]) {
        tempBoard[i] = playerMark;
        best = Math.min(best, minimax(tempBoard, true, aiMark, playerMark));
        tempBoard[i] = null;
      }
    }
    return best;
  }
};


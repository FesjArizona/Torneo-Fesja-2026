/* export interface Bracket {
  sport: string;
  winners: Match[][];
  losers: Match[][];
} */

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Match {
  id: string;
  team1: Team | null;
  team2: Team | null;
  score1: number | null;
  score2: number | null;
  isFinished: boolean;
  winnerTo?: string | null;
  loserTo?: string | null;
  isChampionship?: boolean;
}

export interface Bracket {
  winners: Match[][]; // Array of rounds (Match[])
  losers: Match[][];  // Array of rounds
  championship: Match[];
}

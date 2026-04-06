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

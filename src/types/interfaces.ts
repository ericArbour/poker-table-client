export interface ITable {
  id: string;
  name: string;
  players: IPlayer[];
}

export interface IPlayer {
  id: string;
  holeCards: string;
  chipCount: number;
}

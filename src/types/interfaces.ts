export interface ITable {
  tableId: string;
  name: string;
  players: IPlayer[];
}

export interface IPlayer {
  playerId: string;
  holeCards: string;
  chipCount: number;
}

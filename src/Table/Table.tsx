import * as React from 'react';
import { ITable, IPlayer } from '../shared/types/interfaces';

interface IProps {
  tableInfo: ITable;
  startGame: () => void;
}

const Table = (props: IProps) => {
  return (
    <div>
      <h3>{props.tableInfo.name}</h3>
      <ol>
        {props.tableInfo.players.map((player: IPlayer) => (
          <li key={player.id}>
            <h4>Player ID: {player.id}</h4>
            <p>Chip Count: {player.chipCount}</p>
            <p>Hole Cards: {player.holeCards}</p>
          </li>
        ))}
      </ol>
      {props.tableInfo.players.length > 1 ? (
        <button onClick={props.startGame}>Start Game</button>
      ) : null}
    </div>
  );
};

export default Table;

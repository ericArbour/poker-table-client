import * as React from 'react';
import { ITable, IPlayer } from '../types/interfaces';

interface IProps {
  tableInfo: ITable;
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
    </div>
  );
};

export default Table;

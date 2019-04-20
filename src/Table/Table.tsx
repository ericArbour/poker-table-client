import * as React from "react";
import { ITable } from "../shared/types/interfaces";

interface IProps {
  tableInfo: ITable;
  startGame: () => void;
}

const Table = ({ tableInfo, startGame }: IProps) => {
  console.log(tableInfo);
  return (
    <div>
      <h3>{tableInfo.name}</h3>
      <p>Player Count: {tableInfo.players.length}</p>
      {tableInfo.players.length > 1 ? (
        <button onClick={startGame}>Start Game</button>
      ) : null}
    </div>
  );
};

export default Table;

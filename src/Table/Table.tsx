import React, { useContext, useCallback } from "react";
import Game from "../Game/Game";
import ConnectionContext from "../shared/contexts/ConnectionContext";
import { ITable } from "../shared/types/interfaces";

type Props = {
  table: ITable | null;
};

export default ({ table }: Props) => {
  const connection = useContext(ConnectionContext);
  const startGame = useCallback(
    () => connection.invoke("StartGame").catch(),
    []
  );

  if (!table) {
    return <p>Create or select table to view.</p>;
  }

  return (
    <div>
      <h2>Table</h2>
      <p>Table Name: {table.name}</p>
      <p>Players:</p>
      <ul>
        {table.players.map(player => (
          <li key={player.id}>{player.id}</li>
        ))}
      </ul>
      {!table.isPlaying && table.players.length > 1 ? (
        <button onClick={startGame}>Start Game</button>
      ) : null}
      {table.isPlaying ? <Game tableId={table.id} /> : null}
    </div>
  );
};

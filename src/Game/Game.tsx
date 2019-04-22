import React, { useContext, useEffect, useState } from "react";
import ConnectionContext from "../shared/contexts/ConnectionContext";
import { IPlayer } from "../shared/types/interfaces";

type Props = {
  tableId: string;
};

type PublicGameState = {
  pot: number;
  players: IPlayer[];
  currentPlayer: string;
  hand: string[];
};

export default ({ tableId }: Props) => {
  const connection = useContext(ConnectionContext);
  const [
    publicGameState,
    setPublicGameState
  ] = useState<PublicGameState | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    connection.on("PostPublicGameState", updatedGameState =>
      setPublicGameState(updatedGameState)
    );

    connection
      .invoke("GetPublicGameState")
      .catch(err => setError("Error retrieving game."));

    return function cleanup() {
      connection.off("PostPublicGameState");
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!publicGameState) {
    return <p>Loading game state...</p>;
  }

  return (
    <div>
      <h3>Game</h3>
      <p>Pot: {publicGameState.pot}</p>
      <p>Current Player Turn: {publicGameState.currentPlayer}</p>
    </div>
  );
};

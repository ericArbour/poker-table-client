import React, { useContext, useState, useEffect, useCallback } from "react";
import { Router, Link, navigate } from "@reach/router";
import ConnectionContext from "../shared/contexts/ConnectionContext";
import Route from "../shared/Route/Route";
import Home from "../Home/Home";
import Table from "../Table/Table";
import { ITable } from "../shared/types/interfaces";

export default () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [table, setTable] = useState<ITable | null>(null);
  const connection = useContext(ConnectionContext);
  const createTable = useCallback(tableName => {
    connection.invoke("CreateTable", tableName).catch(err => setHasError(true));
    navigate("/table");
  }, []);

  useEffect(() => {
    connection
      .start()
      .then(() => setIsConnected(true))
      .catch(err => {
        setHasError(true);
      });

    connection.on("TableCreated", (newTable: ITable) => {
      setTable(newTable);
    });

    connection.on("TableUpdated", (updatedTable: ITable) =>
      setTable(updatedTable)
    );

    return function cleanup() {
      connection.off("TableCreated");
      connection.off("TableUpdated");
      connection.stop();
    };
  }, [connection]);

  if (hasError) {
    return <p>Error connecting to server</p>;
  } else if (!isConnected) {
    return <p>Connecting...</p>;
  } else {
    return (
      <div>
        <h1>Poker</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Router>
          <Route path="/" render={<Home createTable={createTable} />} />
          <Route path="table" render={<Table table={table} />} />
        </Router>
      </div>
    );
  }
};

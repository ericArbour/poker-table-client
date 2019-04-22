import React, { useState, useCallback } from "react";

type Props = {
  createTable: (tableName: string) => void;
};

export default ({ createTable }: Props) => {
  const [newTableName, setNewTableName] = useState("");
  const handleChange = useCallback(e => setNewTableName(e.target.value), []);
  const handleClick = useCallback(() => createTable(newTableName), [
    newTableName
  ]);

  return (
    <div>
      <label>
        Table Name
        <input value={newTableName} onChange={handleChange} />
      </label>
      <button disabled={newTableName.length === 0} onClick={handleClick}>
        Create Table
      </button>
    </div>
  );
};

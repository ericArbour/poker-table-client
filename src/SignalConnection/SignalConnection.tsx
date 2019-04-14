import * as React from "react";
import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr";
import Table from "../Table/Table";
import { ITable } from "../shared/types/interfaces";

const connection: HubConnection = new HubConnectionBuilder()
  .withUrl("http://10.0.0.66:5000/pokerHub")
  .build();

interface IState {
  connected: boolean;
  error: string;
  tableInfo: ITable | null;
  tableName: string;
}

class SignalConnection extends React.Component<{}, IState> {
  public state: IState = {
    connected: false,
    error: "",
    tableInfo: null,
    tableName: ""
  };

  constructor(props: any) {
    super(props);

    this.createTable = this.createTable.bind(this);
    this.startGame = this.startGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    connection
      .start()
      .then(() => this.setState({ connected: true }))
      .catch(err => this.setState({ error: err.toString() }));

    connection.on("TableCreated", (tableInfo: ITable) => {
      this.setState({ tableInfo });
    });

    connection.on("TableUpdated", (tableInfo: ITable) => {
      this.setState({ tableInfo });
    });

    connection.on("GameStarted", (gameInfo: ITable) => {
      console.log(gameInfo);
    });
  }

  public createTable() {
    const { tableName } = this.state;
    connection
      .invoke("CreateTable", tableName)
      .catch(err => this.setState({ error: err.toString() }));
  }

  public startGame() {
    connection
      .invoke("StartGame")
      .catch(err => this.setState({ error: err.toString() }));
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ tableName: event.currentTarget.value });
  }

  public render() {
    if (!this.state.connected) {
      return <div>Loading...</div>;
    }
    if (this.state.tableInfo) {
      return (
        <Table tableInfo={this.state.tableInfo} startGame={this.startGame} />
      );
    }
    return (
      <div>
        <label>
          Table Name
          <input value={this.state.tableName} onChange={this.handleChange} />
        </label>
        <button
          disabled={this.state.tableName.length === 0}
          onClick={this.createTable}
        >
          Create Group
        </button>
      </div>
    );
  }
}

export default SignalConnection;

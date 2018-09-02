import * as React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import Table from '../Table/Table';
<<<<<<< HEAD
import { ITable } from 'shared/src/types/interfaces';
=======
import { ITable } from '../types/interfaces';
>>>>>>> a2d54a03c42edbe4fb547108c2861bdd0a32dd83

const connection = new HubConnectionBuilder()
  .withUrl('http://192.168.1.78:5000/pokerHub')
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
    error: '',
    tableInfo: null,
    tableName: ''
  };

  constructor(props: any) {
    super(props);

    this.createTable = this.createTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    connection
      .start()
      .then(() => this.setState({ connected: true }))
      .catch(err => this.setState({ error: err.toString() }));

    connection.on('TableCreated', tableInfo => {
      this.setState({ tableInfo });
    });

    connection.on('TableUpdated', tableInfo => {
      this.setState({ tableInfo });
    });
  }

  public createTable() {
    const { tableName } = this.state;
    connection
      .invoke('CreateTable', tableName)
      .catch(err => this.setState({ error: err.toString() }));
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ tableName: event.currentTarget.value });
  }

  public render() {
<<<<<<< HEAD
    console.log();
=======
>>>>>>> a2d54a03c42edbe4fb547108c2861bdd0a32dd83
    if (!this.state.connected) {
      return <div>Loading...</div>;
    }
    if (this.state.tableInfo) {
      return <Table tableInfo={this.state.tableInfo} />;
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

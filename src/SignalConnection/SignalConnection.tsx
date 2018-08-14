import * as React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

const connection = new HubConnectionBuilder()
  .withUrl('http://192.168.1.78:5000/pokerHub')
  .build();

interface IState {
  groupName: string;
  playerCount: number;
}

class SignalConnection extends React.Component<{}, IState> {
  public state: IState = {
    groupName: '',
    playerCount: 1
  };

  constructor(props: any) {
    super(props);

    this.createGroup = this.createGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    connection.start().catch(err => console.error(err.toString()));

    connection.on('GroupCreated', groups => {
      console.log(groups);
    });
  }

  public createGroup() {
    const { groupName } = this.state;
    connection
      .invoke('CreateGroup', groupName)
      .catch(err => console.error(err.toString()));
    this.setState({ groupName: '' });
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ groupName: event.currentTarget.value });
  }

  public render() {
    console.log(this.state.groupName);
    return (
      <div>
        <label>
          Table Name
          <input value={this.state.groupName} onChange={this.handleChange} />
        </label>
        <button
          disabled={this.state.groupName.length === 0}
          onClick={this.createGroup}
        >
          Create Group
        </button>
      </div>
    );
  }
}

export default SignalConnection;

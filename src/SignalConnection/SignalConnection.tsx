import * as React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

const connection = new HubConnectionBuilder()
  .withUrl('http://192.168.1.78:5000/chatHub')
  .build();

interface IState {
  playerCount: number;
}

class SignalConnection extends React.Component<{}, IState> {
  public state: IState = {
    playerCount: 1
  };

  public componentDidMount() {
    connection.start().catch(err => console.error(err.toString()));

    connection.on('PlayerCount', playerCount => {
      this.setState({ playerCount });
    });

    connection.on('GameReady', () => {
      console.log('we ready we ready');
    });
  }

  public render() {
    return <div>Number of players: {this.state.playerCount}</div>;
  }
}

export default SignalConnection;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default class App extends React.Component {
  state = { name: 'Bob', time: new Date().toLocaleString() };

  constructor() {
    super();

    this.socket = io('http://localhost:3000/', { jsonp: false });

    this.socket.on('hiupdate', () => {
      this.setState({ name: 'Nate' });
    });

    this.socket.on('hiupdate', () => {
      const time = new Date().toLocaleString();
      this.setState({ time: time });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <Text>{this.state.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

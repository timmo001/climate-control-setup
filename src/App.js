import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import { Connector } from 'mqtt-react';
import Main from './Components/Main';
import 'typeface-roboto';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blueGrey,
    secondary: cyan,
    mainBackground: grey[900],
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    typography: {
      useNextVariants: true
    }
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Connector mqttProps={{
          url: process.env.REACT_APP_MQTT_WEBSOCKET,
          username: process.env.REACT_APP_MQTT_USERNAME,
          password: process.env.REACT_APP_MQTT_PASSWORD
        }}>
          <Main />
        </Connector>
      </MuiThemeProvider>
    );
  }
}

export default App;

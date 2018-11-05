import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Save from '@material-ui/icons/Save';
import { subscribe } from 'mqtt-react';
import Time from './Time';

const topic = 'timer/climate';

class Main extends Component {
  state = {
    data: [
      { name: '', timeFrom: moment(), timeTo: moment() }
    ]
  };

  componentDidMount = () => this.handleUpdateState();

  componentDidUpdate = prevProps =>
    prevProps.data !== this.props.data && this.handleUpdateState();

  handleUpdateState = () =>
    this.props.data && this.setState({
      data: this.props.data.length > 0 ? this.props.data : [
        { name: '', timeFrom: moment(), timeTo: moment() }
      ]
    });

  handleChange = (key, item) => {
    const { data } = this.state;
    data[key] = item;
    this.setState({ data });
  };

  handleAddTimer = () => {
    this.setState({
      data: this.state.data.push({
        name: '',
        timeFrom: moment(),
        timeTo: moment()
      })
    });
  };

  handleSave = () => {
    const { mqtt } = this.props;
    mqtt.publish(topic, this.state.data, { qos: 1, retain: true });
  };

  render() {
    const { data } = this.state;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center">
        {data.map((item, key) => (
          <Grid key={key} item>
            <Time
              item={item}
              key={key}
              handleChange={this.handleChange} />
          </Grid>
        )}
        <Grid item>
          <IconButton style={{ margin: 8 }} onClick={this.handleAddTimer}>
            <Add />
          </IconButton>
          <IconButton style={{ margin: 8 }} onClick={this.handleSave}>
            <Save />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

Main.propTypes = {
  data: PropTypes.array
};

export default subscribe({ topic })(Main);

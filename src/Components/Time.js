import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';

const styles = theme => ({
  container: {
    display: 'flex',
    margin: theme.spacing.unit
  },
  textField: {
    marginRight: theme.spacing.unit,
    width: 120
  },
  hyphen: {
    margin: theme.spacing.unit
  }
});

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      timeFrom: props.timeFrom,
      timeTo: props.timeTo
    };
  }

handleChange = () => this.props.handleChange({
  name: this.state.name,
  timeFrom: this.state.timeFrom,
  timeTo: this.state.timeTo
});

  handleNameChanged = e => this.setState({ name: e.target.value },()=>this.handleChange());
  handleTimeFromChanged = date => this.setState({ timeFrom: date },()=>this.handleChange());
  handleTimeToChanged = date => this.setState({ timeTo: date },()=>this.handleChange());

  render() {
    const { classes } = this.props;
    const { name, timeFrom, timeTo } = this.state;
    return (
      <form className={classes.container} noValidate>
        <TextField
          className={classes.textField}
          id="name"
          placeholder="Timer Name"
          type="text"
          value={name}
          onChange={this.handleNameChanged}
          autoFocus
          inputProps={{
            autoCapitalize: 'words'
          }} />

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TimePicker
            value={timeFrom}
            onChange={this.handleTimeFromChanged} />
          <Typography className={classes.hyphen} variant="subheading">
            -
          </Typography>
          <TimePicker
            value={timeTo}
            onChange={this.handleTimeToChanged} />
        </MuiPickersUtilsProvider>
      </form>
    );
  }
}

Time.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Time);

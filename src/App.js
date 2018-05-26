import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import logo from './logo.svg';
import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  state = {
    checkedB: false
  }

  componentDidMount() {
    axios.get('http://192.168.1.8:3001/api/light')
      .then(response => {
        console.log(response.data);
        if (response.data.status === 0) {
          this.setState({ checkedB: true })
        } else {
          this.setState({ checkedB: false })
        }
      })
  }

  handleChange = name => event => {
    axios.post('http://192.168.1.8:3001/api/light', {
      status: this.state.checkedB
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(event.target.checked);
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Pompa Smart :-)
          </h1>
          <h1 className="App-title">
            <Switch
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          </h1>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(App);

import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { API } from 'config/constants';

const AutoManual = styled.span`
  ${props => `color: ${props.color}`};
`;

class LoginDialog extends Component {

  state = {
    open: false,
    password: ''
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin = () => {
    const { password } = this.state;
    const {
      mode,
      onUpdateMode
    } = this.props;
    const { handleClose } = this;


    axios.post(`${API}/mode`, {
      password,
      mode: mode === 'manual' ? 'auto' : 'manual'
    })
      .then(function (response) {
        if (response.data.access) {
          onUpdateMode({
            mode: mode === 'manual' ? 'auto' : 'manual',
            modeTime: response.data.modeTime
          });
          handleClose();
        } else {
          handleClose();
        }
      })
      .catch(function (error) {
        console.log(error);
        handleClose();
      });
  };

  render() {
    const { mode } = this.props;
    return (
      <div>
        <AutoManual color={mode === 'manual' ? '#7AC943' : '#BDBDBD'}>Manual</AutoManual>
        <Switch
          checked={mode === 'auto'}
          onChange={this.handleClickOpen}
          value="mode"
          color="primary"
        />
        <AutoManual color={mode === 'auto' ? '#7AC943' : '#BDBDBD'}>Auto</AutoManual>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">needs the password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="password"
              type="text"
              fullWidth
              onChange={this.handlePasswordChange}
              onKeyPress={(ev) => ev.key === 'Enter' && this.handleLogin()}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default LoginDialog;

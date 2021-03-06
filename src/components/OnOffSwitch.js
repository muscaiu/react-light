import React, { Component } from 'react';
// import axios from 'axios';
import styled from 'styled-components';

import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// import { API } from 'config/constants';

const OnOff = styled.span`
  ${props => `color: ${props.color}`};
`;

class OnOffSwitch extends Component {

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
    // const { password } = this.state;
    // const {
    //   isActive,
    //   onOpdateState
    // } = this.props;
    this.props.onStatusClick();
    
    // const { handleClose } = this;
    // axios.post(`${API}/login`, { password })
    //   .then(function (response) {
    //     if (response.data.access) {
    //       axios.post(`${API}/light`, {
    //         status: !isActive
    //       })
    //         .then(function (response) { console.log(response.data) })
    //         .catch(function (error) { console.log(error) });

    //       onOpdateState({
    //         status: !isActive,
    //         lastAction: response.data.lastAction
    //       });
    //       handleClose();
    //     } else {
    //       handleClose();
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     handleClose();
    //   });
    this.handleClose();
  };

  render() {
    const { isActive, isEnabled } = this.props;

    return (
      <div>
        <OnOff color={isActive ? '#BDBDBD' : '#7AC943'}>Off</OnOff>
        <Switch
          disabled={isEnabled}
          checked={isActive}
          onChange={this.handleClickOpen}
          value="isActive"
          color="primary"
        />
        <OnOff color={isActive ? '#7AC943' : '#BDBDBD'}>On</OnOff>

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

export default OnOffSwitch;

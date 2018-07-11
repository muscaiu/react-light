import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Switch from '@material-ui/core/Switch';
import Spinner from 'components/Spinner';
import Log from 'components/Log';
import { API } from 'config/constants';
import { isatty } from 'tty';

const Wrapper = styled.div`
  padding-top: 50px;
`;

class Header extends Component {
  state = {
    isActive: false,
    lastAction: null
  }

  componentDidMount() {
    axios.get(`${API}/light`)
      .then(response => {
        console.log(response.data);
        if (response.data.status === 0) {
          this.setState({ isActive: true })
        } else {
          this.setState({ isActive: false })
        }
        this.setState({ lastAction: response.data.lastAction })
      })
  };

  handleChange = name => event => {
    axios.post(`${API}/light`, {
      status: this.state.isActive
    })
      .then(function (response) { console.log(response.data, event.target.checked) })
      .catch(function (error) { console.log(error) });

    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { isActive } = this.state;
    return (
      <Wrapper>
        <Spinner isActive={isActive} />
        <Switch
          checked={isActive}
          onChange={this.handleChange('isActive')}
          value="isActive"
          color="primary"
        />
        <Log
          lastAction={this.state.lastAction}
          isActive={isActive}
        />
      </Wrapper>
    )
  }
}

export default Header;

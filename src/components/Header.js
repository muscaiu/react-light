import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { API } from 'config/constants';
import Spinner from 'components/Spinner';
import Log from 'components/Log';
import LoginDialog from './LoginDialog';
import Weather from './Weather';
import pack from '../../package.json'

const Wrapper = styled.div`
  padding-top: 50px;
`;

const Version = styled.div`
  font-size: 9px;
  color: grey;
  position: fixed;
  bottom: 0;
  padding: 10px;
`;

class Header extends Component {
  state = {
    loading: false,
    isActive: false,
    lastAction: null,
    lastWeatherUpdate: null
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(`${API}/light`)
      .then(response => {
        this.setState({ loading: false });
        console.log(response.data);
        if (response.data.status === 0) {
          this.setState({ isActive: true })
        } else {
          this.setState({ isActive: false })
        }
        this.setState({
          lastAction: response.data.lastAction,
          lastWeatherUpdate: response.data.lastWeatherUpdate
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      })
  };

  updateState = (data) => {
    this.setState({
      isActive: data.status,
      lastAction: data.lastAction
    });
  };

  render() {
    const { loading, isActive, lastWeatherUpdate } = this.state;
    return (
      <Wrapper>
        {
          !loading ?
            <div>
              <Spinner isActive={isActive} />
              <LoginDialog
                isActive={isActive}
                onOpdateState={this.updateState}
              />
              <Log
                lastAction={this.state.lastAction}
                isActive={isActive}
              />
              {lastWeatherUpdate &&
                <Weather lastWeatherUpdate={lastWeatherUpdate} />
              }
              <br />
              <br />
              <br />
              <br />
              <Version>version: {pack.version}</Version>
            </div> :
            null
        }
      </Wrapper>
    )
  }
}

export default Header;

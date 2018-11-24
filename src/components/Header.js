import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { API } from 'config/constants';
import Spinner from 'components/Spinner';
import Log from 'components/Log';
import OnOffSwitch from './OnOffSwitch';
import AutoManualSwitch from './AutoManualSwitch';
import Weather from './Weather';
import pack from '../../package.json'

const Wrapper = styled.div`
  padding-top: 50px;
`;

const Version = styled.div`
  color: darkgrey;
  font-size: 8px;
  position: fixed;
  bottom: 10px;
  padding: 10px;
`;
const ApiVersion = styled.div`
  color: darkgrey;
  font-size: 8px;
  position: fixed;
  bottom: 0;
  padding: 10px;
`;

class Header extends Component {
  state = {
    loading: false,
    isActive: false,
    lastAction: null,
    lastWeatherUpdate: null,
    mode: null,
    modeTime: null
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
          lastWeatherUpdate: response.data.lastWeatherUpdate,
          apiVersion: response.data.apiVersion,
          mode: response.data.mode
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

  updateMode = (data) => {
    console.log('data.mode', data.mode);
    this.setState({
      mode: data.mode,
      modeTime: data.modeTime
    });
  };

  render() {
    const { loading, isActive, mode, lastWeatherUpdate, apiVersion } = this.state;
    return (
      <Wrapper>
        {
          !loading ?
            <div>
              <Spinner isActive={isActive} />
              <AutoManualSwitch
                mode={mode}
                onUpdateMode={this.updateMode}
              />
              <OnOffSwitch
                isEnabled={mode === 'auto'}
                isActive={isActive}
                onOpdateState={this.updateState}
              />
              <Log
                lastAction={this.state.lastAction}
                mode={this.state.mode}
                isActive={isActive}
              />
              {lastWeatherUpdate &&
                <Weather lastWeatherUpdate={lastWeatherUpdate} />
              }
              <Version>version: {pack.version}</Version>
              <ApiVersion>api version: {apiVersion}</ApiVersion>
            </div> :
            null
        }
      </Wrapper>
    )
  }
}

export default Header;

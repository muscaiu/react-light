import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

import { API } from 'config/constants';
import Spinner from 'components/Spinner';
import Log from 'components/Log';
import OnOffSwitch from './OnOffSwitch';
import AutoManualSwitch from './AutoManualSwitch';
import Weather from './Weather';
import pack from '../../package.json'
import { toggleStatus } from '../actions/statusActions';

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
    isActive: false,
    lastAction: null,
    lastWeatherUpdate: null,
    mode: null,
    modeTime: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const status = nextProps.status && nextProps.status[0].status
    console.log('getDerivedStateFromProps status', status);
    return {
      isActive: status
    }
  }

  updateMode = (data) => {
    console.log('data.mode', data.mode);
    this.setState({
      mode: data.mode,
      modeTime: data.modeTime
    });
  };

  // updateState = () => {
  //   this.setState({
  //     isActive: !this.state.isActive,
  //     lastAction: this.state.lastAction
  //   });
  // };

  hanldeToggleStats = () => {
    console.log('toggle', this.state.isActive);
    this.props.toggleStatus(this.state.isActive);
  }

  render() {
    const { mode, lastWeatherUpdate, apiVersion } = this.state;
    const status = this.props.status && this.props.status[0].status;
    console.log(isLoaded(status));

    return (
      <Wrapper>
        {
          isLoaded(status) ?
            <div>
              <Spinner isActive={status} />
              <AutoManualSwitch
                mode={mode}
                onUpdateMode={this.updateMode}
              />
              <OnOffSwitch
                isEnabled={mode === 'auto'}
                isActive={status}
                onStatusClick={this.hanldeToggleStats}
                // onUpdateState={this.updateState}
              />
              <Log
                lastAction={this.state.lastAction}
                mode={this.state.mode}
                isActive={status}
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

function mapStateToProps(state) {
  return {
    status: state.firestore.ordered.status,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleStatus: status => dispatch(toggleStatus(status))
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'status', limit: 1, orderBy: ['createdAt', 'desc'] }
  ])
)(Header);

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
import * as actions from '../actions/actions';

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
    mode: 'manual',
    lastAction: 'qqq'
  }
  hanldeToggleMode = () => {
    this.props.toggleMode(this.props.fbMode);
  }

  hanldeToggleStats = () => {
    this.props.toggleStatus(this.props.fbStatus);
  }

  render() {
    const { mode, apiVersion } = this.state;
    const { fbStatus, fbLastAction } = this.props;

    console.log(fbStatus, fbLastAction);
    console.log('isLoaded', isLoaded(fbStatus));

    return (
      <Wrapper>
        {
          isLoaded(fbStatus) ?
            <div>
              <Spinner isActive={fbStatus} />
              <AutoManualSwitch
                mode={mode}
                onUpdateMode={this.updateMode}
              />
              <OnOffSwitch
                isEnabled={mode === 'auto'}
                isActive={fbStatus}
                onStatusClick={this.hanldeToggleStats}
              />
              <Log
                lastAction={fbLastAction}
                mode={this.state.mode}
                isActive={fbStatus}
              />
              {/* {lastWeatherUpdate &&
                <Weather lastWeatherUpdate={lastWeatherUpdate} />
              } */}
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
  const fbStatusList = state.firestore.ordered.status;
  return {
    fbStatus: fbStatusList && fbStatusList[0].value,
    fbLastAction: fbStatusList && fbStatusList[0].createdAt
  }
}

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect([
    { collection: 'status', limit: 1, orderBy: ['createdAt', 'desc'] }
  ])
)(Header);

import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
var distanceInWordsToNow = require('date-fns/distance_in_words_to_now');

const Wrapper = styled.div`

`;

const LastAction = styled.div`
  color: grey;
`;

const Distance = styled.div`
  color: #7AC943;
`;

const Error = styled.div`
  color: red;
`;

class Log extends Component {
  formatDate = (date) => {
    return format(date, 'HH:mm DD/MMM')
  }

  getDistance = (date) => {
    return distanceInWordsToNow(date)
  }

  render() {
    const { isActive, lastAction } = this.props;

    return (
      lastAction ?
        <Wrapper>
          <LastAction>
            last action: {this.formatDate(lastAction)}
          </LastAction>
          <Distance>
            {isActive ? 'ON' : 'OFF'} for: {this.getDistance(lastAction)}
          </Distance>
        </Wrapper> :
        <Error >
          Invalid data
        </Error >
    )
  }
}

export default Log;

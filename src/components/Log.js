import React, { Component } from 'react';
import styled from 'styled-components';
var distanceInWordsToNow = require('date-fns/distance_in_words_to_now');

const Wrapper = styled.div`

`;

const Distance = styled.div`
  color: #7AC943;
`;

const Error = styled.div`
  color: red;
`;

class Log extends Component {

  getDistance = (date) => {
    return distanceInWordsToNow(date)
  }

  render() {
    const { isActive, lastAction, mode } = this.props;

    return (
      lastAction ?
        <Wrapper>
          <Distance>
            {isActive ? 'ON' : 'OFF'} for: {this.getDistance(lastAction)}
          </Distance>
          {/* <Distance>
            {isActive ? 'ON' : 'OFF'} for: {this.getDistance(lastAction)}
          </Distance> */}
        </Wrapper> :
        <Error >Invalid server data</Error >
    )
  }
}

export default Log;

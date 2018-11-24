import React, { Component } from 'react';
import styled from 'styled-components';
var distanceInWordsToNow = require('date-fns/distance_in_words_to_now');

const Wrapper = styled.div`
  padding-top: 40px;
`;
const Distance = styled.div`
  color: #7AC943;
`;
const Error = styled.div`
  color: red;
`;
const AutoModeLog = styled.div`
  padding-top: 20px;
  font-size: 13px;
  color: #BDBDBD;
`

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
          <AutoModeLog>
            Auto interval : 19:00 - 20:00
          </AutoModeLog>
        </Wrapper> :
        <Error >Invalid server data</Error >
    )
  }
}

export default Log;

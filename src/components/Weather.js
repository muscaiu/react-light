import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const WeatherValue = styled.span`
  font-size: 13px;
  color: white;
`;

const renderWatherText = (lastWeatherUpdate) => {
  return (
    lastWeatherUpdate &&
    <WeatherValue>
      {` ${lastWeatherUpdate.WeatherText} ${lastWeatherUpdate.Temperature.Metric.Value} °C`};
    </WeatherValue>
  )
}

const Weather = ({ lastWeatherUpdate }) => {
  return (
    lastWeatherUpdate ?
      <Wrapper>
        {/* {renderWatherText(lastWeatherUpdate)} */}
      </Wrapper> :
      <div>loading...</div>
  )
}

export default Weather;

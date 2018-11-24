import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const WeatherText = styled.div`
  color: grey;
`;

const WeatherValue = styled.span`
  color: white;
`;

// const WeatherIcon = styled.img`

// `;

const Weather = ({ lastWeatherUpdate }) => {
  return (
    lastWeatherUpdate ?
      <Wrapper>
        {/* <WeatherIcon
          src={`https://developer.accuweather.com/sites/default/files/${lastWeatherUpdate.WeatherIcon}-s.png`}
        /> */}
        <WeatherValue>
          {lastWeatherUpdate.WeatherText} &nbsp;
            {lastWeatherUpdate.Temperature.Metric.Value} °C
          </WeatherValue>
      </Wrapper> :
      <div>loading...</div>
  )
}

export default Weather;

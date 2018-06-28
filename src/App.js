import React, { Component } from 'react';
import styled from 'styled-components';

import Header from 'components/Header';

const Wrapper = styled.div`
  text-align: center;
  height: 100%;
  background-color: #222;
`;

class App extends Component {

  render() {    
    return (
      <Wrapper>
        <Header />
      </Wrapper>
    );
  }
}

export default App;

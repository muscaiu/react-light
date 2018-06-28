import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import { API } from './config/constants';
import Spinner from './Spinner';

const Wrapper = styled.div`
  text-align: center;
  height: 100%;
  background-color: #222;
`;

const Header = styled.div`
  height: 100%;
  padding: 30px;
  color: #61DAFB;  
`;

class App extends Component {
  state = {
    isActive: false
  }

  componentDidMount() {
    axios.get(`${API}/light`)
      .then(response => {
        console.log(response.data);
        if (response.data.status === 0) {
          this.setState({ isActive: true })
        } else {
          this.setState({ isActive: false })
        }
      })
  };

  handleChange = name => event => {
    axios.post(`${API}/light`, {
      status: this.state.isActive
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(event.target.checked);
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { isActive } = this.state;

    return (
      <Wrapper>
        <Header>
          <Spinner isActive={isActive} />
          <Switch
            checked={isActive}
            onChange={this.handleChange('isActive')}
            value="isActive"
            color="primary"
          />
        </Header>
      </Wrapper>
    );
  }
}

export default App;

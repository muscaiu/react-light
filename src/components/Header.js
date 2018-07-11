import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Spinner from 'components/Spinner';
import Log from 'components/Log';
import LoginDialog from './LoginDialog';
import { API } from 'config/constants';
import { isatty } from 'tty';
import { SSL_OP_ALL } from 'constants';

const Wrapper = styled.div`
  padding-top: 50px;
`;

class Header extends Component {
  state = {
    loading: false,
    isActive: false,
    lastAction: null
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
        this.setState({ lastAction: response.data.lastAction })
      })
  };

  updateState = (data) => {
    this.setState({ isActive: data });
  };

  render() {
    const { loading, isActive } = this.state;
    return (
      <Wrapper>
        {
          !loading ?
            <div>
              <Spinner isActive={isActive} />
              <Log
                lastAction={this.state.lastAction}
                isActive={isActive}
              />
              <LoginDialog
                isActive={isActive}
                onOpdateState={this.updateState}
              />
            </div> :
            null
        }
      </Wrapper>
    )
  }
}

export default Header;

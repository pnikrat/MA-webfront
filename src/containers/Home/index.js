// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean
}

class Home extends Component<Props> {
  props: Props
  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div>
        <Navbar />
        <ul>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;

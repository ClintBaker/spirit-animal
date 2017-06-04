import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import {connect} from 'react-redux';

import Login from 'Login';

export class Landing extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>
        <h1 className="page-title">Spirit Animal Club</h1>
        <Login />
      </div>
    )
  }
}

export default connect()(Landing);

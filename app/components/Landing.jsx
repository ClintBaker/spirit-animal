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
          <img src={"https://images.pexels.com/photos/37833/rainbow-lorikeet-parrots-australia-rainbow-37833.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"} className="bg" />
          <h1 className="page-title center border-logo">Spirit Animal Club</h1>
          <Login />
        </div>
    )
  }
}

export default connect()(Landing);

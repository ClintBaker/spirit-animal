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
    var {animal} = this.props;
    return (
      <div>
        <h1 className="page-title">Spirit Animal Club</h1>

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
            </div>
          </div>
        </div>
        <Login />
      </div>
    )
  }
}

export default connect()(Landing);

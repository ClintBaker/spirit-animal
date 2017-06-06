import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);

  }
  onLogin () {
    var {dispatch} = this.props;

    dispatch(actions.startLogin());
  }
  render () {
    return (
      <div className="center">
        <div className="row callout-auth-main">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Login with Facebook to get started.</p>
              <button className="button primary" onClick={this.onLogin}>Login with Facebook</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Redux.connect()(Login);

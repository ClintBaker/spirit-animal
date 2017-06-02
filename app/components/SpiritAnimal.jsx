import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class SpiritAnimal extends React.Component {
  constructor (props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout (e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }
  render () {
    var {dispatch, auth} = this.props;
    return (
      <div>
        <h1>Spirit Animal Main</h1>
        <h3>Id: {auth.uid}</h3>
        <button className="button secondary align-right" onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth
    }
  }
)(SpiritAnimal);

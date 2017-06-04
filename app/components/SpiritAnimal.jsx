import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import UploadImage from 'UploadImage';
import Nav from 'Nav';

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
        <Nav />
        <h1>Spirit Animal Main</h1>
        <h3>Id: {auth.uid}</h3>
        <p>Token: {auth.token}</p>
        <p>User Photo: {auth.userPhoto}</p>
        <h5>{auth.displayName}</h5>
        <img src={auth.userPhoto} alt="user image" />
        <br />
        <div>
          <img src={auth.userMainImage ? auth.userMainImage : ''} alt="user image" />
        </div>
        <button className="button secondary align-right" onClick={this.onLogout}>Logout</button>
        <UploadImage />
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

import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase, {firebaseRef} from 'app/firebase/index';

import Nav from 'Nav';
import {filterUsers} from './../api/filterUsers';

class Safari extends React.Component {
  constructor (props) {
    super(props);
    this.populateUsers = this.populateUsers.bind(this);
  }
  populateUsers () {
    var {users} = this.props;
    if (users) {
      return users.map((user) => {
        return (
          <li key={user}>{user}</li>
        );
      });
    }
  }
  render () {
    var {dispatch, auth, users, userVote} = this.props;
    dispatch(actions.startUserVote());
    return (
      <div>
        <Nav />
        <h5>Users</h5>
        <ul>
          {this.populateUsers()}
        </ul>
        <h4>Tony:</h4>
        <img src={userVote} />
      </div>
    );
  }
}

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth,
      users: state.users,
      userVote: state.userVote
    }
  }
)(Safari);

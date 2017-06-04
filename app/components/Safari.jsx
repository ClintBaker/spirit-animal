import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import Nav from 'Nav';

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
    var {dispatch, auth, users} = this.props;
    return (
      <div>
        <Nav />
        <h5>Users</h5>
        <ul>
          {this.populateUsers()}
        </ul>
        <img src={} />
      </div>
    );
  }
}

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth,
      users: state.users
    }
  }
)(Safari);

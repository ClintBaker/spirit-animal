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
    this.onClick = this.onClick.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }
  renderImage () {
    var {auth, userVote} = this.props;
    if (userVote.url) {
      return (
        <div className="circle kitten" style={{backgroundImage: 'url(' + userVote.url + ')'}} alt="user image">
              <div className="aligner">
              </div>
        </div>
      );
    } else {
      return (
        <div className="circle">
          <div className="aligner">
            <p>Could not locate image</p>
          </div>
        </div>

      );
    }
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
  onClick (e) {
    e.preventDefault();
    var {dispatch, auth, userVote} = this.props;
    var animal = this.refs.animal.value;
    this.refs.animal.value = '';
    dispatch(actions.startUpdateAnimal(animal));
  }
  render () {
    var {dispatch, auth, users, userVote} = this.props;
    dispatch(actions.startUserVote());
    return (
      <div>
        <Nav />
        <h4 className="center">{userVote.name}</h4>
          <div className="safari-flex">
            {userVote.url === undefined ? <p>You have voted on all available users.  Invite more friends and come back later!</p> : this.renderImage()}
          </div>
        <div className="safari-flex aI">
          <form>
            <h6>Enter animal</h6>
            <input type="text" ref="animal" placeholder="Enter your animal type" />
            <button className="button" onClick={this.onClick} autoFocus="true">Submit</button>
          </form>
        </div>

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

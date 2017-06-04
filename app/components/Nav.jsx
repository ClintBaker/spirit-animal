import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import {Link, IndexLink} from 'react-router';

class Nav extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick (e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }
  render () {
    var {dispatch, auth} = this.props;
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Spirit Animal Club (safari, guide)</li>
            {/* <li><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink></li> */}
            <li><Link to="/spirit-animals" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>User Profile</Link></li>
            <li><Link to="/safari" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Safari</Link></li>
            {auth.club ? <li><Link to="/safari" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Cheeta Club</Link></li> : <div></div> }
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><a onClick={this.onClick}>Logout</a></li>
          </ul>
        </div>
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
)(Nav);

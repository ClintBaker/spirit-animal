import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class MyStats extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>

      </div>
    );
  }
}

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth,
      
    }
  }
)(MyStats);

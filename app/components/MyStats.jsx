import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class MyStats extends React.Component {
  constructor (props) {
    super(props);
    this.populateMyAnimals = this.populateMyAnimals.bind(this);
    this.populateMyVotes = this.populateMyVotes.bind(this);
  }
  populateMyAnimals () {
    var {auth} = this.props;
    if (auth.myAnimals) {
      return auth.myAnimals.map((animal) => {
        return (
          <li key={Math.random() * 50}>{animal}</li>
        );
      });
    }
  }
  populateMyVotes () {
    var {auth} = this.props;
    if (auth.myAnimalVotes) {
      return auth.myAnimalVotes.map((vote) => {
        return (
          <li key={Math.random() * 50}>{vote}</li>
        );
      });
    }
  }
  render () {
    return (
      <div>
        <h3>My Animals and Votes</h3>
        <div className="row">
          <div className="medium-5 columns">
            <ul>
              {this.populateMyAnimals()}
            </ul>
          </div>
          <div className="medium-5 columns">
            <ul>
              {this.populateMyVotes()}
            </ul>
          </div>
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
)(MyStats);

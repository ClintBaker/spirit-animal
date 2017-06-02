import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import {connect} from 'react-redux';

export class Landing extends React.Component {
  handleSubmit () {
    var {dispatch} = this.props;
    var animal = this.refs.animal.value;
    this.refs.animal.value = '';

    dispatch(actions.setAnimal(animal));

  }
  onLogin () {
    var {dispatch} = this.props;
  }
  constructor (props) {
    super(props);
    this.state = {
      animal: props.animal
    }
    this.onLogin = this.onLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static defaultProps = {
    animal: 'chimichanga'
  }
  static propTypes = {
    animal: React.PropTypes.string
  }
  render () {
    var {animal} = this.props;
    return (
      <div>
        <h1 className="page-title">Spirit Animal Club</h1>

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <form>
                <h3>Your Animal: {animal || 'chimichanga'}</h3>
                <input type="text" ref="animal" placeholder="Enter your animal type" />
                <button className="button" onClick={this.handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="callout callout-auth">
                <h3>Login</h3>
                <p>Login with Facebook account below</p>
                <button className="button primary" onClick={this.onLogin}>Login with Facebook</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      animal: state.animal
    }
  }
)(Landing);

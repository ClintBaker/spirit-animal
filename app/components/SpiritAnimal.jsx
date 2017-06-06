import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import UploadImage from 'UploadImage';
import Nav from 'Nav';
import MyStats from 'MyStats';

class SpiritAnimal extends React.Component {
  constructor (props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.renderUserImage = this.renderUserImage.bind(this);
  }
  onLogout (e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }
  renderUserImage () {
    var {auth} = this.props;

    if (auth.userMainImage) {
      return (
        <div className="circle kitten" style={{backgroundImage: 'url(' + auth.userMainImage + ')'}} alt="user image">
              <div className="aligner">
              </div>
        </div>
      );
    } else {
      return (
        <div className="circle">
          <div className="aligner">
            <p>Upload an image of yourself and begin the journey to finding your spirit animal.</p>
          </div>
        </div>

      );
    }
  }
  render () {
    var {dispatch, auth} = this.props;
    return (
      <div>
        <Nav />
        <div className="bg-color"></div>
        <div className="row fullWidth">
          <div className="columns large-2 callout text-center">
            <h3>My Animals and Votes</h3>
            <ul>
              <li>Lemur 72%</li>
              <li>Gorilla 12%</li>
              <li>Turtle 7%</li>
            </ul>
          </div>
          <div className="columns large-10 text-center">
            <div className="small-centered">
              <div className="callout">
                <h3>My Picture</h3>

                <div className="container">
                  {this.renderUserImage()}
                </div>

                <UploadImage />
              </div>
            </div>
          </div>
          {/* <div className="columns large-2">
            <h3>My Animals and Votes</h3>
            <ul>
              <li>Lemur 72%</li>
              <li>Gorilla 12%</li>
              <li>Turtle 7%</li>
            </ul>
          </div> */}
        </div>
      </div>





      // <div>
      //   <Nav />
      //   <img src={"https://images.pexels.com/photos/27631/pexels-photo-27631.jpg?w=1260&h=750&auto=compress&cs=tinysrgb"} className="bg" />
      //
      //   <div className="wrapper">
      //     <div className="header">
      //       <h3 className="text-white">My Profile</h3>
      //     </div>
      //     <div className="main">
      //       <div className="user-image-main center">
      //         <h3 className="text-white">My Profile</h3>
      //         <img className="user-image" src={auth.userMainImage ? auth.userMainImage : ''} alt="user image" />
      //         <UploadImage />
      //       </div>
      //     </div>
      //     <div className="aside aside-1 callout grey">
      //         <h3>My Animals and Votes</h3>
      //         <ul>
      //           <li>Lemur 72%</li>
      //           <li>Gorilla 12%</li>
      //           <li>Turtle 7%</li>
      //         </ul>
      //     </div>
      //     <div className="aside aside-2">
      //
      //     </div>
      //     <div className="footer">
      //       <h5>Footer</h5>
      //     </div>
      //   </div>
      //
      //   {/* <div>
      //     <div className="row">
      //       <div className="columns small-10 medium-4 large-3">
      //         <div className="callout grey callout-stats">
      //           <MyStats />
      //         </div>
      //       </div>
      //
      //       <div className="columns small-centered small-10 medium-8 large-8">
      //         <div className="user-image-main center">
      //           <h3 className="text-white">My Profile</h3>
      //           <img className="user-image" src={auth.userMainImage ? auth.userMainImage : ''} alt="user image" />
      //           <UploadImage />
      //         </div>
      //       </div>
      //     </div>
      //   </div> */}
      //
      //   {/* <div className="center grey">
      //     <MyStats />
      //   </div> */}
      // </div>
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

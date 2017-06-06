import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export class UploadImage extends React.Component {
  constructor (props) {
    super(props);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.renderDropzoneText = this.renderDropzoneText.bind(this);
    this.renderButtonText = this.renderButtonText.bind(this);
  }
  onImageDrop (files) {
    const {dispatch} = this.props;
    dispatch(actions.startImageUpload(files[0]));
  }
  renderDropzoneText () {
    const {auth} = this.props;
    if (auth.userMainImage) {
      return (
        <p>Click below to change your profile picture</p>
      );
    } else {
      return (
        <p>Upload an image of yourself and begin the journey to finding your spirit animal.</p>
      );
    }
  }
  renderButtonText () {
    const {auth} = this.props;
    if (auth.userMainImage) {
      return (
        "Change image"
      );
    } else {
      return (
        "Upload image"
      );
    }
  }
  render () {
    var {dispatch, auth} = this.props;
    return (
      <div className="text-center">
        <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop} className="dz dz-center button">
        {this.renderButtonText()}
        </Dropzone>
        {/* <div className="render-preview">
          <div>
            {auth.userMainImage === '' ? null :
            <div>
              <p>{auth.displayName}</p>
              <img src={auth.userMainImage} />
            </div>}
          </div>
        </div> */}
      </div>
    );
  }
};

export default Redux.connect(
  (state) => {
    return {auth: state.auth}
  }
)(UploadImage);

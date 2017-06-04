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
  }
  onImageDrop (files) {
    const {dispatch} = this.props;
    dispatch(actions.startImageUpload(files[0]));
  }
  renderDropzoneText () {
    const {auth} = this.props;
    if (auth.userMainImage) {
      return (
        <p>Click here or drag in an image file to change your user image</p>
      );
    } else {
      return (
        <p>Upload a photo of yourself and begin the journey to finding your spirit animal.</p>
      );
    }
  }
  render () {
    var {dispatch, auth} = this.props;
    return (
      <div>
        <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop}>
          {this.renderDropzoneText()}
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

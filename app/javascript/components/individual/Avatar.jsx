import { Upload, Icon, message } from 'antd';
import React from "react";
import '../../../assets/stylesheets/avatar.css';

class Avatar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: this.props.imageUrl,
      filename: this.props.filename
    };
    this.getBase64 = this.getBase64.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info) {
    if (info.state === 'finished') {
      // this.setState({ imageUrl: imageUrl });
      // Get this url from response in real world.
      this.getBase64(info.file, imageUrl => this.setState({
        imageUrl,
        filename: info.file.name,
        loading: false,
      }));

      if (this.props.onURLChange != undefined) {
        if (this.props.type == "images") {
          this.props.onURLChange("image", this.state.imageUrl);
        } else if (this.props.type == "form") {
          this.props.onURLChange("form", this.state.filename);
        }
      }
    }
    if (info.state != 'finished' && info.progress != 100) {
      this.setState({ loading: true });
      return;
    }
  }

  renderDisplay = () => {
    debugger
    if ((this.state.type == "avatar" || this.state.type == "images") && this.state.imageUrl) {
      return (
        <img src={this.state.imageUrl} alt={this.state.filename} width="104px" height="104px"/>
      )
    } else if (this.state.type == "form" && (this.state.imageUrl || this.state.filename)) {
      console.log('in display for form');
      return (
        <div className="form-box" style={{ backgroundColor: "#ED326C" }}>{this.state.filename}</div>
      )
    } else {
      return (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      )
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    let display = this.renderDisplay();

    return (

      [<Upload style={{ width: 104, height: 104 }}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={({file}) => {this.props.handleUpload([file])}}
        // onChange={this.handleChange}
      >
        {display}
      </Upload>,

      this.props.uploads.map(upload => {
        switch (upload.state) {
          case 'waiting':
            return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
          case 'uploading':
            this.handleChange(upload)
            return (
              <p key={upload.id}>
                Uploading {upload.file.name}: {upload.progress}%
              </p>
            )
          case 'error':
            return (
              <p key={upload.id}>
                Error uploading {upload.file.name}: {upload.error}
              </p>
            )
          case 'finished':
            this.handleChange(upload)
            return <p key={upload.id}>Finished uploading {upload.file.name}</p>
        }
      })]

    );
  }
}

export default Avatar;

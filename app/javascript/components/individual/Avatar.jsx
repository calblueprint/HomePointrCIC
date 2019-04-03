import { Upload, Icon, message } from 'antd';
import React from "react";
// import '../../../assets/stylesheets/avatar.css';

class Avatar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: null,
    };
    this.getBase64 = this.getBase64.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getBase64(img, callback) {
    debugger
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info) {
    debugger  
    if (info.state === 'finished') {
      // Get this url from response in real world.
      this.getBase64(info.file, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
    if (info.state != 'finished' && info.progress != 100) {
      this.setState({ loading: true });
      return;
    }

    console.log("IN HANDLECHANGE IN AVATAR")
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const imageUrl = this.state.imageUrl;
    return (

      [<Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={({file}) => {this.props.handleUpload([file])}}
        // onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" width="250px"/> : uploadButton}
      </Upload>,

      this.props.uploads.map(upload => {
        // console.log(upload)
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

import { Upload, Icon, message } from 'antd';
import React from "react";
// import '../../../assets/stylesheets/avatar.css';

class Avatar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tenant: this.props.tenant,
      loading: false,
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
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
    this.state.tenant["avatar"] = info.file;
    console.log("IN HANDLECHANGE IN AVATAR")
    console.log(info.file);
    console.log(info.file.name);
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };

    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={this.handleChange}
        customRequest={dummyRequest}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default Avatar;

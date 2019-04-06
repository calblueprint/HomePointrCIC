import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload, Icon, Modal } from 'antd';

class PicturesWall extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: this.props.fileList,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  handleCancel() {
    this.setState({ previewVisible: false })
  }

  onRemove(e) {
    let newList = this.state.fileList.filter((element) => {
      return element != e
    })
    this.setState({ fileList: newList })
    this.props.onRemoveRequest(e)
  }

  handlePreview(file) {
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action='/rails/active_storage/direct_uploads'
          headers={
            {"X_CSRF-Token": document.getElementsByName("csrf-token")[0].content}
          }
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onRemove={this.onRemove}
        >
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall; 

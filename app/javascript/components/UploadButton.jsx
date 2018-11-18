import React from "react";
import PropTypes from "prop-types";
import { Upload, Button, Icon } from 'antd';
import 'antd/dist/antd.css';

const UploadButton = props => {
  return (
    <Upload {...props}>
      <Button>
        <Icon type="upload" /> Click to Upload
      </Button>
    </Upload>
  );
}
export default UploadButton;

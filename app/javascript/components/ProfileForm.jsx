import React from "react";
import PropTypes from "prop-types";
import { Upload, message, Icon, Select, Input, Button, Slider, Switch, DatePicker } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import UploadButton from './UploadButton';
import ActiveStorageProvider from "react-activestorage-provider";

class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      mode: props.mode,
      id: props.id,
      prevValues: props.prevValues, //array of strings
      fieldNames: props.fieldNames, //array of strings
      fieldTypes: props.fieldTypes,  //array of strings
      niceFieldNames: props.niceFieldNames, //array of strings
      fileList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  /* takes in two arrays (our array of field names and our array of values)
   * and combines the corresponding field and value as a key value pair to be 
   * returned as a dictionary that will be sent in our JSON requests.
   */
  convertToDict(keys, values) {
    keys = this.state.fieldNames
    values = this.state.prevValues
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }

  //updates our values
  handleChange = (index, e) => {
    this.state.prevValues[index] = e.target.value
    this.setState({prevValues: this.state.prevValues})
  }

  //api destroy
  handleDestroy() {
    let id = this.state.id;
    let type = this.state.type;
    var request = null;
    if (this.state.type === "properties") {
      request = APIRoutes.properties.delete(id)
    } else {
      request = APIRoutes.tenants.delete(id)
    }
    fetch(request, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((response) => { 
      window.location = '/' + type + '/';
    })
  }

  //api create
  handleCreate() {
    let type = this.state.type;
    var request = null;
    let body = this.convertToDict(this.state.fieldNames, this.state.prevValues);
    if (this.state.type === "properties") {
      body = JSON.stringify({property: body})
      request = APIRoutes.properties.create
    } else {
      body = JSON.stringify({tenant: body})
      request = APIRoutes.tenants.create
    }
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {
      window.location = '/' + type + '/';
    }).catch((data) => {
      console.error(data);
    });
  }

  //api edit
  handleEdit() {
    let id = this.state.id;
    let type = this.state.type;
    var request = null;
    var body = this.convertToDict(this.state.fieldNames, this.state.prevValues)
    if (this.state.type === "properties") {
      body = JSON.stringify({property: body})
      request = APIRoutes.properties.update(id)
    } else {
      body = JSON.stringify({tenant: body})
      request = APIRoutes.tenants.update(id)
    }
    fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {
      window.location = '/' + type + '/' + id.toString();
    }).catch((data) => {
      console.error(data);
    });
  }

  renderTextbox(index) {
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <Input defaultValue={this.state.prevValues[index]} onChange={(e) => this.handleChange(index, e)} />
      </div>
    )
  }

  renderTextarea(index) {
    const { TextArea } = Input;
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <TextArea defaultValue={this.state.prevValues[index]} rows ={4} onChange={(e) => this.handleChange(index, e)} autosize={true}/>
      </div>
    )
  }

  renderDatePicker(index) {
    if (this.state.mode == "create") {
      this.state.prevValues[index] = moment().format("YYYY-MM-DD")
    }
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <DatePicker defaultValue={this.state.prevValues[index] == "" ? moment() : moment(this.state.prevValues[index])} 
                    onChange={(date, dateString) => this.state.prevValues[index] = dateString} />
      </div>
    )
  }

  renderDropdown(index) {
    const Option = Select.Option;
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <Select defaultValue={this.state.prevValues[index]} style={{width: 220}} onChange={(e) => this.state.prevValues[index] = e}>
          {this.state.fieldTypes[index].map(option => 
            <Option key={index} value={option}>{option}</Option>)}
        </Select>
      </div>
    )
  }

  renderSlider(index) {
    let df = (this.state.mode == 'edit') ? [this.state.prevValues[index], this.state.prevValues[index+1]] : [0, 5000]
    if (this.state.mode == "create") {
      this.state.prevValues[index] = 0
      this.state.prevValues[index+1] = 5000
    }
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]} - {this.state.niceFieldNames[index+1]}</label>
        <Slider range defaultValue={df}
                onChange={(e) => [this.state.prevValues[index], this.state.prevValues[index+1]] = [e[0], e[1]]}
                max={5000}/>
      </div>
    );
  }

  //grabs the active storage image urls from backend, name of pic at end of url
  setupImages(index) {
    let fileList = [];
    try {
      fileList = this.state.prevValues[index].map((url) => {
        return {uid: url.id, url: url.image, name: url.image.split("/").slice(-1).pop()};
      })
      return fileList;
    } catch(error) {
      try {
        fileList = [{uid: this.state.prevValues[index][0].id, url: this.state.prevValues[index][0].url, name: this.state.prevValues[index][0].url.split("/").slice(-1).pop()}];
        return fileList;
      } catch(error) {
        return [];
      }
    }
  }

  onImageRemove(e) {
    console.log(document.getElementsByName("csrf-token")[0].content)
    let pic_id = e.uid;
    let type = this.state.type;
    var request = null;
    if (this.state.type === "properties") {
      request = '/api/properties/' + this.state.id + '/delete_image_attachment/' + pic_id
    } else {
      request = ''
    }
    fetch(request, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    })
  }

  renderUpload(index) {
    let id = this.state.id;
    let type = this.state.type;
    let path = (this.state.mode === "create") ? '/api/' + type : '/api/' + type + '/' + id.toString();
    let model = (this.state.type === 'properties') ? 'Property' : 'Tenant';
    let method = (this.state.mode === 'edit') ? 'PUT' : 'POST';
    let attribute = (this.state.type === 'properties') ? 'images' : 'avatar';
    let buttonProps = null;
    if (this.state.mode === "edit") {
      this.state.fileList = this.setupImages(index);
      buttonProps = {
        listType: 'picture',
        defaultFileList: this.state.fileList,
        onRemove: (e) => this.onImageRemove(e),
        className: 'upload-list-inline',
      };
    }
    return (
      <div key={index}>
        <UploadButton {...buttonProps} />
        <ActiveStorageProvider
          endpoint={{
            path: path,
            model: model,
            attribute: attribute,
            method: method,
          }}
          headers={{
            'Content-Type': 'application/json'
          }}
          render={({ handleUpload, uploads, ready }) => (
            <div>
              <input
                type="file"
                disabled={!ready}
                onChange={e => handleUpload(e.currentTarget.files)}
              />

              {uploads.map(upload => {
                switch (upload.state) {
                  case 'waiting':
                    return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
                  case 'uploading':
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
                    return <p key={upload.id}>Finished uploading {upload.file.name}</p>
                }
              })}
            </div>
          )}
        />
      </div>
    )
  }

  renderForm() {
    return (
      this.state.fieldNames.map((_, index) => {
        if (this.state.fieldTypes[index] === "textbox") {
          return ( 
            this.renderTextbox(index)
          )
        } else if (this.state.fieldTypes[index] === "textarea") {
          return (
            this.renderTextarea(index)
          )
        } else if (this.state.fieldTypes[index] === "datepicker") {
          return (
            this.renderDatePicker(index)
          )
        } else if (this.state.fieldTypes[index] === "slider") {
          return (
            this.renderSlider(index)
          )
        } else if (this.state.fieldTypes[index] === "_slider") {
          return null
        } else if (this.state.fieldTypes[index] === "attachment") {
          return (
            this.renderUpload(index)
          )
        } else {
          return (
            this.renderDropdown(index)
          )
        }
      })
    )}

  render() {
    let returnArr = [];
    if (this.state.mode === "create") {
      returnArr = [...this.renderForm(),
          <Button key='submit' type="primary" onClick={this.handleCreate}>Submit</Button>,
          <Button key='cancel' type="default" href={"/" + this.state.type} >Cancel</Button>]
    } else if (this.state.mode === "edit") {
      returnArr = [...this.renderForm(),
          <Button key='save' type="primary" onClick={this.handleEdit}>Save</Button>,
          <Button key='cancel' type="default" href={"/" + this.state.type} >Cancel</Button>,
          <Button key='delete' type="danger" onClick={this.handleDestroy}>Delete</Button>]
    }
    return returnArr;
  }
}

ProfileForm.propTypes = {
  mode: PropTypes.string,
  type: PropTypes.string,
  prevValues: PropTypes.array,
  fieldNames: PropTypes.array,
  fieldTypes: PropTypes.array,
  niceFieldNames: PropTypes.array
};

export default ProfileForm; 
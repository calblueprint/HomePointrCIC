import React from "react";
import PropTypes from "prop-types";
import { Upload, message, Form, Icon, Select, Input, Button, Slider, Switch, DatePicker } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import UploadButton from './UploadButton';
import PicturesWall from './PicturesWall';
import SliderBar from './SliderBar';
import ActiveStorageProvider from "react-activestorage-provider";

class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevValues: props.prevValues, //array of strings
      fieldNames: props.fieldNames, //array of strings
      fieldTypes: props.fieldTypes,  //array of strings
      niceFieldNames: props.niceFieldNames, //array of strings
      fileList: [],
      imageRemoveList: [],
      disabled: false //to prevent multiple form submissions
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.sliderChanges = this.sliderChanges.bind(this);
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
    let id = this.props.id;
    let type = this.props.type;
    var request = null;
    if (this.props.type === "properties") {
      request = APIRoutes.properties.delete(id)
    } else if (this.props.type === "landlords") {
      request = APIRoutes.landlords.delete(id)
    } else if (this.props.type === "referral_agencies") {
      request = APIRoutes.referral_agencies.delete(id)
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
      window.location = '/';
    })
  }

  //api create
  handleCreate() {
    this.setState({disabled: true});
    let type = this.props.type;
    var request = null;
    let body = this.convertToDict(this.state.fieldNames.slice(0,8), this.state.prevValues.slice(0,8));
    if (this.props.type === "properties") {
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
      window.location = '/';
    }).catch((data) => {
      console.error(data);
    });
  }

  //api edit
  handleEdit() {
    let id = this.props.id;
    let type = this.props.type;
    var request = null;
    var body = this.convertToDict(this.state.fieldNames, this.state.prevValues)
    if (this.props.type === "properties") {
      body = JSON.stringify({property: body})
      request = APIRoutes.properties.update(id)
    } else if (this.props.type === "landlords") {
      body = JSON.stringify({landlord: body})
      request = APIRoutes.landlords.update(id)
    } else if (this.props.type === "referral_agencies") {
      body = JSON.stringify({referral_agency: body})
      request = APIRoutes.referral_agencies.update(id)
    } else {
      body = JSON.stringify({tenant: body})
      request = APIRoutes.tenants.update(id)
    }
    this.removeImages(this.state.imageRemoveList);
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

  removeImages(imageList) {
    var i;
    for (i = 0; i < imageList.length; i++) {
      let request = APIRoutes.properties.delete_image(imageList[i]);
      fetch(request, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        }
      }).catch((data) => {
        console.error(data);
      });
    }
  }

  renderTextbox(index) {
    return (
      <div 
      style={{
        width: "50%",
        margin: "1.5% auto"
      }}
      key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <Input size="large" defaultValue={this.state.prevValues[index]} onChange={(e) => this.handleChange(index, e)} />
      </div>
    )
  }

  renderPassword(index) {
    return (
      <div 
      style={{
        width: "50%",
        margin: "1.5% auto"
      }}
      key={index}>
        <label>New Password</label>
        <Input type="password" size="large" defaultValue={this.state.prevValues[index]} onChange={(e) => this.handleChange(index, e)} />
      </div>
    )
  }

  renderTextarea(index) {
    const { TextArea } = Input;
    return (
      <div 
      style={{
        width: "50%",  
        margin: "1.5% auto"
      }}
      key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <TextArea defaultValue={this.state.prevValues[index]} rows ={8} onChange={(e) => this.handleChange(index, e)} autosize={true}/>
      </div>
    )
  }

  renderDatePicker(index) {
    if (this.props.mode == "create") {
      this.state.prevValues[index] = moment().format("YYYY-MM-DD")
    }
    return (
      <div 
      style={{
        width: "50%",
        textAlign: "center", 
        display: "flex",
        flexDirection: "column",
        margin: "1.5% auto"
      }}
      key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <DatePicker defaultValue={this.state.prevValues[index] == "" ? moment() : moment(this.state.prevValues[index])} 
                    onChange={(date, dateString) => this.state.prevValues[index] = dateString} />
      </div>
    )
  }

  renderDropdown(index) {
    const Option = Select.Option;
    return (
      <div 
      style={{
        width: "50%",  
        margin: "1.5% auto"
      }}
      key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <Select defaultValue={this.state.prevValues[index]} onChange={(e) => this.state.prevValues[index] = e}>
          {this.state.fieldTypes[index].map(option => 
            <Option key={index} value={option}>{option}</Option>)}
        </Select>
      </div>
    )
  }

  sliderChanges(low, high, index) {
    this.state.prevValues[index] = low
    this.state.prevValues[index+1] = high
  }

  renderSlider(index) {
    if (this.props.mode == "create") {
      this.state.prevValues[index] = 0
      this.state.prevValues[index+1] = 5000
    }
    return (
      <div 
      style={{
        width: "50%",
        margin: "1.5% auto"
      }}
      key={index}>
        <label>{this.state.niceFieldNames[index]} - {this.state.niceFieldNames[index+1]}</label>
        <SliderBar  lowValue={this.state.prevValues[index]} 
                    highValue={this.state.prevValues[index+1]}
                    index={index}
                    updateFunc={this.sliderChanges}
        />
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

  renderUpload(index) {
    let id = this.props.id;
    let type = this.props.type;
    let path = (this.props.mode === "create") ? '/api/' + type : '/api/' + type + '/' + id.toString();
    let model = (this.props.type === 'properties') ? 'Property' : 'Tenant';
    let method = (this.props.mode === 'edit') ? 'PUT' : 'POST';
    let attribute = (this.props.type === 'properties') ? 'images' : 'avatar';
    let buttonProps = null;
    if (this.props.mode === "edit") {
      this.state.fileList = this.setupImages(index);
      buttonProps = {
        listType: 'picture-card',
        fileList: this.state.fileList,
        onRemoveRequest: (e) => this.state.imageRemoveList.push(e.uid),
        className: 'upload-list-inline',
      };
    }
    return (
      <div key={index}>
        Images
        <PicturesWall {...buttonProps} />
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
          render={Utils.activeStorageUploadRenderer}
        />
      </div>
    )
  }

  renderUploadForm(index) {
    let buttonProps = null;
    let method = (this.props.mode === 'edit') ? 'PUT' : 'POST';
    let path = (this.props.mode === "create") ? '/api/properties' : '/api/properties/' + this.props.id.toString();
    if (this.props.mode === "edit") {
      buttonProps = {
        listType: 'picture',
        fileList: this.state.prevValues[index] === null ? [] : [{uid: this.state.prevValues[index].id, url: this.state.prevValues[index].image, name: this.state.prevValues[index].image.split("/").slice(-1).pop()}],
        onRemoveRequest: (e) => this.state.imageRemoveList.push(e.uid),
        className: 'upload-list-inline'
      }
    }
    return (
      <div key={index}>
        Property Form
        <PicturesWall {...buttonProps} />
        <ActiveStorageProvider
          endpoint={{
            path: path,
            model: 'Property',
            attribute: 'form',
            method: method,
          }}
          headers={{
            'Content-Type': 'application/json'
          }}
          render={Utils.activeStorageUploadRenderer}
        />
      </div>
    )
  }

  renderForm() {
    return (
      this.state.fieldTypes.map((_, index) => {
        if (this.state.fieldTypes[index] === "textbox") {
          return ( 
            this.renderTextbox(index)
          )
        } else if (this.state.fieldTypes[index] === "textarea") {
          return (
            this.renderTextarea(index)
          )
        } else if (this.state.fieldTypes[index] === "id") {
          this.state.prevValues[index] = this.props.current_userID;
        } else if (this.state.fieldTypes[index] === "datepicker") {
          return (
            this.renderDatePicker(index)
          )
        } else if (this.state.fieldTypes[index] === "slider") {
          return (
            this.renderSlider(index)
          )
        } else if (this.state.fieldTypes[index] === "password") {
          return (
            this.renderPassword(index)
          )
        } else if (this.state.fieldTypes[index] === "_slider") {
          return null
        } else if (this.state.fieldTypes[index] === "attachment") {
          return (
            this.renderUpload(index)
          )
        } else if (this.state.fieldTypes[index] === "form") {
          return (
            this.renderUploadForm(index)
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
    var disabled = this.state.disabled ? 'disabled' : ''
    if (this.props.mode === "create") {
      returnArr = [...this.renderForm(),
          <Button 
          style={{
          width: "20%",
          margin: "1.5% auto"
          }}
          disabled={disabled}
      key='submit' type="primary" onClick={this.handleCreate}>Submit</Button>,
          <Button 
          style={{
          width: "20%",
          margin: "1.5% auto"
          }}
           key='cancel' type="default" href={"/"} >Cancel</Button>]
    } else if (this.props.mode === "edit") {
      returnArr = [...this.renderForm(),
          <Button style={{
          width: "20%",
          margin: "1.5% auto"
          }}key='save' type="primary" onClick={this.handleEdit}>Save</Button>,
          <Button style={{
          width: "20%",
          margin: "1.5% auto"
          }}key='cancel' type="default" href={'/' + this.props.type + '/' + this.props.id.toString()} >Cancel</Button>,
          <Button style={{
          width: "20%",
          margin: "1.5% auto"
          }}key='delete' type="danger" onClick={this.handleDestroy}>Delete</Button>, ]
    }
    return (
      <div
      style={{  
        textAlign: "center", 
            }}
      >
      {returnArr}
      </div>
      );
  }
}

ProfileForm.propTypes = {
  id: PropTypes.number,
  mode: PropTypes.string,
  type: PropTypes.string,
  prevValues: PropTypes.array,
  fieldNames: PropTypes.array,
  fieldTypes: PropTypes.array,
  niceFieldNames: PropTypes.array,
  current_userID: PropTypes.number,
};

export default ProfileForm; 
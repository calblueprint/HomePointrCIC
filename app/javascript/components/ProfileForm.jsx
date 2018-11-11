import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Button, Slider, Switch, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      mode: props.mode,
      id: props.id,
      prevValues: props.prevValues, //array of strings
      fieldNames: props.fieldNames, //array of strings
<<<<<<< HEAD
      fieldTypes: props.fieldTypes,  //array of strings
      niceFieldNames: props.niceFieldNames //array of strings
=======
      fieldTypes: props.fieldTypes  //array of strings
>>>>>>> pushing attempted code for requests
      // enums: props.enums
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
<<<<<<< HEAD
    this.handleDestroy = this.handleDestroy.bind(this);
=======
>>>>>>> pushing attempted code for requests
  }

  convertToDict(keys, values) {
    keys = this.state.fieldNames
    values = this.state.prevValues
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }

  handleChange = (index, e) => {
    this.state.prevValues[index] = e.target.value
    this.setState({prevValues: this.state.prevValues})
  }

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

  handleEdit() {
<<<<<<< HEAD
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
=======
    let type = this.state.type;
    let mode = this.state.mode;
    var id = this.state.id;
    var body = this.convertToDict(this.state.fieldNames, this.state.prevValues)
    body = JSON.stringify({property: body})
    
    fetch(APIRoutes.properties.update(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = '/properties/' + id.toString();
>>>>>>> pushing attempted code for requests
    }).catch((data) => {
      console.error(data);
    });
  }

  renderTextbox(name, index) {
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <Input defaultValue={this.state.prevValues[index]} onChange={(e) => this.handleChange(index, e)} />
      </div>
    )
  }

  renderTextarea(name, index) {
    const { TextArea } = Input;
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <TextArea defaultValue={this.state.prevValues[index]} rows ={4} onChange={(e) => this.handleChange(index, e)} autosize={true}/>
      </div>
    )
  }

  renderDatePicker(name, index) {
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

  renderDropdown(name, index) {
    const Option = Select.Option;
    return (
<<<<<<< HEAD
      <div key={index}>
        <label>{this.state.niceFieldNames[index]}</label>
        <Select defaultValue={this.state.prevValues[index]} style={{width: 220}} onChange={(e) => this.state.prevValues[index] = e}>
          {this.state.fieldTypes[index].map(option => 
            <Option key={index} value={option}>{option}</Option>)}
=======
      <div>
        <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
        <Select defaultValue={this.state.prevValues[index]} style={{width: 220}} onChange={(e) => this.state.prevValues[index] = e}>
          {this.state.fieldTypes[index].map(option => <Option value={option}>{option}</Option>)}
>>>>>>> pushing attempted code for requests
        </Select>
      </div>
    )
  }

  renderSlider(name, index) {
    return (
      <div key={index}>
        <label>{this.state.niceFieldNames[index]} - {this.state.niceFieldNames[index+1]}</label>
        <Slider range defaultValue={[this.state.prevValues[index], this.state.prevValues[index+1]]}
                onChange={(e) => [this.state.prevValues[index], this.state.prevValues[index+1]] = [e[0], e[1]]}
                max={5000}/>
      </div>
    );
  }

  renderForm() {
    return (
      this.state.fieldNames.map((name, index) => {
        if (this.state.fieldTypes[index] === "textbox") {
          return ( 
            this.renderTextbox(name, index)
          )
        } else if (this.state.fieldTypes[index] === "textarea") {
          return (
            this.renderTextarea(name, index)
          )
        } else if (this.state.fieldTypes[index] === "datepicker") {
          return (
            this.renderDatePicker(name, index)
          )
        } else if (this.state.fieldTypes[index] === "slider") {
          return (
            this.renderSlider(name, index)
          )
        } else if (this.state.fieldTypes[index] === "_slider") {
          return null
        } else {
          return (
            this.renderDropdown(name, index)
          )
        }
      })
    )}

  render() {
    let returnArr = [];
    if (this.state.mode === "create") {
<<<<<<< HEAD
      returnArr = [this.renderForm(),
          <Button type="primary" onClick={this.handleCreate}>Submit</Button>,
          <Button type="default" href={"/" + this.state.type} >Cancel</Button>]
    } else if (this.state.mode === "edit") {
      returnArr = [this.renderForm(),
          <Button type="primary" onClick={this.handleEdit}>Save</Button>,
          <Button type="default" href={"/" + this.state.type} >Cancel</Button>,
          <Button type="danger" onClick={this.handleDestroy}>Delete</Button>]
=======
      return [this.renderForm(), <Button type="primary" href="" onClick={this.handleCreate}>Submit</Button>]
    } else if (this.state.mode === "edit") {
      return [this.renderForm(), <Button type="primary" href="" onClick={this.handleEdit}>Submit</Button>]
    } else {
      return null
>>>>>>> pushing attempted code for requests
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
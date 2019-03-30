// import {
//   Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
// } from 'antd';
import React from "react";
import PropTypes from "prop-types";
import { Upload, message, Form, Icon, Select, Input, Button, Slider, Switch, DatePicker, InputNumber, Row, Col } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import UploadButton from './UploadButton';
import SliderBar from './SliderBar';
import ActiveStorageProvider from "react-activestorage-provider";
import PicturesWall from './PicturesWall';
import Avatar from './Avatar';

class PropertyProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: props.property,
      categories: props.categories,
      nice_housing_types: props.categories.nice_housing_types,
      nice_property_types: props.categories.nice_property_types,
      nice_locations: props.categories.nice_locations,
      housing_types: props.categories.housing_types,
      property_types: props.categories.property_types,
      locations: props.categories.locations,
      avatar: this.props.property.avatar,
      fileList: [],
      imageRemoveList: [],
      disabled: false //to prevent multiple form submissions
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.sliderChanges = this.sliderChanges.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
    this.setFile = this.setFile.bind(this);
  }

  convertToDict() {
    const property = this.state.property;
    const keys = ["capacity", "description", "landlord_id", "rent", "size", "property_type", "housing_type", "date_available", "location", "address", "number_of_bedrooms", "number_of_bathrooms", "floor_number", "mobility_aids", "furniture", "utilities_included", "accessible_shower", "car_parking", "lift_access"];
    const values = [property.capacity, property.landlord_id, property.rent, property.size, property.property_type, property.housing_type, property.date_available, property.location, property.address, property.number_of_bedrooms, property.number_of_bathrooms, property.floor_number, property.mobility_aids, property.furniture, property.utilities_included, property.accessible_shower, property.car_parking, property.lift_access];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }

  //api destroy
  handleDestroy() {
    let id = this.state.property.id;
    // let type = this.props.type;
    var request = null;
    // if (this.props.type === "properties") {
    //   request = APIRoutes.properties.delete(id)
    // } else if (this.props.type === "landlords") {
    //   request = APIRoutes.landlords.delete(id)
    // } else if (this.props.type === "referral_agencies") {
    //   request = APIRoutes.referral_agencies.delete(id)
    // } else {
      request = APIRoutes.properties.delete(id)
    // }
    (request, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((response) => {
      window.location = '/';
    })
  }

  //api edit
  handleEdit() {
    let id = this.state.property.id;
    var request = null;
    var body = this.convertToDict()
    body = JSON.stringify({property: body})
    request = APIRoutes.properties.update(id)
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
      console.log(this.state.property.avatar.name)
      // window.location = '/properties/' + id.toString();
    }).catch((data) => {
      window.location = '/';
    });
  }
  removeImages(imageList) {
    var i;
    for (i = 0; i < imageList.length; i++) {
      let request = APIRoutes.properties.delete_image(imageList[i]);
      (request, {
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

  handleChange(attr) {
    const property = this.state.property;
    property[attr] = event.target.value;
    this.setState({ property: property });
  }
  handleChangeDate(date) {
    const property = this.state.property;
    property["date_available"] = date.format("YYYY-MM-DD");
    this.setState({ property: property });
  }
  handleChangeSelect(attr, value) {
    const property = this.state.property;
    property[attr] = value;
    this.setState({ property: property })
  }

  setFile(e) {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }
    this.setState({ avatar: files[0] });
  }

  renderUpload() {
    let buttonProps = null;
      buttonProps = {
        listType: 'picture-card',
        fileList: this.state.fileList,
        onRemoveRequest: (e) => this.state.imageRemoveList.push(e.uid),
        className: 'upload-list-inline',
        onChange: (fileList) => this.handleChangeImage(fileList)
      };

      // <ActiveStorageProvider
      //   endpoint={{
      //     path: '/api/properties/' + this.state.property.id.toString(),
      //     model: "property",
      //     attribute: 'avatar',
      //     method: "PUT",
      //   }}
      //   headers={{
      //     'Content-Type': 'application/json'
      //   }}
      //   render={Utils.activeStorageUploadRenderer}
      // />

    return (
      <div>
        Images
        <PicturesWall {...buttonProps} />
      </div>
    )
  }

  //AVATAR -- DON'T DELETE
  // <Form.Item
  //   label="Upload Avatar"
  // >
  //   <Avatar property={this.state.property}/>
  // </Form.Item>


  render() {
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const { property } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleEdit}>
          <h3>Basic</h3>
          <Form.Item
            label="Property Name"
          >
            {getFieldDecorator('name', {
              initialValue: property.name,
              rules: [{
                required: true, message: 'Please input the property name!',
              }],
            })(
              <Input onChange={() => this.handleChange("name")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Rent"
          >
            {getFieldDecorator('rent', {
              initialValue: property.rent,
              rules: [{
                required: true, message: 'Please input the rent!',
              }],
            })(
              <Input onChange={() => this.handleChange("rent")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Housing type"
          >
            {getFieldDecorator('housing_type', {
              rules: [{
                required: true, message: 'Please select housing type!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("housing_type", value)}>
              {
                this.state.nice_housing_types.map((obj, i) => {
                  return <Option key={i} value={this.state.housing_types[i]}>{obj}</Option>
                })
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Property type"
          >
            {getFieldDecorator('property_type', {
              rules: [{
                required: true, message: 'Please select a property type!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("property_type", value)}>
              {
                this.state.nice_property_types.map((obj, i) => {
                  return <Option key={i} value={this.state.property_types[i]}>{obj}</Option>
                })
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Date available"
          >
            {getFieldDecorator('date_available', {
              initialValue: moment(property.date_available, "YYYY-MM-DD"),
              rules: [{
                required: true, message: 'Please select the date available!',
              }],
            })(
              <DatePicker onChange={this.handleChangeDate}/>
            )}
          </Form.Item>
          <Form.Item
            label="Capacity"
          >
            {getFieldDecorator('capacity', {
              initialValue: property.capacity,
              rules: [{
                required: true, message: 'Please input the capacity!',
              }],
            })(
              <Input onChange={() => this.handleChange("capacity")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Number of bedrooms"
          >
            {getFieldDecorator('number_of_bedrooms', {
              initialValue: property.number_of_bedrooms,
              rules: [{
                required: true, message: 'Please pick the number of bedrooms!',
              }],
            })(
              <InputNumber
                min={0}
                max={10}
                value={property.number_of_bedrooms}
                onChange={(value) => this.handleChangeSelect("number_of_bedrooms", value)}
              />
            )}
          </Form.Item>
          <h3>Details</h3>
          <Form.Item
            label="Number of bathrooms"
          >
            {getFieldDecorator('number_of_bathrooms', {
              initialValue: property.number_of_bathrooms,
              rules: [{
                required: true, message: 'Please select the number of bathrooms!',
              }],
            })(
              <InputNumber
                min={0}
                max={10}
                value={property.number_of_bathrooms}
                onChange={(value) => this.handleChangeSelect("number_of_bathrooms", value)}
              />
            )}
          </Form.Item>
          <Form.Item
            label="What floor is your property on?"
          >
            {getFieldDecorator('floor_number', {
              initialValue: property.floor_number,
              rules: [{
                required: true, message: 'Please select the floor number!',
              }],
            })(
              <Input onChange={() => this.handleChange("floor_number")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Are there mobility aids?"
          >
            {getFieldDecorator('mobility_aids', {
              rules: [{
                required: true, message: 'Please select a response!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("mobility_aids", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Is there lift access?"
          >
            {getFieldDecorator('lift_access', {
              rules: [{
                required: true, message: 'Please select a response!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("lift_access", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Is the shower accessible?"
          >
            {getFieldDecorator('accessible_shower', {
              rules: [{
                required: true, message: 'Please select a response!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("accessible_shower", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Are utilities included?"
          >
            {getFieldDecorator('utilities_included', {
              rules: [{
                required: true, message: 'Please select a response!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("utilities_included", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Is it furnished?"
          >
            {getFieldDecorator('furniture', {
              rules: [{
                required: true, message: 'Please select a response!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("furniture", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Is there car parking available?"
          >
            {getFieldDecorator('car_parking', {
              rules: [{
                required: true, message: 'Please select a response!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("car_parking", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            )}
          </Form.Item>
          <h3>Description</h3>
          <Form.Item
            label="Summary"
          >
            {getFieldDecorator('description', {
              initialValue: property.description,
              rules: [{
                required: true, message: 'Please input the summary!',
              }],
            })(
              <Input onChange={() => this.handleChange("description")}/>
            )}
          </Form.Item>
          <h3>Photos</h3>
          <Form.Item
            label="Add image"
          >
            <Avatar property={this.state.property}/>
          </Form.Item>
          <h3>Additional paperwork</h3>
          <Form.Item
            label="Upload file"
          >
            <Avatar property={this.state.property}/>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(PropertyProfileForm);

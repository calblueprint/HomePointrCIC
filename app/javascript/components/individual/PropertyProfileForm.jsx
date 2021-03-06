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
import '../../../assets/stylesheets/PropertyProfileForm.css';
import { DirectUploadProvider } from "react-activestorage-provider";
import DeleteModal from '../modals/DeleteModal';


class PropertyProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderInfoHousing: 0,
      renderInfoProperty: 0,
      renderInfoCapacity: 0,
      property: props.property,
      categories: props.categories,
      nice_housing_types: props.categories.nice_housing_types,
      nice_property_types: props.categories.nice_property_types,
      nice_locations: props.categories.nice_locations,
      housing_types: props.categories.housing_types,
      property_types: props.categories.property_types,
      locations: props.categories.locations,
      form: this.props.client_form,
      images: [],
      fileList: [],
      imageRemoveList: [],
      visible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAuto = this.handleAuto.bind(this)
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
  }

  componentDidMount() {
    this.handleAuto();
  }

  handleAuto() {
    var places = require('places.js');
    var placesAutocomplete = places({
      appId: 'plT4Z8MULV0O',
      apiKey: '48e619128b523ff86727e917eb1fa1d3',
      container: this.autocompleteElem
    });
    placesAutocomplete.on('change', (e) => {
      const new_property = this.state.property;
      new_property['address'] = e.suggestion.value;
      new_property['lat'] = e.suggestion.latlng.lat;
      new_property['long'] = e.suggestion.latlng.lng;
      this.setState({ property: new_property });
    });
  }

  convertToDict() {
    const property = this.state.property;
    const keys = ["capacity", "description", "landlord_id", "rent", "property_type", "housing_type", "date_available", "location", "address", "number_of_bedrooms", "number_of_bathrooms", "floor_number", "mobility_aids", "furniture", "utilities_included", "accessible_shower", "car_parking", "lift_access", "lat", "long", "images", "form"];
    const values = [property.capacity, property.description, property.landlord_id, property.rent, property.property_type, property.housing_type, property.date_available, property.location, property.address, property.number_of_bedrooms, property.number_of_bathrooms, property.floor_number, property.mobility_aids, property.furniture, property.utilities_included, property.accessible_shower, property.car_parking, property.lift_access, property.lat, property.long, this.state.images, this.state.form];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }

  //api destroy
  handleDestroy() {
    let id = this.state.property.id;
    var request = null;
    request = APIRoutes.properties.delete(id)
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

  //api edit
  handleEdit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          let id = this.state.property.id;
          var request = null;
          var body = this.convertToDict()
          body = JSON.stringify({property: body})
          request = '/api/properties/' + id.toString();
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
            window.location = '/properties/' + id.toString();
          }).catch((data) => {
            window.location = '/';
          });
        } else {
          window.scrollTo(0, 0);
        }
      }
    );
  }

  //delete from picturewall
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

  setupImages = () => {
    let fileList = [];
    let image_objects = this.props.image_objects;
    try {
      image_objects.map((image_object) => {
        fileList.push({uid: image_object.id, url: image_object.url, name: image_object.name});
      });
      return fileList;
    } catch(error) {
      return [];
    }
  }

  uploadImages = (signedIds) => {
    let uploadList = []
    signedIds.map((signedId) => {
      uploadList.push(signedId);
    });
    this.setState({ images: uploadList })
  }

  uploadForms = (signedIds) => {
    this.setState({ form: signedIds[0] });
  }

  renderUpload = () => {
    let buttonProps = null;
    let imageList = this.setupImages();
      buttonProps = {
        listType: 'picture-card',
        fileList: imageList,
        onRemoveRequest: (e) => this.state.imageRemoveList.push(e.uid),
        className: 'upload-list-inline',
        onChange: (fileList) => this.handleChangeImage(fileList)
      };
    return (
      <div>
        <PicturesWall {...buttonProps} />
      </div>
    )
  }

  onCancel = () => {
    this.setState({ visible: false });
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  renderInfo = (which_info, e) => {
    if (which_info == "housing") {
      this.setState((state) => {
        return {renderInfoHousing: 1 - state.renderInfoHousing}
      });
    } else if (which_info == "property") {
      this.setState((state) => {
        return {renderInfoProperty: 1 - state.renderInfoProperty}
      });
    } else if (which_info == "capacity") {
      this.setState((state) => {
        return {renderInfoCapacity: 1 - state.renderInfoCapacity}
      });
    }
  }

  // Renders information dialogue on hover
  infoDialogueHelper = (which_info, info_text) => {
    if (which_info == "housing" && this.state.renderInfoHousing) {
      return(
        <div className="info-dialogue"><p className="info-dialogue-text">{info_text}</p></div>
      );
    } else if (which_info == "property" && this.state.renderInfoProperty) {
      return(
        <div className="info-dialogue"><p className="info-dialogue-text">{info_text}</p></div>
      );
    } else if (which_info == "capacity" && this.state.renderInfoCapacity) {
      return(
        <div className="info-dialogue"><p className="info-dialogue-text">{info_text}</p></div>
      );
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const { property } = this.state;
    const pictureWallRender = this.renderUpload();

    return (
      <div className="edit-property-container">
        <h1>Edit Property</h1>
        <Form onSubmit={this.handleEdit} hideRequiredMark={true}>
          <div className="section">
            <h2>Basic Information</h2>
            <div className="grid-container">
              <Form.Item
                label="Address"
              >
                <input id="address" value={property.address} onChange={() => this.handleChange("address")} ref={(ref) => { this.autocompleteElem = ref; }} size="8"/>
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
                <div onMouseEnter={(e) => this.renderInfo("housing", e)} onMouseLeave={(e) => this.renderInfo("housing", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
                {this.infoDialogueHelper("housing", "Housing type is housing situation or conditions of your residence.")}
                {getFieldDecorator('housing_type', {
                  initialValue: property.housing_type,
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
                <div onMouseEnter={(e) => this.renderInfo("property", e)} onMouseLeave={(e) => this.renderInfo("property", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
                {this.infoDialogueHelper("property", "Property type is the type of building of your residence.")}
                {getFieldDecorator('property_type', {
                  initialValue: property.property_type,
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
                <div onMouseEnter={(e) => this.renderInfo("capacity", e)} onMouseLeave={(e) => this.renderInfo("capacity", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
                {this.infoDialogueHelper("capacity", "Capacity is the number of open spots you have in your residence.")}
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
                    required: true, message: 'Please input the number of bedrooms!',
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
            </div>
          </div>
          <div className="section">
            <h2>Details</h2>
            <div className="grid-container">
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
                  initialValue: property.mobility_aids,
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
                  initialValue: property.lift_access,
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
                  initialValue: property.accessible_shower,
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
                  initialValue: property.utilities_included,
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
                  initialValue: property.furniture,
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
                  initialValue: property.car_parking,
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
            </div>
          </div>
          <div className="section">
            <h2>Description</h2>
            <Form.Item
              label="Summary"
            >
              {getFieldDecorator('description', {
                initialValue: property.description,
                rules: [{
                  required: true, message: 'Please input the summary!',
                }],
              })(
                <Input.TextArea
                  rows={10}
                  onChange={() => this.handleChange("description")}
                />
              )}
            </Form.Item>
          </div>
          <div className="section">
            <h2>Photos</h2>
            <Form.Item
              label="Add images"
            >
              <div className="upload-image">
                {pictureWallRender}
                <DirectUploadProvider
                  multiple={true}
                  onSuccess={signedIds => { this.uploadImages(signedIds) }}
                  render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, type: "images", fileConstraints: "image/*" })}
                />
              </div>
            </Form.Item>
          </div>
          <div className="section">
            <h2>Additional paperwork</h2>
              <Form.Item
                label="Upload form"
              >
                <div className="upload-form">
                  <DirectUploadProvider
                    multiple={false}
                    onSuccess={signedIds => { this.uploadForms(signedIds) }}
                    render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, filename: this.props.form_name, type: "form", fileConstraints: "application/msword, application/vnd.ms-excel, text/plain, application/pdf" })}
                  />
                </div>
              </Form.Item>
          </div>
          <div className="section">
            <div className="delete-client">
              <Row type="flex" style={{ width: 660 }}>
                <Col span={12}>
                  <div><h2>Delete Property</h2></div>
                </Col>
                <Col span={12}>
                  <Button className="delete-button" type="danger" onClick={this.showModal}>Delete Property</Button>
                  <DeleteModal
                    onOk={this.handleDestroy}
                    onCancel={this.onCancel}
                    visible={this.state.visible}
                    message={"delete this property"}
                    operation={"Delete"}
                  />
                </Col>
              </Row>
            </div>
          </div>
        <div className="buttons">
          <Form.Item>
            <Button className="previous" onClick={() => {window.location = '/properties/' + this.state.property.id.toString()}}>Cancel</Button>
            <Button className="submit" type="primary" htmlType="submit" onClick={this.handleEdit}>Save Changes</Button>
          </Form.Item>
        </div>
        </Form>
      </div>
    )
  }
}

export default Form.create()(PropertyProfileForm);

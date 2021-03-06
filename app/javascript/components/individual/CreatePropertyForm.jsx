// import {
//   Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
// } from 'antd';
import React from "react";
import PropTypes from "prop-types";
import { Popover, Upload, message, Form, Icon, Select, Input, Button, Slider, Switch, DatePicker, InputNumber, Row, Col } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import UploadButton from './UploadButton';
import SliderBar from './SliderBar';
import ActiveStorageProvider from "react-activestorage-provider";
import PicturesWall from './PicturesWall';
import Avatar from './Avatar';
import '../../../assets/stylesheets/CreatePropertyForm.css';
import { DirectUploadProvider } from "react-activestorage-provider";

class CreatePropertyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderInfoHousing: 0,
      renderInfoProperty: 0,
      renderInfoCapacity: 0,
      property: {
        capacity: null,
        description: '',
        landlord_id: this.props.current_userID,
        rent: null,
        property_type: undefined,
        housing_type: undefined,
        date_available: new Date(),
        location: undefined,
        address: '',
        number_of_bedrooms: null,
        number_of_bathrooms: null,
        floor_number: null,
        mobility_aids: undefined,
        furniture: undefined,
        utilities_included: undefined,
        accessible_shower: undefined,
        car_parking: undefined,
        lift_access: undefined,
        lat: null,
        long: null,
        images: null,
        form: null,
      },
      imageUrl: null,
      formName: null,
      categories: props.categories,
      nice_housing_types: props.categories.nice_housing_types,
      nice_property_types: props.categories.nice_property_types,
      nice_locations: props.categories.nice_locations,
      housing_types: props.categories.housing_types,
      property_types: props.categories.property_types,
      locations: props.categories.locations,
      fileList: [],
      imageRemoveList: [],
      disabled: false, //to prevent multiple form submissions
      stage: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
    this.setFile = this.setFile.bind(this);

    this.renderStageOne = this.renderStageOne.bind(this);
    this.renderStageTwo = this.renderStageTwo.bind(this);
    this.renderStageThree = this.renderStageThree.bind(this);
    this.renderStageFour = this.renderStageFour.bind(this);
    this.renderStageFive = this.renderStageFive.bind(this);
    this.renderFormStage = this.renderFormStage.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.handleAuto = this.handleAuto.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onURLChange = this.onURLChange.bind(this);
  }

  componentDidMount() {
    this.handleAuto();
  }

  convertToDict() {
    const property = this.state.property;
    const keys = ["capacity", "description", "landlord_id", "rent", "property_type", "housing_type", "date_available", "location", "address", "number_of_bedrooms", "number_of_bathrooms", "floor_number", "mobility_aids", "furniture", "utilities_included", "accessible_shower", "car_parking", "lift_access", "lat", "long", "images", "form"];
    const values = [property.capacity, property.description, property.landlord_id, property.rent, property.property_type, property.housing_type, property.date_available, property.location, property.address, property.number_of_bedrooms, property.number_of_bathrooms, property.floor_number, property.mobility_aids, property.furniture, property.utilities_included, property.accessible_shower, property.car_parking, property.lift_access, property.lat, property.long, property.images, property.form];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }

  onURLChange(key, callback_value) {
    if (key == "image") {
      this.state.imageUrl = callback_value;
    } else if (key == "form") {
      this.state.formName = callback_value;
    }
  }

  // autocomplete
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

  // api create
  handleCreate() {
    this.setState({disabled: true});
    let body = this.convertToDict();
    body = JSON.stringify({property: body});
    var request = APIRoutes.properties.create;
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
    this.setState({ files: files[0] });
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

    return (
      <div>
        Images
        <PicturesWall {...buttonProps} />
      </div>
    )
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

  renderStageOne() {
    const { property } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    return (
      <div className="property-form-container">
        <h1>Step 1: Tell us about your space.</h1>
        <Form className="grid-container" hideRequiredMark={true}>
          <Form.Item
            label="Address"
          >
            <input id="address" onChange={() => this.handleChange("address")} ref={(ref) => { this.autocompleteElem = ref; }} size="8"/>
          </Form.Item>
          <Form.Item
            label="Monthly rent"
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
              <Select placeholder="Select One" value={property.housing_type} onChange={(value) => this.handleChangeSelect("housing_type", value)}>
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
              <Select placeholder="Select One" value={property.property_type} onChange={(value) => this.handleChangeSelect("property_type", value)}>
              {
                this.state.nice_property_types.map((obj, i) => {
                  return <Option key={i} value={this.state.property_types[i]}>{obj}</Option>
                })
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Location"
          >
          {getFieldDecorator('location', {
            initialValue: property.location,
            rules: [{
              required: true, message: 'Please select a location!',
            }],
          })(
            <Select placeholder="Select One" value={property.location} onChange={(value) => this.handleChangeSelect("location", value)}>
            {
              this.state.nice_locations.map((obj, i) => {
                return <Option key={i} value={this.state.locations[i]}>{obj}</Option>
              })
            }
            </Select>
          )}
          </Form.Item>
          <Form.Item
            label="Date available"
          >
            {getFieldDecorator('date_available', {
              initialValue: property.date_available ? moment() : moment(property.date_available),
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
              <InputNumber
                min={0}
                max={100}
                value={property.capacity}
                onChange={(value) => this.handleChangeSelect("capacity", value)}
              />
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
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {window.location = '/'}}>Cancel</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(2, "next")}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageTwo() {
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const { property } = this.state;
    return (
      <div className="property-form-container">
        <h1>Step 2: Couple more details.</h1>
        <Form hideRequiredMark={true}>
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
                <InputNumber
                  min={0}
                  max={100}
                  value={property.floor_number}
                  onChange={(value) => this.handleChangeSelect("floor_number", value)}
                />
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
                <Select placeholder="Select One" value={property.mobility_aids} onChange={(value) => this.handleChangeSelect("mobility_aids", value)}>
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
                <Select placeholder="Select One" value={property.lift_access} onChange={(value) => this.handleChangeSelect("lift_access", value)}>
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
                <Select placeholder="Select One" value={property.accessible_shower} onChange={(value) => this.handleChangeSelect("accessible_shower", value)}>
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
                <Select placeholder="Select One" value={property.utilities_included} onChange={(value) => this.handleChangeSelect("utilities_included", value)}>
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
                <Select placeholder="Select One" value={property.furniture} onChange={(value) => this.handleChangeSelect("furniture", value)}>
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
                <Select placeholder="Select One" value={property.car_parking} onChange={(value) => this.handleChangeSelect("car_parking", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
          </div>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(1, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(3, "next")}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageThree() {
    const { property } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    return (
      <div className="property-form-container">
        <h1>Step 3: Set the scene.</h1>
        Write a quick summary of your place. You can highlight what's special about your space and the neighborhood.
        <div className="sub-container">
          <Form hideRequiredMark={true}>
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
                  placeholder="Share what makes your property special, like favorite food spots, public transportation
                  in the area, parks, or a unqiue landmark."
                  onChange={() => this.handleChange("description")}
                />
              )}
            </Form.Item>
          </Form>
        </div>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(2, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(4, "next")}}>Next</Button>
        </div>
      </div>
    )
  }

  uploadImages = (signedIds) => {
    let uploadList = []
    signedIds.map((signedId) => {
      uploadList.push(signedId);
    });
    let property = this.state.property
    property["images"] = uploadList;
    this.setState({ property: property });
  }

  uploadForms = (signedIds) => {
    let property = this.state.property
    property["form"] = signedIds[0];
    this.setState({ property: property })
  }

  renderStageFour() {
    const { property } = this.state;
    return (
      <div className="property-form-container">
        <h1>Step 4: Bring it to life. (Optional)</h1>
        This step is optional but definitely highly encouraged. Photos help guests imagine staying in your place. You can start with one and add more after you publish.
        <div className="sub-container">
          <Form hideRequiredMark={true}>
            <Form.Item
              label="Add images"
            >
              <div className="upload-image">
                <DirectUploadProvider
                  key={'image'}
                  multiple={true}
                  onSuccess={signedIds => { this.uploadImages(signedIds) }}
                  render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, onURLChange: this.onURLChange, imageUrl: this.state.imageUrl, type: "images", fileConstraints: "image/*" })}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(3, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(5, "next")}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageFive() {
    const { property } = this.state;
    return (
      <div className="property-form-container">
        <h1>Step 5: Additional paperwork (Optional)</h1>
        Do you require potential clients to fill out any additional paperwork outside of the general client form?
        <div className="sub-container">
          <Form hideRequiredMark={true}>
            <Form.Item
              label="Upload form"
            >
              <div className="upload-form">
                <DirectUploadProvider
                  key={'form'}
                  multiple={false}
                  onSuccess={signedIds => { this.uploadForms(signedIds) }}
                  render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, onURLChange: this.onURLChange, filename: this.state.formName, type: "form", fileConstraints: "application/msword, application/vnd.ms-excel, text/plain, application/pdf" })}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(4, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={this.handleCreate}>Submit</Button>
        </div>
      </div>
    )
  }

  nextButton(stage, action) {
    if (action == "previous") {
      this.setState({ stage: stage });
    } else {
      this.props.form.validateFields(
        (err) => {
          if (!err) {
            this.setState({ stage: stage });
          }
        },
      );
    }
  }

  renderFormStage() {
    const { stage } = this.state;
    if (stage == 1) {
      return (
        <div>{this.renderStageOne()}</div>
      )
    }
    if (stage == 2) {
      return (
        <div>{this.renderStageTwo()}</div>
      )
    }
    if (stage == 3) {
      return (
        <div>{this.renderStageThree()}</div>
      )
    }
    if (stage == 4) {
      return (
        <div>{this.renderStageFour()}</div>
      )
    }
    if (stage == 5) {
      return (
        <div>{this.renderStageFive()}</div>
      )
    }
  }

  render() {
    let component = this.renderFormStage();
    // let temp = this.renderStageFour();
    return (
      <div>
        {component}
      </div>
    )
  }

}
export default Form.create()(CreatePropertyForm);

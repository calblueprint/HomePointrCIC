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
import '../../../assets/stylesheets/CreatePropertyForm.css';

class CreatePropertyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {
        capacity: null,
        description: '',
        landlord_id: this.props.current_userID,
        rent: null,
        size: null,
        property_type: null,
        housing_type: null,
        date_available: new Date(),
        location: 'other_location',
        address: '',
        number_of_bedrooms: null,
        number_of_bathrooms: null,
        floor_number: null,
        mobility_aids: null,
        furniture: null,
        utilities_included: null,
        accessible_shower: null,
        car_parking: null,
        lift_access: null,
        images: null,
        form: null,

        // name: '',
        // description: '',
        // email: '',
        // phone: '',
        // rent: 0,
        // housing_type: "other_housing_type",
        // property_type: "other_property_type",
        // num_bedrooms: 1,
        // location: "other_location",
        // referral_agency_id: this.props.current_userID,
        // date_needed: new Date(),
        // avatar: null,
        // number_of_bathrooms: 1,
        // mobility_aids: true,
        // accessible_shower: true,
        // car_parking: true,
        // lift_access: true,
        // family_size: 1,
        // living_arrangements: '',
        // income: '',
        // benefits: true,
        // local_council: true,
        // ex_offender: true,
        // local_area_link: '',
      },
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
  }

  // componentDidMount() {
  //   render() {
  //     return <div>{this.renderStageOne()}</div>
  //   }
  // }

  convertToDict() {
    const property = this.state.property;
    const keys = ["capacity", "description", "landlord_id", "rent", "size", "property_type", "housing_type", "date_available", "location", "address", "number_of_bedrooms", "number_of_bathrooms", "floor_number", "mobility_aids", "furniture", "utilities_included", "accessible_shower", "car_parking", "lift_access"];
    const values = [property.capacity, property.landlord_id, property.rent, property.size, property.property_type, property.housing_type, property.date_available, property.location, property.address, property.number_of_bedrooms, property.number_of_bathrooms, property.floor_number, property.mobility_aids, property.furniture, property.utilities_included, property.accessible_shower, property.car_parking, property.lift_access];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
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

  renderStageOne() {
    const { property } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    return (
      <div className="container">
        <h2>Step 1: Tell us about your space.</h2>
        <Form className="grid-container">
          <Form.Item
            label="Address"
          >
            {getFieldDecorator('address', {
              initialValue: property.address,
              rules: [{
                required: true, message: 'Please input the address!',
              }],
            })(
              <Input onChange={() => this.handleChange("address")}/>
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
              initialValue: property.housing_type ? property.housing_type : "Select one",
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
              initialValue: property.property_type ? property.property_type : "Select one",
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
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {window.location = '/'}}>Cancel</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(2)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageTwo() {
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const { property } = this.state;
    return (
      <div className="container">
        <h2>Step 2: Couple more details.</h2>
        <Form>
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
                initialValue: property.mobility_aids == null ? "Select one" : property.mobility_aids,
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
                initialValue: property.lift_access == null ? "Select one" : property.lift_access,
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
                initialValue: property.accessible_shower == null ? "Select one" : property.accessible_shower,
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
                initialValue: property.utilities_included == null ? "Select one" : property.utilities_included,
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
                initialValue: property.furniture == null ? "Select one" : property.furniture,
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
                initialValue: property.car_parking == null ? "Select one" : property.car_parking,
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
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(1)}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(3)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageThree() {
    const { property } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    return (
      <div className="container">
        <h2>Step 3: Set the scene.</h2>
        <h3>Write a quick summary of your place. You can highlight what's special about your space and the neighborhood.</h3>
        <Form>
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
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(2)}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(4)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageFour() {
    const { property } = this.state;
    return (
      <div className="container">
        <h2>Step 4: Bring it to life.</h2>
        <h3>Photos help guests imagine staying in your place. You can start with one and add more after you publish.</h3>
        <Form>
          <Form.Item
            label="Add images"
          >
            <ActiveStorageProvider
              endpoint={{
                path: '/api/properties/create',
                model: "Property",
                attribute: 'images',
                method: "POST",
              }}
              multiple={true}
              headers={{
                'Content-Type': 'application/json'
              }}
              render={Utils.activeStorageUploadRenderer}
            />
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(3)}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(5)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageFive() {
    const { property } = this.state;
    return (
      <div className="container">
        <h2>Step 5: Additional paperwork (Optional)</h2>
        <h3>Do you require potential clients to fill out any additional paperwork outside of the general client form?</h3>
        <Form>
          <Form.Item
            label="Upload form"
          >
            <ActiveStorageProvider
              endpoint={{
                path: '/api/properties/create',
                model: "Property",
                attribute: 'form',
                method: "POST",
              }}
              multiple={true}
              headers={{
                'Content-Type': 'application/json'
              }}
              render={Utils.activeStorageUploadRenderer}
            />
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(4)}}>Previous</Button>
          <Button className="next" type="primary" onClick={this.handleCreate}>Submit</Button>
        </div>
      </div>
    )
  }

  nextButton(stage) {
    this.setState({ stage: stage });
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
    return (
      <div>
        {component}
      </div>
    )
  }

}
// const WrappedProfileFormproperties = Form.create({name: 'profileproperties'})(ProfileFormproperties);
export default Form.create()(CreatePropertyForm);

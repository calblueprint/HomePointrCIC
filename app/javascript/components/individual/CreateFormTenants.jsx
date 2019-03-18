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

class CreateFormTenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: {
        name: '',
        description: '',
        email: '',
        phone: '',
        rent_min: 0,
        rent_max: 5000,
        housing_type: "other_housing_type",
        property_type: "other_property_type",
        num_bedrooms: 0,
        location: "other_location",
        referral_agency_id: this.props.current_userID,
        date_needed: new Date(),
        avatar: null,
      },
      categories: props.categories,
      nice_housing_types: props.categories.nice_housing_types,
      nice_property_types: props.categories.nice_property_types,
      nice_locations: props.categories.nice_locations,
      housing_types: props.categories.housing_types,
      property_types: props.categories.property_types,
      locations: props.categories.locations,
      // avatar: this.props.tenant.avatar,
      fileList: [],
      imageRemoveList: [],
      disabled: false, //to prevent multiple form submissions
      stage: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.sliderChanges = this.sliderChanges.bind(this);
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
    this.renderStageSix = this.renderStageSix.bind(this);
    this.renderFormStage = this.renderFormStage.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  // componentDidMount() {
  //   render() {
  //     return <div>{this.renderStageOne()}</div>
  //   }
  // }

  convertToDict() {
    const tenant = this.state.tenant;
    const keys = ["name", "description", "email", "phone", "rent_min", "rent_max", "housing_type", "property_type", "num_bedrooms", "location", "referral_agency_id", "date_needed", "avatar"];
    const values = [tenant.name, tenant.description, tenant.email, tenant.phone, tenant.rent_min, tenant.rent_max, tenant.housing_type, tenant.property_type, tenant.num_bedrooms, tenant.location, tenant.referral_agency_id, tenant.date_needed, tenant.avatar];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }


  // api create
  handleCreate() {
    this.setState({disabled: true});
    var body = this.convertToDict()
    console.log(body);
    body = JSON.stringify({tenant: body});
    var request = APIRoutes.tenants.create;
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
  sliderChanges([value1, value2]) {
    const tenant = this.state.tenant;
    tenant["rent_min"] = value1;
    tenant["rent_max"] = value2;
    this.setState({ tenant: tenant });
  }
  handleChange(attr) {
    const tenant = this.state.tenant;
    tenant[attr] = event.target.value;
    this.setState({ tenant: tenant });
  }
  handleChangeDate(date) {
    console.log(date);
    const tenant = this.state.tenant;
    tenant["date_needed"] = date.format("YYYY-MM-DD");
    this.setState({ tenant: tenant });
  }
  handleChangeSelect(attr, value) {
    const tenant = this.state.tenant;
    tenant[attr] = value;
    this.setState({ tenant: tenant })
    console.log(attr);
    console.log(value);
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
      //     path: '/api/tenants/' + this.state.tenant.id.toString(),
      //     model: "Tenant",
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
    const { tenant } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>Step 1: blah blah blah</div>
        <Form>
          <Form.Item
            label="Name"
          >
            {getFieldDecorator('name', {
              initialValue: tenant.name,
              rules: [{
                required: true, message: 'Please input your Name!',
              }],
            })(
              <Input onChange={() => this.handleChange("name")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Description"
          >
            {getFieldDecorator('description', {
              initialValue: tenant.description,
              rules: [{
                required: true, message: 'Please input your description!',
              }],
            })(
              <Input onChange={() => this.handleChange("description")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Email"
          >
            {getFieldDecorator('email', {
              initialValue: tenant.email,
              rules: [{
                required: true, message: 'Please input your email!',
              }, {
                type: 'email', message: 'The input is not a valid email!'
              }],
            })(
              <Input onChange={() => this.handleChange("email")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              initialValue: tenant.phone,
              rules: [{
                required: true, message: 'Please input your phone number!',
              }]
            })(
              <Input onChange={() => this.handleChange("phone")}/>
            )}
          </Form.Item>
        </Form>
        <Button onClick={() => {this.nextButton(2)}}>Next</Button>
      </div>
    )
  }

  renderStageTwo() {
    const { getFieldDecorator } = this.props.form;
    const marks = {
      0: "$0",
      2500: "$2500",
      5000: "$5000"
    }
    const Option = Select.Option;
    const { tenant } = this.state;
    return (
      <div>
        <div>Step 2: Housing preferences</div>
        <Form>
          <Form.Item
            label="Rent"
          >
            {getFieldDecorator('rent', {
              rules: [{
                required: true, message: 'Please select your range for rent!',
              }],
            })(
              <Row>
                <Col span={4}>
                  <InputNumber
                    min={0}
                    max={5000}
                    style={{ marginLeft: 16}}
                    value={tenant.rent_min}
                    onChange={() => this.handleChange("rent_min")}
                  />
                </Col>
                <Col span={8}>
                  <Slider
                    range marks={marks}
                    min={0}
                    max={5000}
                    defaultValue={typeof tenant.rent_min === 'number' && typeof tenant.rent_max === 'number'? [tenant.rent_min, tenant.rent_max] : [0, 5000]}
                    onChange={this.sliderChanges}/>
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={0}
                    max={5000}
                    style={{ marginLeft: 16 }}
                    value={tenant.rent_max}
                    onChange={() => this.handleChange("rent_max")}
                  />
                </Col>
              </Row>
            )}
          </Form.Item>
          <Form.Item
            label="Housing Type"
            >
            {getFieldDecorator('housing_type', {
              initialValue: tenant.housing_type,
              rules: [{
                required: true, message: 'Please pick a number of bedrooms!',
              }],
            })(
              <Select onChange={(value) => this.handleChangeSelect("housing_type", value)}>
              {
                this.state.nice_housing_types.map((obj, i) => {
                  return <Option key={i} value={this.state.housing_types[i]}>{obj}</Option>
                })
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Property Type"
          >
            {getFieldDecorator('property_type', {
              initialValue: tenant.property_type,
              rules: [{
                required: true, message: 'Please pick a number of bedrooms!',
              }],
            })(
              <Select onChange={(value) => this.handleChangeSelect("property_type", value)}>
              {
                this.state.nice_property_types.map((obj, i) => {
                  return <Option key={i} value={this.state.property_types[i]}>{obj}</Option>
                })
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Number of Bedrooms"
          >
            {getFieldDecorator('num_bedrooms', {
              initialValue: tenant.num_bedrooms,
              rules: [{
                required: true, message: 'Please pick a number of bedrooms!',
              }],
            })(
              <InputNumber
                min={0}
                max={10}
                style={{ marginLeft: 16 }}
                value={tenant.num_bedrooms}
                onChange={() => this.handleChange("num_bedrooms")}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Location"
          >
          {getFieldDecorator('location', {
            initialValue: tenant.location,
            rules: [{
              required: true, message: 'Please pick a number of bedrooms!',
            }],
          })(
            <Select onChange={(value) => this.handleChangeSelect("location", value)}>
            {
              this.state.nice_locations.map((obj, i) => {
                return <Option key={i} value={this.state.locations[i]}>{obj}</Option>
              })
            }
            </Select>
          )}
          </Form.Item>
          <Form.Item
            label="Date Needed"
          >
            {getFieldDecorator('date_needed', {
              initialValue: moment(tenant.date_needed, "YYYY-MM-DD"),
              rules: [{
                required: true, message: 'Please pick the date needed!',
              }],
            })(
              <DatePicker onChange={this.handleChangeDate}/>
            )}
          </Form.Item>
        </Form>
        <Button onClick={() => {this.nextButton(3)}}>Next</Button>
      </div>
    )
  }

  renderStageThree() {
    const { tenant } = this.state;
    return (
      <div>
        <div>Step 3: blah blah</div>
        <Button onClick={() => {this.nextButton(4)}}>Next</Button>
      </div>
    )
  }

  renderStageFour() {
    const { tenant } = this.state;
    return (
      <div>
        <div>Step 4: Wooo description</div>
        <Button onClick={() => {this.nextButton(5)}}>Next</Button>
      </div>
    )
  }

  renderStageFive() {
    const { tenant } = this.state;
    return (
      <div>
        <div>Step 5: Add a profile photo</div>
        <Button onClick={() => {this.nextButton(6)}}>Next</Button>
      </div>
    )
  }

  renderStageSix() {
    const { tenant } = this.state;
    return (
      <div>
        <div>Step 6: Upload default client form</div>
        <Button onClick={() => {this.handleCreate()}}>Submit</Button>
      </div>
    )
  }

  nextButton(stage) {
    this.setState({ stage: stage });
  }

  renderFormStage() {
    const { stage } = this.state;
    console.log("in renderFormStage");
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
    if (stage == 6) {
      return (
        <div>{this.renderStageSix()}</div>
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
// const WrappedProfileFormTenants = Form.create({name: 'profileTenants'})(ProfileFormTenants);
export default Form.create()(CreateFormTenants);

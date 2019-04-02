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

class ProfileFormTenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: props.tenant,
      categories: props.categories,
      nice_housing_types: props.categories.nice_housing_types,
      nice_property_types: props.categories.nice_property_types,
      nice_locations: props.categories.nice_locations,
      housing_types: props.categories.housing_types,
      property_types: props.categories.property_types,
      locations: props.categories.locations,
      avatar: this.props.tenant.avatar,
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
    const tenant = this.state.tenant;
    const keys = ["name", "description", "email", "phone", "rent_min", "rent_max", "housing_type", "property_type", "number_of_bedrooms", "location", "referral_agency_id", "date_needed", "avatar"];
    const values = [tenant.name, tenant.description, tenant.email, tenant.phone, tenant.rent_min, tenant.rent_max, tenant.housing_type, tenant.property_type, tenant.number_of_bedrooms, tenant.location, tenant.referral_agency_id, tenant.date_needed, tenant.avatar];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }

  //api destroy
  handleDestroy() {
    let id = this.state.tenant.id;
    // let type = this.props.type;
    var request = null;
    // if (this.props.type === "properties") {
    //   request = APIRoutes.properties.delete(id)
    // } else if (this.props.type === "landlords") {
    //   request = APIRoutes.landlords.delete(id)
    // } else if (this.props.type === "referral_agencies") {
    //   request = APIRoutes.referral_agencies.delete(id)
    // } else {
      request = APIRoutes.tenants.delete(id)
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
  //api create
  // handleCreate() {
  //   this.setState({disabled: true});
  //   let type = this.props.type;
  //   var request = null;
  //   // let body = this.convertToDict(this.state.fieldNames.slice(0,8), this.state.prevValues.slice(0,8));
  //   // if (this.props.type === "properties") {
  //   //   body = JSON.stringify({property: body})
  //   //   request = APIRoutes.properties.create
  //   // } else {
  //     body = JSON.stringify({tenant: body})
  //     request = APIRoutes.tenants.create
  //   }
  //   (request, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
  //     },
  //     body: body,
  //     credentials: 'same-origin',
  //   }).then((data) => {
  //     window.location = '/';
  //   }).catch((data) => {
  //     console.error(data);
  //   });
  // }
  //api edit
  handleEdit = (event) => {
    event.preventDefault();
    let id = this.state.tenant.id;
    var request = null;
    var body = this.convertToDict()
      body = JSON.stringify({tenant: body})
      request = APIRoutes.tenants.update(id)
    this.removeImages(this.state.imageRemoveList);
    
    console.log("TENANT HANDLEEDIT");
    fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {
      window.location = '/tenants/' + id.toString();
    }).catch((data) => {
      window.location = '/tenants/' + id.toString() + '/edit';
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


  render() {
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
        <Form onSubmit={this.handleEdit}>
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
            {getFieldDecorator('number_of_bedrooms', {
              initialValue: tenant.number_of_bedrooms,
              rules: [{
                required: true, message: 'Please pick a number of bedrooms!',
              }],
            })(
              <InputNumber
                min={0}
                max={10}
                style={{ marginLeft: 16 }}
                value={tenant.number_of_bedrooms}
                onChange={() => this.handleChange("number_of_bedrooms")}
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
          <Form.Item
            label="Upload Avatar"
          >
            <ActiveStorageProvider
              endpoint={{
                path: '/api/tenants/' + this.state.tenant.id.toString(),
                model: "Tenant",
                attribute: 'avatar',
                method: "PUT",
              }}
              multiple={true}
              headers={{
                'Content-Type': 'application/json'
              }}
              render={Utils.activeStorageUploadRenderer}
            />
          </Form.Item>
          <Form.Item
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
// const WrappedProfileFormTenants = Form.create({name: 'profileTenants'})(ProfileFormTenants);
export default Form.create()(ProfileFormTenants);

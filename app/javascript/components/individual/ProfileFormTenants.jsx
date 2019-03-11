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
class ProfileFormTenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: props.tenant,
      categories: props.categories,
      category_house: props.categories.housing_type,
      category_property: props.categories.property_type,
      category_location: props.categories.location,
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
    this.inputChangeMin = this.inputChangeMin.bind(this);
    this.inputChangeMax = this.inputChangeMax.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.state.category_house);
    console.log(this.state.category_property);
  }

  convertToDict() {
    const tenant = this.state.tenant;
    keys = ["name", "description", "email", "phone", "rent_min", "rent_max", "housing_type", "property_type", "num_bedrooms", "location", "referral_agency_id", "date_needed"];
    values = [tenant.name, tenant.description, tenant.email, tenant.phone, tenant.rent_min, tenant.rent_max, tenant.housing_type, tenant.property_type, tenant.num_bedrooms, tenant.location, tenant.referral_agency_id, tenant.date_needed];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }
  //updates our values
  handleChange = (index, e) => {
    // this.state.prevValues[index] = e.target.value
    // this.setState({prevValues: this.state.prevValues})
    this.setState({tenant: this.state.tenant})
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
  handleEdit() {
    let id = this.props.tenant_id;
    // let type = this.props.type;
    var request = null;
    var body = this.convertToDict()
    // if (this.props.type === "properties") {
    //   body = JSON.stringify({property: body})
    //   request = APIRoutes.properties.update(id)
    // } else if (this.props.type === "landlords") {
    //   body = JSON.stringify({landlord: body})
    //   request = APIRoutes.landlords.update(id)
    // } else if (this.props.type === "referral_agencies") {
    //   body = JSON.stringify({referral_agency: body})
    //   request = APIRoutes.referral_agencies.update(id)
    // } else {
      body = JSON.stringify({tenant: body})
      request = APIRoutes.tenants.update(id)
    // }
    this.removeImages(this.state.imageRemoveList);
    (request, {
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
    this.setState({rent_min: value1, rent_max: value2});
  }
  inputChangeMin(value) {
    this.setState({rent_min: value});
    console.log(this.state.rent_min);
  }
  inputChangeMax(value) {
    this.setState({rent_max: value});
    console.log(this.state.rent_max);
  }
  housingChange(value) {
    this.setState({housing_type: value});
  }
  handleChange(event) {
    const work = this.state.tenant;
    tenant[event.target.name] = event.target.value;
    this.setState({ tenant: tenant });
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
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //   },
    // };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="Name"
          >
            {getFieldDecorator('name', {
              initialValue: tenant.name,
              rules: [{
                required: true, message: 'Please input your Name!',
              }],
            })(
              <Input />
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
              <Input />
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
                type: 'email', message: 'The inputis not valid email!'
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              initialValue: tenant.phone,
              rules: [{
                required: true, message: 'Please input your phone number!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="Rent"
          >
            <Row>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={5000}
                  style={{ marginLeft: 16}}
                  value={tenant.rent_min}
                  onChange={this.handleChange}
                />
              </Col>
              <Col span={8}>
                <Slider
                  range marks={marks}
                  min={0}
                  max={5000}
                  value={typeof tenant.rent_min === 'number' && typeof tenant.rent_max === 'number'? [tenant.rent_min, tenant.rent_max] : [0, 5000]}
                  onChange={this.sliderChanges}/>
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={5000}
                  style={{ marginLeft: 16 }}
                  value={tenant.rent_max}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Housing Type"
          >
            <Select defaultValue="Other Housing Type" onChange={this.handleChange}>
            {
              this.state.category_house.map((obj, i) => {
                return <Option key={i} value={obj}>{obj}</Option>
              })
            }
            </Select>
          </Form.Item>
          <Form.Item
            label="Property Type"
          >
            <Select defaultValue="Other Property Type" onChange={this.handleChange}>
            {
              this.state.category_property.map((obj, i) => {
                return <Option key={i} value={obj}>{obj}</Option>
              })
            }
            </Select>
          </Form.Item>
          <Form.Item
            label="Number of Bedrooms"
          >
            <InputNumber
              min={0}
              max={10}
              style={{ marginLeft: 16 }}
              value={tenant.num_bedrooms}
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Location"
          >
            {getFieldDecorator('date_needed', {
              rules: [{
                required: true, message: 'Please pick the date needed!',
              }],
            })(
              <Select defaultValue="Other Location" onChange={this.handleChange}>
              {
                this.state.category_location.map((obj, i) => {
                  return <Option key={i} value={obj}>{obj}</Option>
                })
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Date Needed"
          >
            {getFieldDecorator('date_needed', {
              rules: [{
                required: true, message: 'Please pick the date needed!',
              }],
            })(
              <DatePicker onChange={this.handleChange} defaultValue={moment(tenant.date_needed, "YYYY-MM-DD")}/>
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
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

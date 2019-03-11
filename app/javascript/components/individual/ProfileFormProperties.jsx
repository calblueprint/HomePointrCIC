import React from "react";
import PropTypes from "prop-types";
import { Upload, message, Form, Icon, Select, Input, InputNumber, Button, Slider, Switch, DatePicker } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import UploadButton from './UploadButton';
import SliderBar from './SliderBar';
import ActiveStorageProvider from "react-activestorage-provider";

class ProfileFormProperties extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      property: props.property,
      categories: props.categories,
      category_house: props.categories.housing_type,
      category_property: props.categories.property_type,
      category_location: props.categories.location,
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
    this.inputChangeMin = this.inputChangeMin.bind(this);
    this.inputChangeMax = this.inputChangeMax.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.state.category_house);
    console.log(this.state.category_property);
  }

  //updates our values
  handleChange = (index, e) => {
    // this.state.prevValues[index] = e.target.value
    // this.setState({prevValues: this.state.prevValues})
    this.setState({property: this.state.property})
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
      request = APIRoutes.propertys.delete(id)
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
  //     body = JSON.stringify({property: body})
  //     request = APIRoutes.propertys.create
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
    let id = this.props.property_id;
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
      body = JSON.stringify({property: body})
      request = APIRoutes.propertys.update(id)
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
    const work = this.state.property;
    property[event.target.name] = event.target.value;
    this.setState({ property: property });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const marks = {
      0: "$0",
      2500: "$2500",
      5000: "$5000"
    }
    const Option = Select.Option;
    const { property } = this.state;
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
          label="Property Address"
        >
            {getFieldDecorator('address', {
              initialValue: property.address,
              rules: [{
                required: true, message: 'Please input an address!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="Capacity"
          >
            <InputNumber
              min={0}
              max={10}
              style={{ marginLeft: 16}}
              value={property.capacity}
              onChange={this.handleChange}
            />
            {getFieldDecorator('capacity', {
              initialValue: property.address,
              rules: [{
                required: true, message: 'Please input an address!',
              }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            label="Description"
          >
            {getFieldDecorator('description', {
              initialValue: property.description,
              rules: [{
                required: true, message: 'Please add a description!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="rent"
          >
            <InputNumber
              min={0}
              max={5000}
              style={{ marginLeft: 16}}
              value={property.rent}
              onChange={this.handleChange}
            />
            {getFieldDecorator('rent', {
              initialValue: property.description,
              rules: [{
                required: true, message: 'Please add the rent!',
              }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            label="Housing Type"
          >
            <Select defaultValue={property.housing_type} onChange={this.handleChange}>
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
            <Select defaultValue={property.property_type} onChange={this.handleChange}>
            {
              this.state.category_property.map((obj, i) => {
                return <Option key={i} value={obj}>{obj}</Option>
              })
            }
            </Select>
          </Form.Item>
          <Form.Item
            label="Location"
          >
            {getFieldDecorator('location', {
              rules: [{
                required: true, message: 'Please provide the location!',
              }],
            })(
              <Select defaultValue={property.location} onChange={this.handleChange}>
              {
                this.state.category_location.map((obj, i) => {
                  return <Option key={i} value={obj}>{obj}</Option>
                })
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Date Available"
          >
            {getFieldDecorator('date_available', {
              rules: [{
                required: true, message: 'Please pick the date needed!',
              }],
            })(
              <DatePicker onChange={this.handleChange} defaultValue={moment(property.date_available, "YYYY-MM-DD")}/>
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


export default Form.create()(ProfileFormProperties);

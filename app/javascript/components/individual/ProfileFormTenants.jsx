// import {
//   Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
// } from 'antd';
import React from "react";
import PropTypes from "prop-types";
import { Upload, message, Form, Icon, Select, Input, Button, Slider, Switch, DatePicker, InputNumber, Row, Col, Divider } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import UploadButton from './UploadButton';
import SliderBar from './SliderBar';
import PicturesWall from './PicturesWall';
import Avatar from './Avatar';
import DeleteModal from '../modals/DeleteModal';
import { DirectUploadProvider } from "react-activestorage-provider";

class ProfileFormTenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderInfoHousing: 0,
      renderInfoProperty: 0,
      tenant: props.tenant,
      categories: props.categories,
      nice_housing_types: props.categories.nice_housing_types,
      nice_property_types: props.categories.nice_property_types,
      nice_locations: props.categories.nice_locations,
      housing_types: props.categories.housing_types,
      property_types: props.categories.property_types,
      locations: props.categories.locations,
      avatar: this.props.avatar,
      form: this.props.client_form,
      visible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.sliderChanges = this.sliderChanges.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.setFile = this.setFile.bind(this);
  }

  convertToDict() {
    const tenant = this.state.tenant;

    const keys = ["name", "description", "email", "phone", "rent_min", "rent_max", "housing_type", "property_type", "number_of_bedrooms", "location", "referral_agency_id", "date_needed", "avatar", "number_of_bathrooms", "mobility_aids", "accessible_shower", "car_parking", "lift_access", "form"];
    const values = [tenant.name, tenant.description, tenant.email, tenant.phone, tenant.rent_min, tenant.rent_max, tenant.housing_type, tenant.property_type, tenant.number_of_bedrooms, tenant.location, tenant.referral_agency_id, tenant.date_needed, this.state.avatar, tenant.number_of_bathrooms, tenant.mobility_aids, tenant.accessible_shower, tenant.car_parking, tenant.lift_access, this.state.form];
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
  handleEdit = (event) => {
    event.preventDefault();

    this.props.form.validateFields(
      (err) => {
        if (!err) {
          let id = this.state.tenant.id;
          var request = null;
          var body = this.convertToDict()
          body = JSON.stringify({tenant: body})
          request = APIRoutes.tenants.update(id)
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
      },
    );
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
  }

  setFile(e) {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }
    this.setState({ avatar: files[0] });
  }


  uploadAvatar = (signedIds) => {
    this.setState({ avatar: signedIds[0] });
  }

  uploadForms = (signedIds) => {
    this.setState({ form: signedIds[0] });
  }

<<<<<<< HEAD
  onCancel = () => {
    this.setState({ visible: false });
  }

  showModal = () => {
    this.setState({ visible: true });
=======
  renderInfo = (which_info, e) => {
    if (which_info == "housing") {
      this.setState((state) => {
        return {renderInfoHousing: 1 - state.renderInfoHousing}
      });
    } else if (which_info == "property") {
      this.setState((state) => {
        return {renderInfoProperty: 1 - state.renderInfoProperty}
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
    }
>>>>>>> 57e2797b1fd46cf9910a72dab122a6c1cd1122d5
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
    const { TextArea } = Input;

    return (
      <div className="edit-tenant-container">
        <h1>Edit Client</h1>
        <Form onSubmit={this.handleEdit} hideRequiredMark={true}>
          <div className="section">
            <h2>Basic Information</h2>
            <div className="grid-container">
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
                label="Family Size"
              >
                {getFieldDecorator('family_size', {
                  initialValue: tenant.family_size,
                  rules: [{
                    required: true, message: 'Please pick you family size!',
                  }],
                })(
                  <InputNumber
                    min={0}
                    max={30}
                    value={tenant.family_size}
                    onChange={(value) => this.handleChangeSelect("family_size", value)}
                  />
                )}
              </Form.Item>
              <Form.Item
                label="Current Living Arrangements"
              >
                {getFieldDecorator('living_arrangements', {
                  initialValue: tenant.living_arrangements,
                  rules: [{
                    required: true, message: 'Please input your current living arrangements!',
                  }]
                })(
                  <Input onChange={() => this.handleChange("living_arrangements")}/>
                )}
              </Form.Item>
              <Form.Item
                label="Annual Household Income"
              >
                {getFieldDecorator('income', {
                  initialValue: tenant.income,
                  rules: [{
                    required: true, message: 'Please input your household income!',
                  }]
                })(
                  <InputNumber
                    style={{ width: 150 }}
                    min={0}
                    max={9999999}
                    value={tenant.income}
                    onChange={(value) => this.handleChangeSelect("income", value)}
                  />
                )}
              </Form.Item>
              <Form.Item
                label="Receiving Benefits?"
              >
                {getFieldDecorator('benefits', {
                  initialValue: tenant.benefits,
                  rules: [{
                    required: true, message: 'Please select a response!',
                  }],
                })(
                  <Select onChange={(value) => this.handleChangeSelect("benefits", value)}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                )}
              </Form.Item>
            </div>
          </div>
          <div className="section">
            <h2>Housing Preferences</h2>
            <div className="grid-container">
            <Form.Item
              label="Property Type"
            >
              <div onMouseEnter={(e) => this.renderInfo("property", e)} onMouseLeave={(e) => this.renderInfo("property", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
              {this.infoDialogueHelper("property", "Property type is the type of building of your residence.")}
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
              label="Housing Type"
              >
              <div onMouseEnter={(e) => this.renderInfo("housing", e)} onMouseLeave={(e) => this.renderInfo("housing", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
              {this.infoDialogueHelper("housing", "Housing type is housing situation or conditions of your residence.")}
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
                  onChange={(value) => this.handleChangeSelect("number_of_bedrooms", value)}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Number of Bathrooms"
            >
              {getFieldDecorator('number_of_bathrooms', {
                initialValue: tenant.number_of_bathrooms,
                rules: [{
                  required: true, message: 'Please pick a number of bedrooms!',
                }],
              })(
                <InputNumber
                  min={0}
                  max={10}
                  style={{ marginLeft: 16 }}
                  value={tenant.number_of_bathrooms}
                  onChange={(value) => this.handleChangeSelect("number_of_bathrooms", value)}
                />
              )}
            </Form.Item>
          </div>
          <Form.Item
            label="Monthly Rent"
          >
              <Row gutter={10}>
                <Col span={6}>
                  <InputNumber
                    min={0}
                    max={5000}
                    style={{ marginLeft: 16}}
                    value={tenant.rent_min}
                    onChange={() => this.handleChange("rent_min")}
                  />
                </Col>
                <Col className="slider" span={10}>
                  <Slider
                    min={0}
                    max={5000}
                    range marks={marks}
                    value={[tenant.rent_min, tenant.rent_max]}
                    style={{ width: 200, paddingLeft: 10 }}
                    defaultValue={typeof tenant.rent_min === 'number' && typeof tenant.rent_max === 'number'? [tenant.rent_min, tenant.rent_max] : [0, 5000]}
                    onChange={this.sliderChanges}/>
                </Col>
                <Col span={6}>
                  <InputNumber
                    min={0}
                    max={5000}
                    style={{ marginLeft: 16 }}
                    value={tenant.rent_max}
                    onChange={() => this.handleChange("rent_max")}
                  />
                </Col>
              </Row>
          </Form.Item>
        </div>
        <div className="section">
          <h2>Others</h2>
          <div className="grid-container">
            <Form.Item
              label="Ex-offender?"
            >
              {getFieldDecorator('ex_offender', {
                initialValue: tenant.ex_offender,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select onChange={(value) => this.handleChangeSelect("ex_offender", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Status of Local Council"
            >
              {getFieldDecorator('local_council', {
                initialValue: tenant.local_council,
                rules: [{
                  required: true, message: 'Please input your status of local council!',
                }],
              })(
                <Input onChange={() => this.handleChange("local_council")}/>
              )}
            </Form.Item>
            <Form.Item
              label="Mobility Aids"
            >
              {getFieldDecorator('mobility_aids', {
                initialValue: tenant.mobility_aids,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select onChange={(value) => this.handleChangeSelect("mobility_aids", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Accessible Shower"
            >
              {getFieldDecorator('accessible_shower', {
                initialValue: tenant.accessible_shower,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select onChange={(value) => this.handleChangeSelect("accessible_shower", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Car Parking"
            >
              {getFieldDecorator('car_parking', {
                initialValue: tenant.car_parking,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select onChange={(value) => this.handleChangeSelect("car_parking", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Lift Access"
            >
              {getFieldDecorator('lift_access', {
                initialValue: tenant.lift_access,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select onChange={(value) => this.handleChangeSelect("lift_access", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
          </div>
          <Form.Item
            label="Describe any links to local area"
          >
            {getFieldDecorator('local_area_link', {
              initialValue: tenant.local_area_link,
              rules: [{
                required: true, message: 'Please input your response!',
              }]
            })(
              <TextArea style={{ height: 120, textAlign: "left" }} onChange={() => this.handleChange("local_area_link")}/>
            )}
          </Form.Item>
        </div>
        <div className="section">
          <h2>Description</h2>
          <Form.Item
            label="Description"
          >
            {getFieldDecorator('description', {
              initialValue: tenant.description,
              rules: [{
                required: true, message: 'Please input your description!',
              }],
            })(
              <TextArea style={{ height: 120 }} onChange={() => this.handleChange("description")}/>
            )}
          </Form.Item>
        </div>
        <div className="section">
          <h2>Profile Photo</h2>
          <Form.Item
            label="Upload Avatar"
          >
            <div className="upload-image">
              <DirectUploadProvider
                multiple={false}
                onSuccess={signedIds => { this.uploadAvatar(signedIds) }}
                render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, imageUrl: this.props.image_object.url, type: "avatar" })}
              />
            </div>
          </Form.Item>
        </div>
        <div className="section">
          <h2>Client Form</h2>
          <Form.Item
            label="Upload Form"
          >
            <div className="upload-form">
              <DirectUploadProvider
                multiple={false}
                onSuccess={signedIds => { this.uploadForms(signedIds) }}
                render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, filename: this.props.form_name, type: "form" })}
              />
            </div>
          </Form.Item>
        </div>
        <div className="section">
          <div className="delete-client">
            <Row type="flex" style={{ width: 660 }}>
              <Col span={12}>
                <div><h2>Delete Client</h2></div>
              </Col>
              <Col span={12}>
                <Button className="delete-button" type="danger" onClick={this.showModal}>Delete Client</Button>
                <DeleteModal
                  title={"client"}
                  onOk={this.handleDestroy}
                  onCancel={this.onCancel}
                  visible={this.state.visible}
                />
              </Col>
            </Row>
          </div>
        </div>
          <div className="buttons">
            <Form.Item>
            <Button className="previous" onClick={() => {window.location = '/tenants/' + this.state.tenant.id.toString()}}>Cancel</Button>
            <Button className="next" type="primary" htmlType="submit">Save Changes</Button>
          </Form.Item>
        </div>
        </Form>
      </div>
    )
  }
}
// const WrappedProfileFormTenants = Form.create({name: 'profileTenants'})(ProfileFormTenants);
export default Form.create()(ProfileFormTenants);

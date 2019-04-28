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
import '../../../assets/stylesheets/createFormTenant.css';
import { DirectUploadProvider } from "react-activestorage-provider";

class CreateFormTenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderInfoHousing: 0,
      renderInfoProperty: 0,
      tenant: {
        name: '',
        description: '',
        email: '',
        phone: '',
        rent_min: 0,
        rent_max: 5000,
        housing_type: undefined,
        property_type: undefined,
        number_of_bedrooms: null,
        location: undefined,
        referral_agency_id: this.props.current_userID,
        date_needed: new Date(),
        avatar: null,
        number_of_bathrooms: null,
        mobility_aids: undefined,
        accessible_shower: undefined,
        car_parking: undefined,
        lift_access: undefined,
        family_size: 1,
        living_arrangements: '',
        income: '',
        benefits: undefined,
        local_council: undefined,
        ex_offender: undefined,
        local_area_link: '',
        avatar: null,
        form: null,
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
      stage: 1,
      imageUrl: null,
      formName: null,
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
    this.onURLChange = this.onURLChange.bind(this);
  }

  // componentDidMount() {
  //   render() {
  //     return <div>{this.renderStageOne()}</div>
  //   }
  // }

  convertToDict() {
    const tenant = this.state.tenant;
    const keys = ["name", "description", "email", "phone", "rent_min", "rent_max", "housing_type", "property_type", "number_of_bedrooms", "location", "referral_agency_id", "date_needed", "avatar", "number_of_bathrooms", "mobility_aids", "accessible_shower", "car_parking", "lift_access", "family_size", "living_arrangements", "income", "benefits", "local_council", "ex_offender", "local_area_link", "avatar", "form"];
    const values = [tenant.name, tenant.description, tenant.email, tenant.phone, tenant.rent_min, tenant.rent_max, tenant.housing_type, tenant.property_type, tenant.number_of_bedrooms, tenant.location, tenant.referral_agency_id, tenant.date_needed, tenant.avatar, tenant.number_of_bathrooms, tenant.mobility_aids, tenant.accessible_shower, tenant.car_parking, tenant.lift_access, tenant.family_size, tenant.living_arrangements, tenant.income, tenant.benefits, tenant.local_council, tenant.ex_offender, tenant.local_area_link, tenant.avatar, tenant.form];
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

  // api create
  handleCreate() {
    this.setState({disabled: true});
    var body = this.convertToDict()
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
  }

  renderStageOne() {
    const { tenant } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    return (
      <div className="tenant-form-container">
        <h1>Step 1: Basic information</h1>
        <Form className="grid-container" hideRequiredMark={true}>
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
              required: true, message: 'Please select a location!',
            }],
          })(
            <Select placeholder="Select One" value={tenant.location} onChange={(value) => this.handleChangeSelect("location", value)}>
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
                required: true, message: 'Please select your family size!',
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
              <Select placeholder="Select One" value={tenant.benefits} onChange={(value) => this.handleChangeSelect("benefits", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
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
    const marks = {
      0: "$0",
      2500: "$2500",
      5000: "$5000"
    }
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const { tenant } = this.state;
    return (
      <div className="tenant-form-container">
        <h1>Step 2: Housing preferences</h1>
        <Form hideRequiredMark={true}>
          <div className="grid-container">
            <Form.Item
              label="Housing Type"
              >
              <div onMouseEnter={(e) => this.renderInfo("housing", e)} onMouseLeave={(e) => this.renderInfo("housing", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
              {this.infoDialogueHelper("housing", "Housing type is housing situation or conditions of your residence.")}
              {getFieldDecorator('housing_type', {
                initialValue: tenant.housing_type,
                rules: [{
                  required: true, message: 'Please select a housing type!',
                }],
              })(
                <Select placeholder="Select One" value={tenant.housing_type} onChange={(value) => this.handleChangeSelect("housing_type", value)}>
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
              <div onMouseEnter={(e) => this.renderInfo("property", e)} onMouseLeave={(e) => this.renderInfo("property", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
              {this.infoDialogueHelper("property", "Property type is the type of building of your residence.")}
              {getFieldDecorator('property_type', {
                initialValue: tenant.property_type,
                rules: [{
                  required: true, message: 'Please select a property type!',
                }],
              })(
                <Select placeholder="Select One" value={tenant.property_type} onChange={(value) => this.handleChangeSelect("property_type", value)}>
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
                  required: true, message: 'Please input a number of bedrooms!',
                }],
              })(
                <InputNumber
                  min={0}
                  max={10}
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
                  required: true, message: 'Please input a number of bathrooms!',
                }],
              })(
                <InputNumber
                  min={0}
                  max={10}
                  value={tenant.number_of_bathrooms}
                  onChange={(value) => this.handleChangeSelect("number_of_bathrooms", value)}
                />
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
          </div>
          <Form.Item
            label="Monthly Rent"
          >
              <Row gutter={10}>
                <Col span={6}>
                  <InputNumber
                    min={0}
                    max={5000}
                    style={{ width: 80 }}
                    value={tenant.rent_min}
                    onChange={() => this.handleChange("rent_min")}
                  />
                </Col>
                <Col className="slider" span={12}>
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
                    style={{ width: 80 }}
                    value={tenant.rent_max}
                    onChange={() => this.handleChange("rent_max")}
                  />
                </Col>
              </Row>
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(1, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(3, "next")}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageThree() {
    const { tenant } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const { TextArea } = Input;

    return (
      <div className="tenant-form-container">
        <div><h1>Step 3: Some more information</h1></div>
        <Form hideRequiredMark={true}>
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
                <Select placeholder="Select One" value={tenant.ex_offender} onChange={(value) => this.handleChangeSelect("ex_offender", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Status with local council"
            >
              {getFieldDecorator('local_council', {
                initialValue: tenant.local_council,
                rules: [{
                  required: true, message: 'Please input your response!',
                }]
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
                <Select placeholder="Select One" value={tenant.mobility_aids} onChange={(value) => this.handleChangeSelect("mobility_aids", value)}>
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
                <Select placeholder="Select One" value={tenant.accessible_shower} onChange={(value) => this.handleChangeSelect("accessible_shower", value)}>
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
                <Select placeholder="Select One" value={tenant.car_parking} onChange={(value) => this.handleChangeSelect("car_parking", value)}>
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
                <Select placeholder="Select One" value={tenant.lift_access} onChange={(value) => this.handleChangeSelect("lift_access", value)}>
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
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(2, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(4, "next")}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageFour() {
    const { tenant } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    return (
      <div className="tenant-form-container">
        <div><h1>Step 4: Short bio about your client</h1></div>
        <Form hideRequiredMark={true}>
          <Form.Item
            label="Description"
          >
            {getFieldDecorator('description', {
              initialValue: tenant.description,
              rules: [{
                required: true, message: 'Please input your description!',
              }],
            })(
              <TextArea style={{ height: 120, textAlign: "left" }} onChange={() => this.handleChange("description")}/>
            )}
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(3, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(5), "next"}}>Next</Button>
        </div>
      </div>
    )
  }

  uploadAvatar = (signedIds) => {
    let tenant = this.state.tenant;
    tenant["avatar"] = signedIds[0];
    this.setState({ tenant: tenant });
  }

  uploadForms = (signedIds) => {
    let tenant = this.state.tenant;
    tenant["form"] = signedIds[0];
    this.setState({ tenant: tenant });
  }

  renderStageFive() {
    const { tenant } = this.state;
    return (
      <div className="tenant-form-container">
        <div><h1>Step 5: Add a profile photo (Optional)</h1></div>
        <Form hideRequiredMark={true}>
          <Form.Item
            label="Upload Avatar"
          >
            <div className="upload-image">
              <DirectUploadProvider
                key={'image'}
                multiple={false}
                onSuccess={signedIds => { this.uploadAvatar(signedIds) }}
                render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, onURLChange: this.onURLChange, imageUrl: this.state.imageUrl, type: "images" })}
              />
            </div>
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(4, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(6, "next")}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageSix() {
    const { tenant } = this.state;
    return (
      <div className="tenant-form-container">
        <div><h1>Step 5: Add Default Client Form</h1></div>
        <Form hideRequiredMark={true}>
          <Form.Item
            label="Upload Form"
          >
            <div className="upload-form">
              <DirectUploadProvider
                key={'form'}
                multiple={false}
                onSuccess={signedIds => { this.uploadForms(signedIds) }}
                render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, onURLChange: this.onURLChange, filename: this.state.formName, type: "form" })}
              />
            </div>
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(5, "previous")}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.handleCreate()}}>Submit</Button>
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
    if (stage == 6) {
      return (
        <div>{this.renderStageSix()}</div>
      )
    }
  }

  render() {
    let component = this.renderFormStage();
    return (
      <div className="create-tenant-container">
        {component}
      </div>
    )
  }

}
// const WrappedProfileFormTenants = Form.create({name: 'profileTenants'})(ProfileFormTenants);
export default Form.create()(CreateFormTenants);

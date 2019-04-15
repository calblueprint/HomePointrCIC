import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Card, Col, Row, Button, Avatar, Icon } from "antd";
import TenantModal from "./modals/TenantModal";
import PropertyModal from "./modals/PropertyModal";
import ApplicationModal from "./modals/ApplicationModal";
import SubmissionModal from "./modals/SubmissionModal";
import Utils from 'helpers/utils';
import "antd/dist/antd.css";
import TenantCard from "./individual/TenantCard";
import '../../assets/stylesheets/tenantcard.css';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: props.resources,
      type: props.type,
      checkbox: props.checkbox,
      avatar: props.avatar,
      displayTag: props.displayTag
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resources !== this.props.resources){
      this.setState({resources: nextProps.resources});
    }
  }

  renderCheckbox(property, index) {
    if (index < this.props.selectedEnd && this.props.checkbox) {
      return (<Checkbox defaultChecked={true} onChange={(e) => this.props.CheckboxChange(e, property)}>Checkbox</Checkbox>)
    }
    if (this.props.checkbox) {
      return (<Checkbox onChange={(e) => this.props.CheckboxChange(e, property)}>Checkbox</Checkbox>)
    }
  }

  renderSubmissionModal(resource, index) {
    if (this.props.submission_modal) {
      return(<SubmissionModal property={resource} tenant={this.props.tenant}/>)
    }
  }

  renderAvatar(images, type){
    if (this.props.avatar) {
      if (images === undefined || images === null) {
        if (type === "tenant") {
          return (<Avatar size={200} shape="square" icon="user" />)
        } else {
          return (<Avatar size={200} shape="square" icon="home" />)
        }
      } else {
        if (type === "tenant" || typeof(images) === "string") {
          return (<Avatar size={200} shape="square" src={images} />)
        } else {
          return (<Avatar size={200} shape="square" src={images[0].url} />)
        }
      }
    } else {
      return null;
    }
  }

  renderTenantModal(resource, index) {
    if (!this.props.tenant_modal) {
      return(<Button key={resource.id} type="default" href={"/tenants/" + resource.id}>
        View Info
      </Button>)
    } else {
      if (this.props.applications) {
        return(<TenantModal tenant={resource} app={this.props.applications[index]}/>)
      } else {
        return(<TenantModal tenant={resource}/>)
      }
    }
  }

  renderPropertyModal(resource) {
    if (this.props.property_modal) {
      return(<PropertyModal property={resource}/>)
    } else {
      return(<Button key={resource.id} type="default" href={"/properties/" + resource.id}>
        View Info
      </Button>)
    }
  }

  renderTenantSelectButton(resource) {
    if (this.props.tenantSelect) {
      return(<Button type="default" onClick={(e) => this.props.selectTenantFunc(e, resource)}>Select Client</Button>)
    }
  }

  renderApplicationStatus(index) {
    if (this.props.applications) {
      return Utils.renderStatus(this.props.applications[index].status)
    }
  }

  renderApplicationModal(app) {
    return(<ApplicationModal application={app}/>)
  }

  render() {
    return this.state.resources.map((resource, index) => {
      const { Meta } = Card;
      return (
        <div>
          <Row gutter={16}>
            {this.state.type === "property" ? (
              <Card title={resource.location} bordered={false}>
                {this.renderApplicationStatus(index)}
                <Meta
                  avatar={this.renderAvatar(resource.images, "property")}
                />
                <div><br></br></div>
                <p>{resource.description}</p>
                {this.renderCheckbox(resource, index)}
                {this.renderSubmissionModal(resource)}
                {this.renderPropertyModal(resource)}
                {this.props.applications ? this.renderApplicationModal(this.props.applications[index]) : null}
              </Card>
              // <PropertyCard property={resource} displayTag={this.props.applications[index].status}/>
            ) : (
              <TenantCard tenant={resource} displayTag={this.state.displayTag}/>
            )}
          </Row>
        </div>
      );
    });
  }
}

ListView.propTypes = {
  resources: PropTypes.array,
  applications: PropTypes.array,
  tenantSelect: PropTypes.bool,
  checkbox: PropTypes.bool,
  avatar: PropTypes.bool,
  tenant_modal: PropTypes.bool,
  property_id: PropTypes.number,
  housed: PropTypes.bool,
  property_modal: PropTypes.bool,
};

ListView.defaultProps = {
  property_id: null,
  applications: null,
  housed: null,
  property_modal: null,
  tenantSelect: null,
  applications: null,
};
export default ListView;

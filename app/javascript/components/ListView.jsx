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
import PropertyCard from "./individual/PropertyCard";
import '../../assets/stylesheets/tenantcard.css';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: props.resources,
      type: props.type,
      checkbox: props.checkbox,
      avatar: props.avatar,
      displayTag: props.displayTag,
      renderModal: props.renderModal,
    }
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderSubmissionModal = this.renderSubmissionModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resources !== this.props.resources){
      this.setState({resources: nextProps.resources});
    }
  }

  renderCheckbox(property, index) {
    if (this.props.checkbox) {
      if (index < this.props.selectedEnd) {
        return (<Checkbox className="checkbox" defaultChecked={true} onChange={(e) => this.props.CheckboxChange(e, property)}></Checkbox>)
      } else {
        return (<Checkbox className="checkbox" onChange={(e) => this.props.CheckboxChange(e, property)}/>)
      }
    }
  }

  renderSubmissionModal(resource, index) {
    if (this.props.submission_modal) {
      return(
        <SubmissionModal
          property={resource}
          onSubmitProperty={this.props.onSubmitProperty}
          tenant={this.props.tenant}
        />
      )
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

  renderTenantSelectButton(resource) {
    if (this.props.tenantSelect) {
      return(<Button type="default" onClick={(e) => this.props.selectTenantFunc(e, resource)}>Select Client</Button>)
    }
  }

  // renderApplicationStatus(index) {
  //   if (this.props.applications) {
  //     return Utils.renderStatus(this.props.applications[index].status, true)
  //   }
  // }

  renderApplicationModal(app) {
    return(<ApplicationModal application={app}/>)
  }

  getApplication = (index) => {
    if (this.props.applications) {
      return this.props.applications[index];
    }
  }

  render() {
    return this.state.resources.map((resource, index) => {
      return (
        <div key={resource.id}>
          <Row gutter={16} key={index}>
            {this.state.type === "property" ? (
              <div>
                <div className="#">
                  {this.renderCheckbox(resource, index)}
                </div>

                <PropertyCard
                  property={resource}
                  displayTag={this.state.displayTag}
                  renderModal={this.props.renderModal}
                  noClick={this.props.noClick}
                  viewpoint={this.props.viewpoint}
                  key={index}
                />

                <div className="#">
                  {this.renderSubmissionModal(resource)}
                </div>
              </div>
            ) : (
              <TenantCard
                tenant={resource}
                displayTag={this.props.displayTag}
                renderModal={this.props.renderModal}
                viewpoint={this.props.viewpoint}
                application={this.getApplication(index)}
                key={index}
              />
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
};

ListView.defaultProps = {
  applications: null,
  tenantSelect: null,
  applications: null,
};
export default ListView;

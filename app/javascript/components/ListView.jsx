import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Card, Col, Row, Button } from "antd";
import "antd/dist/antd.css";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: this.props.resources,
      type: this.props.type
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(property_id) {
    window.location.assign("/properties/" + property_id);
  }

  render() {
    return this.state.resources.map(resource => {
      return (
        <div
          style={{
            background: "#ECECEC",
            padding: "30px",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "2%"
          }}
        >
          <Row gutter={16}>
            {this.state.type === "property" ? (
              <Card title={resource.location} bordered={false}>
                {resource.description}
                <Checkbox onChange={(e) => this.props.CheckboxChange(e, resource.id)}>Checkbox</Checkbox>
                <Button type="default" href={"/properties/" + resource.id}>
                  View Info
                </Button>
              </Card>
            ) : (
              <Card title={resource.name} bordered={false}>
                <Checkbox onChange={(e) => this.props.CheckboxChange(e, resource.id)}>Checkbox</Checkbox>
                <Button type="default" href={"/tenants/" + resource.id}>
                  View Info
                </Button>
              </Card>
            )}
          </Row>
        </div>
      );
    });
  }
}

ListView.propTypes = {
  resources: PropTypes.array
};
export default ListView;

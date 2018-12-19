import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Card, Col, Row, Button, Avatar } from "antd";
import "antd/dist/antd.css";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: props.resources,
      type: props.type,
      checkbox: props.checkbox,
      avatar: props.avatar,
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.resources !== this.props.resources){
      this.setState({resources: nextProps.resources});
    }
  }

  renderCheckbox(id) {
    if (this.props.checkbox === true) {
      return (<Checkbox onChange={(e) => this.props.CheckboxChange(e, id)}>Checkbox</Checkbox>)
    }
  }

  renderAvatar(url){
    if (this.props.avatar === true) {
      return (<Avatar size={200} shape="square" src={url} />)
    } else {
      return null;
    }
  }

  render() {
    return this.state.resources.map(resource => {
      const { Meta } = Card;
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
              <Card bordered={false}>
                <Meta
                  avatar={this.renderAvatar(resource.url)}
                  title={resource.location}
                  description={resource.description}
                />
                {this.renderCheckbox(resource.id)}
                <Button type="default" href={"/properties/" + resource.id}>
                  View Info
                </Button>
              </Card>
            ) : (
              <Card title={resource.name} bordered={false}>
                <Meta
                  avatar={this.renderAvatar(resource.url)}
                />
                {this.renderCheckbox(resource.id)}
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

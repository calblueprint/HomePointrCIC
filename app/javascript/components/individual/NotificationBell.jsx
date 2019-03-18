import React from "react";
import "antd/dist/antd.css";
import { Badge, Menu, Dropdown, Icon } from "antd";

class NotificationBell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count
    };
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={["click"]}>
        <Badge count={this.state.count}>
          <Icon type="bell" theme="twoTone" style={{ fontSize: "30px" }} />
        </Badge>
      </Dropdown>
    );
  }
}

export default NotificationBell;

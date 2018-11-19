import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Button } from 'antd';
import 'antd/dist/antd.css';

 const ListView = (props) => {
  // 'ListView', {View}
  const handleClick = (property_id) => {
    window.location.assign("/properties/" + property_id);
  }
	return (
    props.resources.map((resource) => {
      return (
      <div style={{ background: '#ECECEC', padding: '30px', marginLeft: '20%', marginRight: '20%', marginTop: '2%' }}>
        <Row gutter={16}>
        {props.type == 'property' ? 
       (<Card title={resource.location} bordered={false}>
        {resource.description}
        <Button type="default" href={"/properties/" + resource.id}> View Info </Button>
      </Card>) 
      : 
      (<Card title={resource.name} bordered={false}>
        <Button type="default" href={"/tenants/" + resource.id}> View Info </Button>
      </Card>)
      }
    </Row>
  </div>
      )
    })
 	);
}

 ListView.propTypes = {
  resources: PropTypes.array
};
 export default ListView;
import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from 'antd';
import View from './View.jsx';

 const ListView = (props) => {
  // 'ListView', {View}
  const handleClick = (property_id) => {
    alert('hi');
  }
	return (
    
    props.resources.map((resource) => {
      return (
      <div style={{ background: '#ECECEC', padding: '30px', marginLeft: '20%', marginRight: '20%', marginTop: '2%' }}>
        <Row gutter={16}>
        {props.type == 'property' ? <Card> : <Card>}
       <Card title={resource.location} bordered={false}>
        {resource.description}
        <button onClick={handleClick}> View Property </button>
      </Card>
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
import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from 'antd';

 const ListView = (props) => {
  // 'ListView', {View}
	return (
    
    props.resources.map((resource) => {
      return (
      <div style={{ background: '#ECECEC', padding: '30px', marginLeft: '20%', marginRight: '20%', marginTop: '2%' }}>
        <Row gutter={16}>
        <View />
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
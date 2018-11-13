import PropTypes from "prop-types";
import 'antd/dist/antd.css';
 const PropertyView = props => {
	return (
    props.fieldNames.map((name, index) => {
      <li>
      	<label>{name}</label>
      	{props.fieldValues[index]}
      </li>
    })
	);
}
 PropertyView.propTypes = {
  fieldNames: PropTypes.array,
  fieldValues: PropTypes.array
};
 export default PropertyView;
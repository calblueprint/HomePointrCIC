import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Slider, Switch, InputNumber } from 'antd';
import PropTypes from "prop-types";

class SliderBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lowValue: this.props.lowValue,
      highValue: this.props.highValue,
    };
    this.onLowChange = this.onLowChange.bind(this);
    this.onHighChange = this.onHighChange.bind(this);
  }

  onLowChange = (value) => {
    this.setState({
      lowValue: value,
    });
    this.props.updateFunc(value, this.state.highValue, this.props.index);
  }

  onHighChange = (value) => {
    this.setState({
      highValue: value,
    });
    this.props.updateFunc(this.state.lowValue, value, this.props.index);
  }

  render() {
    return (
      <div>
        <InputNumber
            min={0}
            max={this.state.highValue}
            value={this.state.lowValue}
            onChange={this.onLowChange}
         />
        <Slider range defaultValue={[this.props.lowValue, this.props.highValue]} max={5000} value={[this.state.lowValue, this.state.highValue]}/>
        <InputNumber
            min={this.state.lowValue}
            max={5000}
            value={this.state.highValue}
            onChange={this.onHighChange}
         />
      </div>
    );
  }
}

SliderBar.propTypes = {
  lowValue: PropTypes.number,
  highValue: PropTypes.number,
  updateFunc: PropTypes.func,
  index: PropTypes.number
};

export default SliderBar;

import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return <p>{this.props.greeting}</p>
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld;

import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return <p>What's up Arp</p>
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld;

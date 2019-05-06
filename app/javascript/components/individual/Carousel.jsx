import React from "react";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
      imgCount: this.props.images.length,
      currentImg: 0
    }
  }

  onRightClick = () => {
    if (this.state.currentImg < this.state.imgCount - 1) {
      this.setState((state) => {
        return {currentImg: state.currentImg + 1}
      });
    } else {
      this.setState((state) => {
        return {currentImg: 0}
      });
    }
  }

  onLeftClick = () => {
    if (this.state.currentImg > 0) {
      this.setState((state) => {
        return {currentImg: state.currentImg - 1}
      });
    } else {
      this.setState((state) => {
        return {currentImg: state.imgCount - 1}
      });
    }
  }

render() {
    if (this.props.location === "modal") {
      if (this.state.imgCount !== 1) {
        return (
          <div className="carousel-modal">
            <img className="carousel-img-modal" src={this.state.images[this.state.currentImg]["url"]}/>
            <div className="left-arrow-modal">
              <img src="/assets/left-arrow.png" onClick={this.onLeftClick} className="arrow-img"/>
            </div>
            <div className="right-arrow-modal">
              <img src="/assets/right-arrow.png" onClick={this.onRightClick} className="arrow-img"/>
            </div>
            <div className="expand-text h3-expand">
              Click and hold image to expand.
            </div>
          </div>
        );
      } else {
        return(
          <div className="carousel-modal">
            <img className="carousel-img-modal" src={this.state.images[this.state.currentImg]["url"]}/>
          </div>
        );
      }
    } else if (this.props.location === "view") {
      if (this.state.imgCount !== 1) {
        return (
          <div className="carousel-view">
            <img className="carousel-img-view" src={this.state.images[this.state.currentImg]["url"]}/>
            <div className="carousel-arrows-wrapper">
              <div className="left-arrow-view">
                <img src="/assets/left-arrow.png" onClick={this.onLeftClick} className="arrow-img"/>
              </div>
              <div className="right-arrow-view">
                <img src="/assets/right-arrow.png" onClick={this.onRightClick} className="arrow-img"/>
              </div>
            </div>
          </div>
        );
      } else {
        return(
          <div className="carousel-view">
            <img className="carousel-img-view" src={this.state.images[this.state.currentImg]["url"]}/>
          </div>
        );
      }
    }
  }
}

export default Carousel;

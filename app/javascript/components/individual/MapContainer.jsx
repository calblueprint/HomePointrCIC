import React from "react";
import PropTypes from "prop-types";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Card } from 'antd';

const { Meta } = Card;

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    };
    this.markersList = this.markersList.bind(this);
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  markersList() {
    return this.props.filtered_properties.map((data) => {
      //testing purposes
      const min = 37.778519;
      const max = 38;
      const rand = min + Math.random() * (max - min);
      return (
        <Marker
          name={data.address}
          onClick={this.onMarkerClick}
          position={{ lat: rand, lng: -122.40564 }}
        />
      )
    })
  }


  render() {
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '100%', position: 'relative', width: '50%' }}
        zoom={14}
        initialCenter={{
          lat: 37.778519,
          lng: -122.40564
        }}
      >
        
        {this.markersList()}

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <Card
              title={this.state.selectedPlace.name}
              style={{ width: 240 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBb_iss2krVXSMsIsacWlIsVrc-7r6xBPE"
})(MapContainer)
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_GEOCODING } from 'src/definitions/ApiConfig';

const AnyReactComponent = (lat: any, lng: any, text: any) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_GEOCODING.API_KEY }}
          defaultCenter={SimpleMap.defaultProps.center}
          defaultZoom={SimpleMap.defaultProps.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

import React from 'react';

import { MapWithAGeocode } from 'components/map/GoogleMap';

export class RentalMap extends React.Component{
  render() {
    const location = this.props.location;
    return(
      <MapWithAGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-tsuo3-7P6MHm1ehk53rauJzav_OfhPM&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    )
  }
}
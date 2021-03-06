import React from 'react';

import { MapWithAGeocode } from 'components/map/GoogleMap';
import { connect } from 'react-redux';

import * as actions from 'actions'

class RentalMap extends React.Component{

  reloadMapFinish() {
    this.props.dispatch(actions.reloadMapFinish());
  }
  render() {
    const { location, map: {isReloading} } = this.props;
    return(
      <MapWithAGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-tsuo3-7P6MHm1ehk53rauJzav_OfhPM&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `405px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
        isReloading={isReloading}
        mapLoaded={() => this.reloadMapFinish()}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    map:state.map
  }
}

export default connect(mapStateToProps)(RentalMap);

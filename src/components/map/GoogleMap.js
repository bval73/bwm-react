import React from 'react';
import { Cacher } from 'services/cacher';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
//  Marker,
  Circle,
  InfoWindow
} from "react-google-maps";

function MapComponent(props) {
console.log('MapComponent');

  const {coordinates, isError, isLocationLoaded} = props;
//  const coordinates = props.coordinates;

  return(
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
      options={{disableDefaultUI: isError ? true : false}}
    >
      {isLocationLoaded && !isError && <Circle center={coordinates} radius={500} />}
      {isLocationLoaded && isError && <InfoWindow position={coordinates} options={{maxWidth:300}} > 
        <div>
          There was an issue finding the location on the map, we are trying to resolve the 
          issue as soon as possible. 
        </div>
      </InfoWindow>}
    </GoogleMap>
  )
}

function withGeocode(WrappedComponent) {

  return class extends React.Component {
    constructor() {
      super();

      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError:false,
        isLocationLoaded: false
      }
    }

    componentWillMount() {
      console.log('componentWillMount');
      this.getGeocodeLocation();
    }

/*    componentDidMount(){
      console.log('componentDidMount');
    }*/

    updateCoordinates(coordinates) {
      this.setState({
        coordinates,
        isLocationLoaded: true
      })
    }

    geocodeLocation(location){
      console.log('geocodeLocation');
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({address: location}, (result, status) => {
          if(status === 'OK') {
            const geometry = result[0].geometry.location;
            const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
            
            this.cacher.cacheValue(location, coordinates);

            resolve(coordinates);
          }else{
            reject('Error with map promise!!');
                    }
        });
      });
    }

    getGeocodeLocation() {
      console.log('getGeocodeLocation');
      const location = this.props.location;
      
/*      if(Math.floor(Math.random() * 10) > 5) {
        location = 'irbg75joihoi';
      }
*/
      //return cached value
      if (this.cacher.isValueCached(location)) {
      console.log('setState cacher');        
      this.updateCoordinates(this.cacher.getCachedValue(location));  
      //return geocode location
      } else {
        this.geocodeLocation(location).then(
          (coordinates) =>{
            console.log('getGeocodeLocation else');            
            this.updateCoordinates(coordinates);
          },
          (error) =>{
            this.setState({isLocationLoaded:true, isError: true, position:{lat:0, lng:0}} );
          }
        );
      }
    }
    
    render() {
      return(
        <WrappedComponent {...this.state}/>
      )
    }
  }
}

export const MapWithAGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));



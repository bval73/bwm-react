import { FETCH_RENTAL_BY_ID_SUCCESS, 
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS } from './types';

const axios = require('axios');

const fetchRentalByIdInit = () =>{
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    // could also say rental: rental below because key names inside of object 
    // are the same
    rental
  }
}

const fetchRentalSuccess = (rentals) => {
  return{
    type: FETCH_RENTALS_SUCCESS,
    rentals
  }
}

export const fetchRentals = () => {
  return dispatch => {
    axios.get('/api/v1/rentals')
      .then(res => res.data )
      .then(rentals => dispatch(fetchRentalSuccess(rentals))
    );
  }
}

export const fetchRentalById = (rentalId) => {
  // uses redux.thunk
  return function(dispatch){
    dispatch(fetchRentalByIdInit());
    // iterate through rentals to find selected rental
    axios.get(`/api/v1/rentals/${rentalId}`)
    .then(res => res.data)  
    .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
  }
}


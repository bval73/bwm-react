import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { FETCH_RENTAL_BY_ID_SUCCESS, 
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS, 
  LOGOUT} from './types';


//Rental Actions --------------------------------------------

const axiosInstance = axiosService.getInstance();

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
    axiosInstance.get('/rentals')
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

// Auth Actions --------------------------------------------

export const register = (userData) => {
  return axios.post('/api/v1/users/register', {...userData}).then(
    res => res.data, // sont need all brackets, curly braces when 1 liner
    err => Promise.reject(err.response.data.errors)
  )
}

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const checkAuthState = () => {
  return dispatch => {
    if(authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', {...userData})
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token)
        dispatch(loginSuccess());
        //redirect to rentals page
      })
      .catch(({response}) => {
        dispatch(loginFailure(response.data.errors));
      })
  }
}

export const logout = () => {
  authService.invalidateUser();
  return{
    type: LOGOUT
  }
}
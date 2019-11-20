import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { FETCH_RENTAL_BY_ID_SUCCESS, 
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS, 
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  LOGOUT,
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL} from './types';


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

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}

const fetchRentalsFail = (errors) => {
  return {
    type:FETCH_RENTALS_FAIL,
    errors
  }
}

export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';

  return dispatch => {
    dispatch(fetchRentalsInit());
      axiosInstance.get(url)
        .then(res => res.data )
        .then(rentals => dispatch(fetchRentalSuccess(rentals)))
        .catch(({response}) => dispatch(fetchRentalsFail(response.data.errors)))
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

export const createRental = (rentalData) => {
  return axiosInstance.post('/rentals', rentalData).then(
    res => res.data, // wont need all brackets, curly braces when 1 liner
    err => Promise.reject(err.response.data.errors)
  )
}

// User Bookings Actions -----------------------------------------------

const fetchUserBookingsSuccess = (userBookings) => {
  return{
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserBookingsFail = (errors) => {
  return {
    type:FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

export const fetchUserBookings = (userBookings) => {
  // uses redux.thunk
  return function(dispatch){
    dispatch(fetchUserBookingsInit());
    // iterate through rentals to find selected user
    axiosInstance.get('bookings/manage')
      .then(res => res.data )
      .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({response}) => dispatch(fetchUserBookingsFail(response.data.errors)))
  }
}

// User Rentals Actions -----------------------------------------------

export const getUserRentals = () => {
  return axiosInstance.get('/rentals/manage').then(
    res => res.data, // wont need all brackets, curly braces when 1 liner
    err => Promise.reject(err.response.data.errors)
  )
}

export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`/rentals/${rentalId}`).then(
    res => res.data, // wont need all brackets, curly braces when 1 liner
    err => Promise.reject(err.response.data.errors)
  )
}


// Auth Actions --------------------------------------------

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data, // wont need all brackets, curly braces when 1 liner
    err => Promise.reject(err.response.data.errors)
  )
}

const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
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
    return axios.post('/api/v1/users/auth', userData)
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

export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking)
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors));
}


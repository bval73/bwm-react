import { FETCH_RENTAL_BY_ID_SUCCESS, 
         FETCH_RENTAL_BY_ID_INIT,
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTALS_INIT,
         FETCH_RENTALS_FAIL,
         UPDATE_RENTAL_SUCCESS,
         UPDATE_RENTAL_FAIL,
         RESET_RENTAL_ERRORS } from '../actions/types';
import actions from 'redux-form/lib/actions';

const INITIAL_STATE = {
  rentals:{
    data: [],
    errors: []
  },
  rental:{
    data:{},
    errors: []
  }
}

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch(action.type){
    case FETCH_RENTALS_SUCCESS:
      return {...state, data: action.rentals, isFetching: false};
    case FETCH_RENTALS_INIT:
      return {...state, data: [], errors: [], isFetching: true};
    case FETCH_RENTALS_FAIL:
      return Object.assign({}, state, {errors: action.errors, data: [], isFetching: false});
    default:
      return state;
  }
}


export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch(action.type) {
    case FETCH_RENTAL_BY_ID_INIT:
      return {...state, data: {}};
    case FETCH_RENTAL_BY_ID_SUCCESS:
    // return Object.assign({}, state, {data: action.rental}) same as below  
      return {...state, data: action.rental};
    case  UPDATE_RENTAL_SUCCESS:
      return {...state, data: action.rental};
    case UPDATE_RENTAL_FAIL:
//      return Object.assign({}, state, {errors: action.errors, data: []});
      return {...state, errors: actions.errors};
    case RESET_RENTAL_ERRORS:
      return {...state, errors: []};
    default:
      return state;
  }
}


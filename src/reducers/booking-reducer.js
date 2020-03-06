import { FETCH_USER_BOOKINGS_INIT,
         FETCH_USER_BOOKINGS_SUCCESS,
         FETCH_USER_BOOKINGS_FAIL,
         UPDATE_BOOKINGS } from 'actions/types';
import actions from 'redux-form/lib/actions';

  const INITIAL_STATE = {
    data: [],
    errors: [],
    isFetching: false
  }

  export const userBookingsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case FETCH_USER_BOOKINGS_SUCCESS:
        return {...state, data: action.userBookings, errors: [], isFetching: false};
      case FETCH_USER_BOOKINGS_INIT:
        return {...state, data: [], errors: [], isFetching: true};
      case FETCH_USER_BOOKINGS_FAIL:
//        return Object.assign({}, state, {errors: action.errors, data: []});
        return {...state, data: [], errors: [], isFetching: false};
      case UPDATE_BOOKINGS:
        return {...state, data: action.bookings}
      default:
        return state;
    }
  }
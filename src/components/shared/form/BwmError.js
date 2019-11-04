import React from 'react';

export function BwmErrors(props) {
  const errors = props.errors;

  return(
    errors.length > 0 &&
      <div className='alert alert-danger bwm-errors'>
        {errors.map((error, index) => <p key={index}> {error.detail} </p>)}
      </div>
  )
}

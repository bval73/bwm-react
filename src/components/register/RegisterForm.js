import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmErrors } from 'components/shared/form/BwmError';


const RegisterForm = props => {
//  const { handleSubmit, pristine, reset, submitting, submitCb, valid } = props
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
          <Field
            name="username"
            label="Username"
            type="text"
            className="form-control"
            component={BwmInput}
          />
          <Field
            name="email"
            label="Email"
            type="email"
            className="form-control"
            component={BwmInput}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            className="form-control"
            component={BwmInput}
          />
          <Field
            name="passwordConfirmation"
            label="Password Confirmatioin"
            type="password"
            className="form-control"
            component={BwmInput}
          />
        <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Register
        </button>
        <BwmErrors errors={errors} />
    </form>
  )
}

const validate = values => {
  const errors = {}

  if(values.username && values.username.length < 4) {
    errors.username= 'username min length is 4 characters';
  }

/*  if(!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email';
  }*/
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if(!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter a password confirmation';
  }

  if(values.password !== values.passwordConfirmation) {
    errors.password = 'Password and password confirmation must match.'
  }

  /*  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
 */
  return errors
}

export default reduxForm({
  form: 'registerForm', // a unique identifier for this form
  validate
})(RegisterForm)

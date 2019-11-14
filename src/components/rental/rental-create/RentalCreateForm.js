import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmTextArea } from 'components/shared/form/BwmTextArea';
import { BwmSelect } from 'components/shared/form/BwmSelect';
import { BwmFileUpload } from 'components/shared/form/BwmFileUpload';
import { BwmErrors } from 'components/shared/form/BwmError';

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
//    const { title, city, street, bedrooms, dailyRate, handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
    return (
      <form onSubmit={handleSubmit(submitCb)}>
            <Field
              name="title"
              label="Title"
              type="text"
              className="form-control"
              component={BwmInput}
            />
            <Field
              name="description"
              label="Description"
              rows='6'
              type="text"
              className="form-control"
              component={BwmTextArea}
            />
            <Field
              name="city"
              label="City"
              type="text"
              className="form-control"
              component={BwmInput}
            />
            <Field
              name="street"
              label="Street"
              type="text"
              className="form-control"
              component={BwmInput}
            />
             <Field
              options={options}
              name="category"
              label="Category"
              className="form-control"
              component={BwmSelect}
            />
            <Field
              name="image"
              label="Image"
              component={BwmFileUpload}
            />
            <Field
              name="bedrooms"
              label="Bed Rooms"
              type="number"
              className="form-control"
              component={BwmInput}
            />
            <Field
              name="dailyRate"
              label="Daily Rate"
              type="text"
              symbol='$'
              className="form-control"
              component={BwmInput}
            />
            <Field
              name="shared"
              label="Shared"
              type="checkbox"
              className="form-control form-checkbox"
              component={BwmInput}
            />
          <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
            Creat Rental
          </button>
          <BwmErrors errors={errors} />
      </form>
    )
  }

  
  export default reduxForm({
    form: 'rentalCreateForm', // a unique identifier for this form
    initialValues: { shared: false, category: 'house' }
  })(RentalCreateForm)


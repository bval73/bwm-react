import React from 'react';
import { connect } from 'react-redux';

import { RentalAssets } from './RentalAssets';
import { toUpperCase, rentalType } from 'helpers';

import { EditableInput } from '../../shared/editable/EditableInput';
import { EditableTextArea } from '../../shared/editable/EditableTextArea';
import { EditableSelect } from '../../shared/editable/EditableSelect';

import * as actions from 'actions';


export class RentalDetailUpdate extends React.Component{

  constructor() {
    super();

    this.updateRental = this.updateRental.bind(this);
    this.resetRentalErrors = this.resetRentalErrors.bind(this);
  }
  
  updateRental(rentalData) {
    const {rental: {_id}, dispatch, errors } = this.props;
    console.log('updateRental');
    debugger;

    this.props.dispatch(actions.updateRental(_id, rentalData));
  }

  resetRentalErrors() {
    console.log('resetRentalErrors');
    this.props.dispatch(actions.resetRentalErrors());
  }

  render() {
    const {rental, errors} = this.props;
    console.log('RentalDetailUpdate render');
    console.log(errors);
    
    return (
      <div className='rental'>
        <label className={`rental-label rental-type ${rental.category}`}> Shared </label>
        <EditableSelect entity={rental} 
                       entityField={'shared'} 
                       className={`rental-type ${rental.category}`}
                       updateEntity={this.updateRental}
                       options={[true, false]}
                       containerStyle={{'display': 'inline-block'}}
                       errors={errors}
                       resetErrors={this.resetRentalErrors} />

        <EditableSelect entity={rental} 
                       entityField={'category'} 
                       className={`rental-type ${rental.category}`}
                       updateEntity={this.updateRental}
                       options={['apartment', 'house', 'condo']}
                       errors={errors}
                       resetErrors={this.resetRentalErrors} />

        <div className='rental-owner'>
          <img src='https://api.adorable.io/avatars/285/abott@adorable.png' alt='owner'/>
          <span>{rental.user && rental.user.username}</span>
        </div>

        <EditableInput entity={rental} 
                       entityField={'title'} 
                       className={'rental-title'}
                       updateEntity={this.updateRental}
                       errors={errors}
                       resetErrors={this.resetRentalErrors} />

        <EditableInput entity={rental} 
                       entityField={'city'} 
                       className={'rental-city'}
                       updateEntity={this.updateRental}
                       errors={errors}
                       resetErrors={this.resetRentalErrors} />

        <EditableInput entity={rental} 
                       entityField={'street'} 
                       className={'rental-street'}
                       updateEntity={this.updateRental}
                       errors={errors}
                       resetErrors={this.resetRentalErrors} />

        <div className='rental-room-info'>
          <span><i className='fa fa-building'></i>
            <EditableInput entity={rental} 
                entityField={'bedrooms'} 
                className={'rental-bedrooms'}
                containerStyle={{'display': 'inline-block'}}
                updateEntity={this.updateRental}
                errors={errors}
                resetErrors={this.resetRentalErrors} />
           bedrooms</span>
          <span><i className='fa fa-user'></i> {rental.bedrooms + 4} guests</span>
          <span><i className='fa fa-bed'></i> {rental.bedrooms + 2} beds</span>
        </div>
        <EditableTextArea entity={rental} 
                entityField={'description'} 
                className={'rental-description'}
                containerStyle={{'display': 'inline-block'}}
                updateEntity={this.updateRental} 
                rows={6}
                cols={50}
                errors={errors}
                resetErrors={this.resetRentalErrors} />
        <hr></hr>
        <RentalAssets />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rental: state.rental.data,
    errors: state.rental.errors
  }
}

export default connect(mapStateToProps)(RentalDetailUpdate)

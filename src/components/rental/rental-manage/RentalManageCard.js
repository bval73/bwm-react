import React from 'react';
import { Link } from 'react-router-dom';
import { dtFormat, toUpperCase } from 'helpers';

export class RentalManageCard extends React.Component {

  constructor() {
    super();

    this.state = {
      deleteRental: false
    }
  }

  showDeleteMenu() {
    this.setState({
      deleteRental: true
    })
  }

  closeDeleteMenu() {
    this.setState({
      deleteRental: false
    })
  }

  deleteRental(rentalId, rentalIndex) {
    this.setState({deleteRental: false})

    this.props.deleteRentalCb(rentalId, rentalIndex);
  }

  render() {
    const { rental, modal, rentalIndex } = this.props;
    const { deleteRental } = this.state;

    const deleteClass =  deleteRental ? 'toBeDeleted' : '';
    return(
      <div className='col-md-4'>
        <div className={`card text-center ${deleteClass}`}>
          <div className='card-block'>
            <h4 className='card-title'>{toUpperCase(rental.title)} - {toUpperCase(rental.city)}</h4>
            <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link>
            { rental.bookings && rental.bookings.length > 0 && modal }
          </div>
          <div className='card-footer text-muted'>
            Created on {dtFormat(rental.createdAt)}
            { !deleteRental &&
              <React.Fragment>
                <p>
                  <button onClick={() => { this.showDeleteMenu()}} className='btn btn-danger'>Delete Rental</button>
                  <Link className='btn btn-warning' to={{pathname: `/rentals/${rental._id}`, state:{isUpdate: true}}}>Update </Link>
                </p>
              </React.Fragment>
            }
            { deleteRental && 
              <div className='delete-menu'>
                Do you confirm?
                <button onClick={() => { this.deleteRental(rental._id, rentalIndex)}} className='btn btn-danger'>Yes</button>
                <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'>No</button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

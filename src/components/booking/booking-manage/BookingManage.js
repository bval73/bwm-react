import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from 'actions';

import { BookingCard, PaymentCard } from './BookingCard'

class BookingManage extends React.Component {

  state = {
    pendingPayments: []
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
    this.getPendingPayments();
  }

  getPendingPayments() {
    actions.getPendingPayments()
      .then(pendingPayments => this.setState({pendingPayments}))
      .catch(err => console.error(err));
  }

  acceptPayment(payment) {
    debugger;
    this.renderSpinningCircle();
    actions.acceptPayment(payment)
      .then(status => {
        this.getPendingPayments(); //reload pending status on page after accept can also update pendingPayments
      })
      .catch(err => console.error(err))
  }

  declinePayment(payment) {
    debugger;
    actions.declinePayment(payment)
      .then(status => {
        this.getPendingPayments(); //reload pending status on page after decline can also update pendingPayments
      })
      .catch(err => console.error(err))
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => <BookingCard booking={booking} key={index} />);
  }

  renderPayments(payments) {
    return payments.map((payment, index) => <PaymentCard booking={payment.booking}
                                                         payment={payment}
                                                         paymentBtns={this.renderPaymentButtons}
                                                         key={index} />);
  }

  renderPaymentButtons = (payment) => {
    return (
      <div>
        <button onClick={() => this.acceptPayment(payment)} className="btn btn-success">Accept</button>
        <button onClick={() => this.declinePayment(payment)}  className="btn btn-danger">Decline</button>
      </div>
    )
  }

  renderSpinningCircle() {
    const { pending } = this.state;

//    if(pending) {
      return (
        <div className='img-loading-overlay'>
          <div className='img-spinning-circle'>

          </div>
        </div>
      )
//    }
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    const { pendingPayments } = this.state;
    return(
      <React.Fragment>
        <section id='userBookings'>
          <h1 className='page-title'>My Bookings</h1>
          <div className='row'>
            { this.renderBookings(bookings) }
          </div>
          {!isFetching && bookings.length === 0 &&
            <div className='alert alert-warning'>
              You have no bookings created go to rentals section and book your place today.
              <Link style={{'marginleft': '10px'}} className='btn btn-bwm' to='/rentals'>Available Rental</Link>
            </div>
          }
        </section>
        
        <section id='pendingBookings'>
          <h1 className='page-title'>Pending Bookings</h1>
          <div className='row'>
            { this.renderPayments(pendingPayments) }
          </div>
          {!isFetching && pendingPayments.length === 0 &&
            <div className='alert alert-warning'>
              You have no pending bookings currently....
            </div>
          }
        </section>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)

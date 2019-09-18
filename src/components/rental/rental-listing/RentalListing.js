import React from 'react';
import { RentalList } from './RentalList'
import { connect } from 'react-redux';

import * as actions from 'actions';

class RentalListing extends React.Component{

    componentWillMount() {
        /* dispatch is available because we are using the connect below*/
        this.props.dispatch(actions.fetchRentals());
    }

    render(){
/*        this.props;  */
        return(
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <RentalList rentals={this.props.rentals} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return{
        rentals: state.rentals.data
    }
}

export default connect(mapStateToProps)(RentalListing)
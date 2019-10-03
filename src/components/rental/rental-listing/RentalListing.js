import React from 'react';
import { RentalList } from './RentalList'
import { connect } from 'react-redux';

import * as actions from 'actions';

//HOC High Order Component
/*
function withAlert(WrappedComponent) {
    return class extends React.Component {
        alertUser(){
            alert('WAKE UP!!!!!!')
        }
        
        render() {
            return <WrappedComponent {...this.props} alertUser={this.alertUser} />
        }
    }
}

function withDanger(WrappedComponent) {
    return class extends React.Component {
        dangerUser(){
            alert('WAKE UP DANGER!!!!!!')
        }
        
        render() {
            return <WrappedComponent {...this.props} dangerUser={this.dangerUser} />
        }
    }
}
*/

class RentalListing extends React.Component{

    componentWillMount() {
        /* dispatch is available because we are using the connect below*/
//        this.props.alertUser();
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

// using HOC High Order Component
// export default withDanger(withAlert(connect(mapStateToProps)(RentalListing)))
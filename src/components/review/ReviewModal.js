import React from 'react';
import Modal from 'react-responsive-modal';
import StarRatings from 'react-star-ratings';
import * as actions from 'actions';

export class ReviewModal extends React.Component {

  state = {
    open: false,
    text: '',
    rating: 3
  };

  closeModal = () => {
    this.setState({open: false});
  };

  publishReview = () => {
    const {rating, text } = this.state
    const {bookingId, onReviewCreated} = this.props;

    actions.createReview({rating, text}, bookingId)
      .then(review => {
        onReviewCreated(review);
        this.closeModal();
      })

//    this.setState({open: false}); does the same as closeModal()
  };

  openModal = () => {
    this.setState({open: true});
  };

  handleTextChange = (event) => {
    this.setState({text: event.target.value});
  };

  changeRating = ( newRating, name ) => {
    this.setState({
      rating: newRating
    });
  };

  render () {
    const { open, text, rating } = this.state;

    return (
      <React.Fragment>
        <button className='btn btn-bwm' onClick={this.openModal}>Review</button>
        <Modal open={open} onClose={this.closeModal} little classNames={{ modal: 'review-modal' }}>
          <h4 className='modal-title title'>Write a Review </h4>
          <div className='modal-body'>
            <textarea style={{marginBottom: '10px'}}
                      value={text}
                      onChange={this.handleTextChange}
                      placeholder='Enter your review for this rental...'
                      cols={50}
                      rows={3} 
            />
            <div>
              <StarRatings
                rating={rating}
                starRatedColor='orange'
                starHoverColor='orange'
                starDimension='25px'
                starpacing='3px'
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
              />
            </div>
          </div>

          <div className='modal-footer'>
            <button disabled={!text || !rating } onClick={this.publishReview} type='button' className='btn btn-bwm'>Confirm</button>
            <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Cancel</button>
          </div>
        </Modal>
      </React.Fragment>
  
    )
  }

  
}



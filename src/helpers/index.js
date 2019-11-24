import { titleize } from 'components/shared/upper/Upper';
import * as moment from 'moment';

export const rentalType = isShared => isShared ? 'shared' : 'entire'

export const toUpperCase = value => value ? titleize(value) : ''

export const dtFormat = date => moment(date).format('MMM Do YYYY');

export const getRangeOfDates = (startAt, endAt, dateFormat = 'Y/MM/DD') => {
  const tempDates = [];
  const mEndDt = moment(endAt);
  let mStartAt = moment(startAt);

  while(mStartAt < mEndDt) {
    tempDates.push(mStartAt.format(dateFormat));
    mStartAt = mStartAt.add(1, 'day');
  }

  tempDates.push(mEndDt.format(dateFormat));

  return tempDates;
}

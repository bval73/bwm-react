import titleize from 'titleize';


export const rentalType = isShared => isShared ? 'sharen' : 'entire'

export const toUpperCase = value => value ? titleize(value) : ''

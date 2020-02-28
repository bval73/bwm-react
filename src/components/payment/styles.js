export const createOptions = () => {
  return {
    style: {
      base: {
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        fontSize: '15px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }
};


export const formStyles = () => {
  return {
    style: {
      height: '100%',
      backgroundColor: '#fbfbfb',
      padding: '5px',
      marginTop: '15px'
    }
  }
}

export const buttonStyles = () => {
  return {
    style: {
      
    }
  }
}

export const paragraphStyle = () => {
  return {
    style: {
      marginTop: '5px',
      fontSize: '11px',
      color: '#aab7c4'
    }
  }
}

/* could put all styles in one and access like style.formStyles or style.buttonStyles 
to destructurize on form and button.....
const style = {
  formStyles: {

  },
  buttonStyles: {

  }
}
*/

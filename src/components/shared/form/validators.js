const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or greater` : undefined

export const minLength4 = minLength(4)

//const validEmail value ? !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);


export const required = value => (value ? undefined : 'This input is required');

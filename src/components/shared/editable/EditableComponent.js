import React from 'react';

export class EditableComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      isActive: false,
      value: undefined,
      originValue: undefined
    }
  }

  componentDidMount() {
    this.setOriginValue();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    const {errors, entityField, resetErrors } = this.props;
    console.log(errors);

    if(errors && errors.length > 0 && errors[0].title === entityField) {
      console.log('we have an error');
      console.log(errors);
      this.setOriginValue();
      resetErrors();
    }
  }

  setOriginValue() {
    console.log('componentDidUpdate');
    const { entity, entityField } = this.props;
    console.log(entity[entityField]);
    console.log(this.props);

    this.setState({
      value: entity[entityField],
      originValue: entity[entityField],
      isActive: false
    });
  }

  disableEdit() {
    this.setState({isActive : false})
  }

  enableEdit() {
    this.setState({isActive : true})
  }

  update() {
    console.log('update');
    const { value, originValue } = this.state;
    const { updateEntity, entityField } = this.props;
debugger;
    if(value !== originValue){
      updateEntity({[entityField]: value});
      this.setState({isActive: false, originValue: value})
    }
  }

  handleChange(event) {
    console.log('handleChange');
    this.setState({value: event.target.value})
  }


}
import React from 'react';
import classNames from 'classnames'

export class FloatingLabel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hasValue: false};
  }

  onBlur(event) {
     this.setState({hasValue: Boolean(event.currentTarget.value)});
  }

  render () {
    const {autoComplete, id, isDisabled, placeholder, type} = this.props;
    const {hasValue} = this.state;
    const inputClasses = classNames('fl-input', {'fl-valid': hasValue});
    return(
      <div className='fl-input-container'>
        <input autoComplete={autoComplete} className={inputClasses} disabled={isDisabled} id={id} onBlur={this.onBlur.bind(this)} type={type}/>
        <label className='fl-input-label' htmlFor={id}>{placeholder}</label>
        <span className='fl-input-bar'></span>
      </div>
    );
  }
}

module.exports = FloatingLabel;

//TODO: remove below lines
const target = document.getElementById('content');
React.render(<FloatingLabel autoComplete={false} id='date' isDisabled={false} placeholder='date' type='date'/>, target);

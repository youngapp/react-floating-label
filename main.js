import React from 'react';
import classNames from 'classnames'

export class FloatingLabel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {valid: false};
  }

  onBlur(event) {
    var inputValue = event.currentTarget.value;
    if (inputValue) {
      this.setState({ valid: true });
    }
    else {
      this.setState({ valid: false });
    }
  }

  render () {
    const {id, placeholder, type} = this.props;
    const {valid} = this.state;
    const inputClasses = classNames('fl-input', { 'fl-valid': valid });

    return(
      <div>
        <div className='fl-input-container'>
          <input autoComplete='off' className={inputClasses} text={type} id={id} onBlur={this.onBlur.bind(this)} />
          <label className='fl-input-label' htmlFor={id}>{placeholder}</label>
          <span className='fl-input-bar'></span>
        </div>
      </div>
    );
  }
}

module.exports = FloatingLabel;

//TODO: remove beloe lines later
const target = document.getElementById('content');
React.render(<FloatingLabel id='name' placeholder='name' type='input' />, target);

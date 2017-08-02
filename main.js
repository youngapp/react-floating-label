import React, {PropTypes} from 'react';
import ReactDOM from  'react-dom';
import classNames from 'classnames'
import Style from 'style-it';


export default class FloatingLabel extends React.Component {
  static propTypes: {
    autoComplete: PropTypes.bool,
    errorMsg: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    pattern: PropTypes.any,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    focusColor: PropTypes.string.isRequired,
    defaultColor: PropTypes.string.isRequired
  };
  _bind(...methods) {
    methods.map(method=>this[method]=this[method].bind(this));
  }
  constructor (props) {
    super(props)
    this.state = {hasValue: false, hasError: false};
    this._bind('onBlur','onChange');
  }

  onBlur(event) {
    this.setState({hasValue: Boolean(event.currentTarget.value)});
  }

  onChange(event) {
    const {pattern} = this.props;
    this.setState({
      hasError: !pattern.test(event.currentTarget.value),
      hasValue: Boolean(event.currentTarget.value)
    });
  }

  render () {
    const {autoComplete, errorMsg, id, isDisabled, pattern, placeholder, type, focusColor, defaultColor} = this.props;
    const {hasValue, hasError} = this.state;

    const inputClasses = classNames('fl-input', {'fl-valid': hasValue && !hasError}, {'fl-invalid': hasValue && hasError});
    const errMsgClasses = classNames({'fl-error-msg': errorMsg}, {'fl-error-show': (hasError && hasValue) && (errorMsg && pattern)});

    return Style.it(`
      .fl-input-bar::after,
      .fl-input-bar::before {
        -moz-transition: 200ms ease all;
        -webkit-transition: 200ms ease all;
        background: ${ focusColor } !important;
        bottom: 0;
        content: "";
        height: 2px;
        position: absolute;
        transition: 200ms ease all;
        width: 0;
      }
      .fl-input {
        -ms-flex-order: 2;
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        -webkit-order: 2;
        border: 0;
        border-bottom: 1px solid ${ defaultColor };
        color: #000;
        flex: 1 1 auto;
        order: 2;
      }
      .fl-input-container input:focus + label,
      .fl-input-container input.fl-valid + label,
      .fl-invalid + label {
        -moz-transform: scale(0.8) translate3d(0, 5px, 0);
        -webkit-transform: scale(0.8) translate3d(0, 5px, 0);
        color: ${ focusColor } !important;
        opacity: 1;
        transform: scale(0.8) translate3d(0, 5px, 0);
      }
      .fl-input-label {
        -moz-transform-origin: left top;
        -moz-transform: scale(1) translate3d(0, 22px, 0);
        -moz-transition: 200ms ease all;
        -ms-flex-order: 1;
        -webkit-order: 1;
        -webkit-transform-origin: left top;
        -webkit-transform: scale(1) translate3d(0, 22px, 0);
        -webkit-transition: 200ms ease all;
        color: ${ defaultColor } !important;
        font-weight: normal;
        opacity: 0.75;
        order: 1;
        padding-left: 2px;
        pointer-events: none;
        text-transform: capitalize;
        transform-origin: left top;
        transform: scale(1) translate3d(0, 22px, 0);
        transition: 200ms ease all;
      }
      `,
      <div className='fl-input-container'>
        <input
          autoComplete={autoComplete}
          className={inputClasses}
          disabled={isDisabled}
          id={id}
          onBlur={this.onBlur}
          onChange={pattern ? this.onChange : null}
          type={type}/>
        <label className='fl-input-label' htmlFor={id}>{placeholder}</label>
        <span className='fl-input-bar'></span>
        { errorMsg && <span className={errMsgClasses}>{errorMsg}</span> }
      </div>
    );
  }
}

FloatingLabel.defaultProps = {
  autoComplete: false,
  type: 'text',
  isDisabled: false,
  id: 'text-box',
  placeholder: 'name',
  focusColor: 'blue',
  defaultColor: 'gray'
};


module.exports = FloatingLabel;

//TODO: remove below lines
const target = document.getElementById('content');
ReactDOM.render(<FloatingLabel
  errorMsg='Full name can contain only the alphabets and space'
  pattern={/^[a-z\s]+$/i}
  />,
target);

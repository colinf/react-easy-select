import React from 'react';
import merge from 'lodash.merge';

let mode = {
  SELECT: 'select',
  INPUT: 'input'
};
let OTHER = 'Other...';

let styles = {
  easySelect: {
    width: 120
  },
  select: {
    width: '100%'
  },
  input: {
    width: '68%'
  },
  confirmButton: {
    width: '10%',
    color: 'green',
    paddingLeft: 2,
    paddingRight: 10
  },
  cancelButton: {
    width: '10%',
    color: 'red',
    paddingLeft: 2,
    paddingRight: 10
  }
};

function renderOption(option, i) {
  return <option key={i} value={option.value}>{option.text}</option>;
}

function normaliseOption(option) {
  if (typeof option === 'string') {
    return {value: option, text: option};
  } else {
    return option;
  }
}

export default class EasySelect extends React.Component {

  constructor(props) {
    super(props);
    this.isNewValue = false;
    this.state = {
      mode: 'select',
      value: this.props.value,
      options: this.props.options.map(normaliseOption)
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onConfirmClicked = this.onConfirmClicked.bind(this);
    this.onCancelClicked = this.onCancelClicked.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: 'select',
      options: nextProps.options.map(normaliseOption),
      value: nextProps.value
    });
  }

  onCancelClicked() {
    this.setState({
        mode: mode.SELECT 
    });
  }

  onConfirmClicked() {
    let inputValue = React.findDOMNode(this.refs.input).value;
    let myValue = this.state.value;
    let nextOptions = Array.from(this.state.options);
    let isNewValue = false;
    let valueHasChanged = false;
    if ((inputValue || this.props.allowBlank) && inputValue !== myValue) {
      valueHasChanged = true;
      myValue = inputValue;
      if (inputValue && nextOptions.map(opt => { return opt.value; }).indexOf(inputValue) === -1) {
        nextOptions.unshift(normaliseOption(inputValue));
        isNewValue = true;
      }
    }
    this.setState({
      value: myValue,
      mode: mode.SELECT,
      options: nextOptions
    });
    if (valueHasChanged) {
      this.props.onChange({
        target: React.findDOMNode(this.refs.input),
        isNewValue: Boolean(isNewValue)
      });      
    }
  }

  onInputKeyDown(event) {
    switch (event.keyCode) {
      case 13: //Enter
        this.onConfirmClicked();
        break;
      case 27: //Escape
        this.onCancelClicked();
        break;
    }

  }

  onChangeSelect(event) {
    if (event.target.value === OTHER) {
      this.setState({
          mode: mode.INPUT
      });
    } else {
      if (this.state.value !== event.target.value) {
        this.setState({
          value: event.target.value
        });
        this.props.onChange({
          target: React.findDOMNode(this.refs.select),
          isNewValue: false
        });   
      }
    }
  }

  renderSelect(styles) {

    let options = Array.from(this.state.options);
    if (this.props.allowBlank) {
      options.unshift('');
    }
    if (this.props.allowOtherValues) {
      options.push(normaliseOption(OTHER));
    }

    return (
      <div style={styles.easySelect}>
        <select name={this.props.name}
          ref='select'
          value={this.state.value}
          onChange={this.onChangeSelect}
          style={styles.select}
        >
          {options.map(renderOption)}
        </select>
      </div>
    );    
  }

  renderInput(styles) {

    let buttons;
    if (!this.props.noButtons) {
      buttons = (
        <span>
          <button type='button' style={styles.confirmButton} onClick={this.onConfirmClicked}>✔</button>
          <button type='button' style={styles.cancelButton} onClick={this.onCancelClicked}>✘</button>
        </span>
      );
    }

    return (
      <div style={styles.easySelect}>
        <input autoFocus
          type='text'
          ref='input'
          name={this.props.name}
          defaultValue={this.state.value}
          onKeyDown={this.onInputKeyDown}
          style={styles.input}
        />
        {buttons}
      </div>
    );
  }


  render() {
    let myStyles = merge({}, styles, this.props.styles);
    if (this.state.mode === mode.SELECT) {
      return this.renderSelect(myStyles);
    }
    if (this.state.mode === mode.INPUT) {
      return this.renderInput(myStyles);
    }
  }

}

EasySelect.propTypes = {
  options: React.PropTypes.array.isRequired,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  styles: React.PropTypes.object,
  allowBlank: React.PropTypes.bool,
  allowOtherValues: React.PropTypes.bool,
  noButtons: React.PropTypes.bool,
  onChange: React.PropTypes.func
};